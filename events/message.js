const { MessageEmbed } = require("discord.js-light");
module.exports = {
    async run(mdl, m) {
        if(m.author.bot || m.channel.type == "dm") return;
        if(!m.content.startsWith(mdl.config.prefix[0]) && !m.content.startsWith(mdl.config.prefix[1]) && !m.content.startsWith(mdl.config.prefix[2])) {
            if(mdl.xpcooldown.has(m.author.id)) return;
            await mdl.db.addUserXP(m.author.id, mdl.db.randomXP(3, 7), m.author.tag);
            await mdl.db.addMemberXP(m.author.id, mdl.db.randomXP(10, 25), m.guild.id, m.author.tag)
                .then(async val => {
                    if(val[0] == 1) m.channel.send(`<@${m.author.id}> has advanced to level ${val[1]}`);
                    const r = await mdl.db.ranks.findOne({ guild_id: m.guild.id, rank_id: val[1] });
                    if(r && val[1] > 0) {
                        const member = await m.guild.members.fetch(m.author.id, { cache: false });
                        const role = await m.guild.roles.fetch(r.role_id, { cache: false })
                            .catch(async e => { await mdl.db.ranks.deleteOne({ guild_id: m.guild.id, role_id: `${r.role_id}`}) })
                        await member.roles.add(role)
                            .catch(async e => { await mdl.db.ranks.deleteOne({ guild_id: m.guild.id, role_id: `${r.role_id}`}).catch(e => {}) })   
                    }
                });
            mdl.xpcooldown.set(m.author.id, m.author.id);
            setTimeout( () => { mdl.xpcooldown.delete(m.author.id); }, 30000)
        } else {
            if(mdl.cmdcooldown.has(m.author.id)) {
                const time = mdl.cmdcooldown.get(m.author.id);
                const now = Date.now();
                if(now < time) {
                    const remainder = (time-now) / 1000;
                    return m.channel.send(new MessageEmbed()
                        .setDescription(`**wait ${remainder.toFixed(1)} more second(s)**`)
                        .setColor(mdl.config.errcol)
                    ).then(msg => msg.delete({ timeout: 1000 }));
                }
            }
            let prefix = (m.content.startsWith(mdl.config.prefix[0])) ? mdl.config.prefix[0] : mdl.config.prefix[1];
            prefix = (m.content.startsWith(mdl.config.prefix[2])) ? mdl.config.prefix[2] : prefix;
            m.mentions.users.delete(mdl.client.user.id);
            const args = m.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = mdl.commands.get(commandName);
            let cmd;
            command ? cmd = command.cmd : cmd = mdl.aliases.get(commandName);
            if(m.content == mdl.config.prefix[0] || m.content == mdl.config.prefix[1]) cmd = mdl.commands.get('help').cmd;
            if(!cmd) return;
            mdl.cmdcooldown.set(m.author.id, Date.now() + cmd.cooldown*1000);
            setTimeout( () => { mdl.cmdcooldown.delete(m.author.id); }, cmd.cooldown*1000);
            if(cmd.premium == "Premium" && !mdl.pservers.has(m.guild.id)) return;
            cmd.execute(mdl, m, args);
        }
    }
}