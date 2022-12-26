const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'vzze',
    aliases: ['vz', 've'],
    description: 'vzze | ve',
    usage: [`exec chode`],
    cooldown: 1,
    premium: "lol",
    ownerOnly: '1',
    async execute(mdl, message, args) {
        let holder = "";
        const optype = args.shift()
        args.forEach(arg => { holder += " " + arg})
        const prop = holder.replace(/```js/i, "").replace(/```/g, "").trim();
        switch(optype) {
            case 'mev':
                mdl.client.shard.masterEval(`${prop}`)
                    .then(res => {
                        message.channel.send(new MessageEmbed()
                            .addField("Result", "\`\`\`prolog" + "\n" + `\u200B${res}` + "\n" + "\`\`\`")
                            .setColor(mdl.config.pcol))
                    }).catch(err => {
                        message.channel.send(new MessageEmbed()
                            .addField("err", `\u200B${err}`)
                            .setColor(mdl.config.errcol).then(m => m.delete({ timeout: 2000 })))
                    });
            break;
            case 'bev':
                mdl.client.shard.broadcastEval(`${prop}`)
                    .then(res => {
                        message.channel.send(new MessageEmbed()
                            .addField("Result", "\`\`\`prolog" + "\n" + `\u200B${res}` + "\n" + "\`\`\`")
                            .setColor(mdl.config.pcol))
                    }).catch(err => {
                        message.channel.send(new MessageEmbed()
                            .addField("err", `\u200B${err}`)
                            .setColor(mdl.config.errcol).then(m => m.delete({ timeout: 2000 })))
                    });
            break;
            case 'prop':
                mdl.client.shard.fetchClientValues(`${prop}`)
                    .then(res => {
                        message.channel.send(new MessageEmbed()
                            .addField("Result", "\`\`\`prolog" + "\n" + `\u200B${res}` + "\n" + "\`\`\`")
                            .setColor(mdl.config.pcol))
                    }).catch(err => {
                        message.channel.send(new MessageEmbed()
                            .addField("err", `\u200B${err}`)
                            .setColor(mdl.config.errcol).then(m => m.delete({ timeout: 2000 })))
                    });
            break;
        }
    }
}