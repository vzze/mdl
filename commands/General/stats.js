const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'stats',
    aliases: ['st'],
    description: "Shows the bots stats.",
    usage: ['stats'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const [ut, mastermem, clusters, ping] = await mdl.stats();
        const members = clusters.reduce((m, c) => m + c[3], 0);
        const guilds = clusters.reduce((g, c) => g + c[4], 0);
        let uptime = `Uptime               :: ${ut[0]}`;
        let p = `\nPing    :: ${ping} ms`;
        while(p.length<21) p += " ";
        p += `    ${ut[1]}`;
        let gs = `\nGuilds  :: ${guilds}`;
        while(gs.length<21) gs += " ";
        gs += `    ${ut[2]}`;
        let mems = `\nMembers :: ${members}`;
        while(mems.length<21) mems += " ";
        mems += `    ${ut[3]}`;
        let clustermap = "";
        clusters.forEach(cluster => {
            let tempstring = `Cluster ${cluster[0]}`;
            while(tempstring.length<21) tempstring += " ";
            tempstring += `:: Shards :: ${cluster[1].length}`;
            tempstring += `\n                        ${cluster[2]} mb`;
            clustermap += tempstring + "\n";
        })
        clustermap = `Master Memory Usage  :: ${mastermem} mb\n` + clustermap;
        message.channel.send(new MessageEmbed()
            .setDescription("```prolog" + "\n" + clustermap + "\n" + uptime + p + gs+ mems + "```")
            .setColor(mdl.config.pcol)
        )
    }
}