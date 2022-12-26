const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'levels'],
    description: 'Displays the servers leaderboard.',
    usage: ['leaderboard'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
            const u = await mdl.db.members.find({ guild_id: message.guild.id});
            u.sort((a, b) => b.xp - a.xp)
            const uarray = Array.from(u);
            const topmem = uarray.slice(0, 20);

            const half = Math.floor(topmem.length/2);
            const header = "U                  L :: XP    | U                  L :: XP\n";
            let mainbody = "";

            for(var i = 0; i < half; i++) {
                let string = "";
                if(topmem[i].user_name.length>13) {
                    if(i==9) string = `${i+1} ${topmem[i].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i].user_name.length-5).slice(0, 13)}`;
                    else string = `${i+1}  ${topmem[i].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i].user_name.length-5).slice(0, 13)}`;
                } else {
                    if(i==9) string = `${i+1} ${topmem[i].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i].user_name.length-5)}`;
                    else string = `${i+1}  ${topmem[i].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i].user_name.length-5)}`;
                }
                
                while(string.length<18) string += " ";
                string += `${topmem[i].level}`;
                while(string.length<23) string += " ";
                (topmem[i].xp>1000) ? string += topmem[i].xp = Math.round(topmem[i].xp/1000) + "K" : string += topmem[i].xp;
                while(string.length<30) string += " ";
                string += "|";
                let exstring = string.length;

                if(topmem[i+half].user_name.length>13) {
                    if(i+half+1>9) string += ` ${i+half+1} ${topmem[i+half].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i+half].user_name.length-5).slice(0, 13)}`;
                    else string += ` ${i+half+1}  ${topmem[i+half].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i+half].user_name.length-5).slice(0, 13)}`;
                } else {
                    if(i+half+1>9) string += ` ${i+half+1} ${topmem[i+half].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i+half].user_name.length-5)}`;
                    else string += ` ${i+half+1}  ${topmem[i+half].user_name.replace(/[^\w\s]/gi, '').slice(0, topmem[i+half].user_name.length-5)}`;
                }
                while(string.length<19+exstring) string += " ";
                string += `${topmem[i+half].level}`;
                while(string.length<24+exstring) string += " ";
                (topmem[i+half].xp>1000) ? string += topmem[i+half].xp = Math.round(topmem[i+half].xp/1000) + "K" : string += topmem[i+half].xp;

                mainbody += string + "\n";
            }
            message.channel.send(new MessageEmbed()
                .addField(`${message.guild.name} Leaderboard`,"```prolog\n" + header + mainbody + "```")
                .setColor(mdl.config.pcol) 
            )
    }

}