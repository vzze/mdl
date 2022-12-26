const { Collection } = require("discord.js-light");
const TOPGG = require("@top-gg/sdk");
const { BaseCluster } = require("kurasuta");
const config = require("../config/config.json");
const DB = require("./extensions/database");
const fs = require("fs");

module.exports = class extends BaseCluster {
    constructor(manager) {
        super(manager);
        this.aliases = new Collection();
        this.commands = new Collection();
        this.modules = new Collection();

        this.vcowners = new Collection();
        this.linker = new Collection();
        this.vcxp = new Collection();
        this.pservers = new Collection();

        this.xpcooldown = new Collection();
        this.cmdcooldown = new Collection();
        
        this.global = [];

        this.config = config;

        this.db = new DB();

        this.topgg = new TOPGG.Api(this.config.topgg);
    }
    commandLoader() {
        for(const dir of fs.readdirSync("./commands/")) {
            for(const cmd of fs.readdirSync(`./commands/${dir}/`).filter(cmd => cmd.endsWith('.js'))) {
                const command = require(`../commands/${dir}/${cmd}`);
                this.commands.set(command.name, { cmd: command, module: dir.toLowerCase() });
                command.aliases.forEach(alias => { this.aliases.set(alias, command)})
            }
            this.modules.set(dir.toLowerCase(), dir);
        }
    }
    eventLoader() {
        for(const f of fs.readdirSync('./events/').filter(file => file.endsWith('.js'))) {
            const ev = require(`../events/${f}`);
            const eventN = f.split(".").shift();
            this.client.on(eventN, (...args) => ev.run(this, ...args))
        }
    }
    async stats() {
        let seconds = Math.floor(this.client.uptime/1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        const uptime = [ `${days} days`, `${hours} hours`, `${minutes} minutes`, `${seconds} seconds` ];
        const ping = this.client.ws.ping;
        const masterM = await this.client.shard.masterEval(`
            ( () => { return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100 })()
        `).catch(err => console.log(err));
        const clusters = await this.client.shard.broadcastEval(`
            ( () => {
                const members = this.shard.client.guilds.cache.reduce((u, g) => u + g.memberCount, 0);
                const guilds = this.shard.client.guilds.cache.size;
                return [ this.shard.ipc.id, this.shard.shards,
                Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100, members, guilds ] 
        })()
        `).catch(err => console.log(err));
        return [uptime, masterM, clusters, ping];
    }
    async refreshTop() {
        const u = await this.db.users.find();
        u.sort((a, b) => b.xp - a.xp)
        const uarray = Array.from(u);
        this.global = uarray.slice(0, 20);
    }
    async refreshPSV() {
        const sv = await this.db.servers.find();
        sv.forEach(sv => {
            this.pservers.set(sv.guild_id, { 
                parent: sv.autovcparent, 
                mainvc: sv.autovcchannel,
                wrole: sv.whitelisterolevc,
                svcard: sv.defaultlevelimage
            });
        })
    }
    async refreshTOPGG() {
        await this.client.shard.broadcastEval(`
            ( () => {
                const guilds = this.shard.client.guilds.cache.size;
                return [this.shard.shards, guilds ] 
        })()
        `)
        .then(cluster => {
            const shards = cluster.reduce((sh, c) => sh + c[0].length, 0);
            const guilds = cluster.reduce((g, c) => g + c[1], 0);
            this.topgg.postStats({ serverCount: guilds, shardCount: shards });
        }).catch(err => console.log(err));
    }
    launch() {
        this.eventLoader();
        this.commandLoader();
        this.refreshTop();
        this.refreshPSV();
        this.db.connect(this.config.clusteruser, this.config.clusterpass, this.config.clustercon);
        this.client.setInterval(() => {
            if(this.vcxp.size == 0) return;
            this.vcxp.each(async u => {
                this.refreshPSV();
                await this.db.addUserXP(u.uid, this.db.randomXP(1, 5), u.name);
                await this.db.addMemberXP(u.uid, this.db.randomXP(5, 10), u.gid, u.name)
                    .then(async val => {
                        const r = await this.db.ranks.findOne({ guild_id: u.gid, rank_id: val[1] });
                        if(r && val[1] > 0) {
                            const role = await u.guild.roles.fetch(r.role_id, { cache: false })
                                .catch(async e => { await this.db.ranks.deleteOne({ guild_id: u.guild.id, role_id: `${r.role_id}`}) })
                            const member = await u.guild.members.fetch(u.uid, { cache: false });
                            await member.roles.add(role)
                                .catch(async e => { await this.db.ranks.deleteOne({ guild_id: u.guild.id, role_id: `${r.role_id}`}).catch(e => {}) })
                        }
                    });
            });
        }, 30000);
        this.client.setInterval(() => {
            this.client.sweepChannels();
            this.client.sweepUsers();
            this.client.guilds.cache.forEach(g => {
                g.members.cache.clear();
                g.roles.cache.clear();
            });
        }, 120000)
        this.client.setInterval(() => { 
            this.refreshTop();
            this.refreshTOPGG()
            this.client.guilds.cache.forEach(g => { g.roles.cache.clear(); })
        }, 1800000);
        this.client.login(this.config.token);;
    }
}