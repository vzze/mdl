const { MessageEmbed, Collection, Message } = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;
const {playg, boardnums} = require("../config/tictactoe.json");
const TTT = new Collection();
const winchecker = require("../functions/tictactoe/checker")

module.exports = {
    name: 'challenge',
    description: 'Challenge a user to a minigame of choice! \n Current available minigames: TicTacToe',
    usage: `\`${pref}challenge\` <User>`,
    cooldown: 3,
    async execute(client, message, args) {
        if(TTT.has(message.author.id)) {
            let alrplay = new MessageEmbed()
                .setDescription("You're already playing with someone.")
                .setColor("#dd4545")
            return message.channel.send(alrplay);
        }
        if(!message.mentions.users.first()) {
            let noplayer = new MessageEmbed()
                .setDescription("I can't play with you, yet.")
                .setColor("#dd4545")
            return message.channel.send(noplayer);
        }
        let player = message.mentions.users.first();
        let target = player.id;
        if(TTT.has(target)) {
            let alr2play = new MessageEmbed()
                .setDescription(`<@${target}> is already in a game.`)
            return message.channel.send(alr2play);
        }
        let author = message.author.id
        TTT.set(author, playg);
        const filter = m => m.author.id === author || m.author.id === target;
        const collector = message.channel.createMessageCollector(filter, { time: 180000 });
        const t = new MessageEmbed()
            .setDescription(playg)
        message.channel.send(t).then(msg => {
            collector.on("collect", async m => {
                if(m.author.bot) return;
                let XnO = "/";
                if(TTT.has(author)) {
                    if(m.author.id == target) return;
                    XnO = "X";
                    let edt = boardnums.find(el => el == m.content);
                    if(edt) {
                        m.delete();
                        let TTTB = await TTT.get(author);
                        var e = TTTB.replace(`${edt}`, XnO);
                        let emb = new MessageEmbed()
                            .setDescription(e);
                        await msg.edit(emb);
                        TTT.delete(author);
                        TTT.set(target, e);
                        var val = winchecker(e)
                        if(val == true) {
                            TTT.delete(target);
                            let wine = new MessageEmbed()
                                .setDescription(`<@${author}> has won.`)
                            message.channel.send(wine);
                            collector.stop();
                        }
                    }
                } else {
                    if(TTT.has(target)) {
                        if(m.author.id == author) return;
                        XnO = "O";
                        let edt = boardnums.find(el => el == m.content);
                        if(edt) {
                            m.delete();
                            let TTTB = await TTT.get(target);
                            var e = TTTB.replace(`${edt}`, XnO);
                            let emb = new MessageEmbed()
                                .setDescription(e);
                            await msg.edit(emb);
                            TTT.delete(target);
                            TTT.set(author, e);
                            var val = winchecker(e)
                            if(val == true) {
                                TTT.delete(author);
                                let wine = new MessageEmbed()
                                    .setDescription(`<@${target}> has won.`)
                                message.channel.send(wine);
                                collector.stop();
                            }
                        }
                    }
                }
            })
            collector.on("end", () => {
                TTT.delete(target);
                TTT.delete(author);
            })
        })
    }
}