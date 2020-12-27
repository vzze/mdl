const { MessageEmbed, MessageAttachment, DiscordAPIError } = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json');
const users = require('../../data/users');
const members = require('../../data/guildusers');
const { lvl } = require('../../config/levels.json');
const Canvas = require("canvas");
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
	name: 'level',
	description: 'Shows a users level.',
    usage: `\`${prefix}level\` \n \`${prefix}level\` <User>`,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        if(!message.guild.member(client.user.id).hasPermission("ATTACH_FILES")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`**I don\'t have permissions to send images.**`)
           return message.channel.send(noelembed);
        }
        const target = message.mentions.users.first() || message.author;
        let u = await users.findOne({ user_id: target.id });
        let m = await members.findOne({ user_id: target.id, guild_id: message.guild.id });
        if(u==undefined) {
            const newU = new users({
                user_id: target.id, 
                xp: 0, 
                level: 0, 
                user_name: `${target.tag}`,
                rankcardlink: 0,
                rankavatar: 1,
                prcolor: "0",
                seccolor: "0",
                quote: "0"
            });
            await newU.save();
            u = newU;
            setTimeout(() => {}, 1000);
        }
        if(m==undefined) {
            const newM = new members({
                user_id: target.id,
                guild_id: message.guild.id,
                user_name: `${target.tag}`,
                xp: 0,
                level: 0,
            })
            await newM.save();
            m = newM;
            setTimeout(() => {}, 1000);
        }

        let globalxp = u.xp;
        let localxp = m.xp;

        let globallevel = u.level;
        let locallevel = m.level;

        let globalrequiredxp = lvl[globallevel];
        let localrequiredxp = lvl[locallevel];

        let actualglobalxp = globalxp;
        let actuallocalxp = localxp;

        if(globallevel >= 1) {
            actualglobalxp = globalxp - lvl[globallevel-1];
            globalrequiredxp = globalrequiredxp - lvl[globallevel-1];
        }
        if(locallevel >= 1) {
            actuallocalxp = localxp - lvl[locallevel-1];
            localrequiredxp = localrequiredxp - lvl[locallevel-1];
        }

        let globalpercentage = Math.floor((actualglobalxp*100)/globalrequiredxp)/100;
        let localpercentage = Math.floor((actuallocalxp*100)/localrequiredxp)/100;

        if(actualglobalxp >= 1000) {
            actualglobalxp = `${Math.floor(actualglobalxp/1000)}` + `.${Math.floor(actualglobalxp/100)%10}` + "K";
        }

        if(actuallocalxp >= 1000) {
            actuallocalxp = `${Math.floor(actuallocalxp/1000)}` + `.${Math.floor(actuallocalxp/100)%10}` + "K";
        }

        if(globalrequiredxp >= 1000) {
            globalrequiredxp = `${Math.floor(globalrequiredxp/1000)}` + `.${Math.floor(globalrequiredxp/100)%10}` + "K";
        }

        if(localrequiredxp >= 1000) {
            localrequiredxp = `${Math.floor(localrequiredxp/1000)}` + `.${Math.floor(localrequiredxp/100)%10}` + "K";
        }

        const { registerFont } = require('canvas');
        registerFont('./data/bahnschrift.ttf', { family: "Bahnschrift" });

        var canvas = Canvas.createCanvas(934, 282)
        const ctx = canvas.getContext('2d');

        let text = `${target.username}`;

        let primarycolor = "#C069FF";
        let secondarycolor = "#000000";
        let quote = "";

        if(u.prcolor != "0") primarycolor = u.prcolor;
        if(u.seccolor != "0") secondarycolor = u.seccolor;
        if(u.quote != "0") quote = u.quote;

        ctx.beginPath();
        ctx.arc(17, 17, 17, 1.5 * Math.PI, 5 * Math.PI);
        ctx.arc(17, 265, 17, Math.PI, 4.5 * Math.PI);
        ctx.arc(917, 265, 17, 0.5 * Math.PI, 4 * Math.PI);
        ctx.arc(917, 17, 17, 0, 3.5 * Math.PI);
        ctx.closePath();
        ctx.clip();

        let imlink = u.rankcardlink;
        if(imlink!=0) {
            const specialbackground = await Canvas.loadImage(`${imlink}`)
            ctx.drawImage(specialbackground, 0, 0, canvas.width, canvas.height);
        } else {
          //  let sv = serverlist.get(message.guild.id)
            if(0 == 1) {
                if(sv.defaultlevelimage != '0') {
                    const svbackground = await Canvas.loadImage(`${sv.defaultlevelimage}`);
                    ctx.drawImage(svbackground, 0, 0, canvas.width, canvas.height);
                } else {
                    const background = await Canvas.loadImage('./data/levelcarddata/mandemcard.png');
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                }
            } else {
                const background = await Canvas.loadImage('./data/levelcarddata/mandemcard.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            }
            
        }


        var fontsize = 40;
        do {
            fontsize = fontsize - 1;
            ctx.font = `${fontsize}px Bahnschrift`;
        } while(ctx.measureText(text).width > 250) 

        ctx.font = `${fontsize}px Bahnschrift`;
        ctx.fillStyle = `${secondarycolor}`;
        ctx.textAlign = "center";
        ctx.fillText(`${text}`, 467, 265);

        var fontsize2 = 37;
        do {
            fontsize2 = fontsize2 - 1;
            ctx.font = `${fontsize2}px Bahnschrift`;
        } while(ctx.measureText(quote).width > 250) 

        ctx.font = `${fontsize2}px Bahnschrift`;
        ctx.fillStyle = `${secondarycolor}`;
        ctx.textAlign = "center";
        ctx.fillText(`${quote}`, 467, 40);

        ctx.font = '27px Bahnschrift';
        ctx.fillStyle = `${secondarycolor}`;
        ctx.textAlign = "center";
        ctx.fillText(`${actualglobalxp} / ${globalrequiredxp}`, 740, 190);

        ctx.font = '27px Bahnschrift';
        ctx.fillStyle = `${secondarycolor}`;
        ctx.textAlign = "center";
        ctx.fillText(`${actuallocalxp} / ${localrequiredxp}`, 194, 190);

        ctx.font = '30px Bahnschrift';
        ctx.fillStyle = `${secondarycolor}`;
        ctx.fillText(`${globallevel}`, 740, 115);

        ctx.font = '30px Bahnschrift';
        ctx.fillStyle = `${secondarycolor}`;
        ctx.fillText(`${locallevel}`, 194, 115);
        if(u.rankavatar == 1) {
            ctx.beginPath();
            ctx.arc(467, 141, 82, 0, 2 * Math.PI);
            ctx.lineWidth = 8;
            ctx.strokeStyle = `${secondarycolor}`;
            ctx.stroke();
        }

        ctx.beginPath();
        
        ctx.arc(66, 141, 17, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.arc(322, 141, 17, Math.PI * 0.5, Math.PI * 1.5, true);
        
        ctx.arc(467, 141, 80, Math.PI * 3.069, -0.069 * Math.PI, true);

        ctx.arc(612, 141, 17, Math.PI * 1.5, Math.PI * 0.5, true); 
        ctx.arc(868, 141, 17, Math.PI * 0.5, Math.PI * 1.5, true);


        ctx.closePath();
        ctx.clip();

        let gradient2 = ctx.createLinearGradient(49, 0, 339, 0);

        gradient2.addColorStop(localpercentage-0.05,`${primarycolor}`)
        gradient2.addColorStop(localpercentage+0.05, `${secondarycolor}`)

        ctx.beginPath();
        ctx.fillStyle = gradient2;
        ctx.fillRect(49, 124, 290, 34);
        ctx.closePath();
        
        let gradient = ctx.createLinearGradient(595, 0, 885, 0);

        gradient.addColorStop(globalpercentage-0.05,`${primarycolor}`)
        gradient.addColorStop(globalpercentage+0.05, `${secondarycolor}`)

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(595, 124, 290, 34);
        ctx.closePath();

        if(u.rankavatar == 1) {
            let avatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 387, 61, 160, 160);
        }

        let globe = await Canvas.loadImage('./data/levelcarddata/globe2.png');
        ctx.drawImage(globe, 0, 0, canvas.width, canvas.height);
        if(message.guild.iconURL() != null) {
            ctx.beginPath();
            ctx.arc(66, 141, 17, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            let guild = await Canvas.loadImage(message.guild.iconURL({ format: 'jpg'}));
            ctx.drawImage(guild, 49, 124, 34, 34);
        }
        

        const attachment = new MessageAttachment(canvas.toBuffer(), `${target.id}.png`);

        message.channel.send(attachment);
    }

}