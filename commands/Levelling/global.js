const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'global',
    aliases: ['g', 'glb'],
    description: 'Displays the global leaderboard.',
    usage: ['global'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const header = "U                  L :: XP    | U                  L :: XP\n";
        let mainbody = "";
        for(var i = 0; i < 10; i++) {
            let string = "";
            if(mdl.global[i].user_name.length>13) {
                if(i==9) string = `${i+1} ${mdl.global[i].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i].user_name.length-5).slice(0, 13)}`;
                else string = `${i+1}  ${mdl.global[i].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i].user_name.length-5).slice(0, 13)}`;
            } else {
                if(i==9) string = `${i+1} ${mdl.global[i].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i].user_name.length-5)}`;
                else string = `${i+1}  ${mdl.global[i].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i].user_name.length-5)}`;
            }
            
            while(string.length<18) string += " ";
            string += `${mdl.global[i].level}`;
            while(string.length<23) string += " ";
            (mdl.global[i].xp>1000) ? string += mdl.global[i].xp = Math.round(mdl.global[i].xp/1000) + "K" : string += mdl.global[i].xp;
            while(string.length<30) string += " ";
            string += "|";
            let exstring = string.length;

            if(mdl.global[i+10].user_name.length>13) {
                string += ` ${i+11} ${mdl.global[i+10].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i+10].user_name.length-5).slice(0, 13)}`;
            } else {
                string += ` ${i+11} ${mdl.global[i+10].user_name.replace(/[^\w\s]/gi, '').slice(0, mdl.global[i+10].user_name.length-5)}`;
            }
            while(string.length<19+exstring) string += " ";
            string += `${mdl.global[i+10].level}`;
            while(string.length<24+exstring) string += " ";
            (mdl.global[i+10].xp>1000) ? string += mdl.global[i+10].xp = Math.round(mdl.global[i+10].xp/1000) + "K" : string += mdl.global[i+10].xp;

            mainbody += string + "\n";
        }
        message.channel.send(new MessageEmbed()
            .addField("Global Leaderboard","```prolog\n" + header + mainbody + "```")
            .setColor(mdl.config.pcol) 
        )
    }

}