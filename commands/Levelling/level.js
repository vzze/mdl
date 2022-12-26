const { MessageAttachment } = require("discord.js-light");
const Canvas = require("canvas");

module.exports = {
    name: 'level',
    aliases: ['lvl'],
    description: 'Displays your level / A users level.',
    usage: ['level', 'level <Target>'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const target = message.mentions.users.first() || message.author;

        let u = await mdl.db.users.findOne({ user_id: target.id });
        let m = await mdl.db.members.findOne({ user_id: target.id, guild_id: message.guild.id });
        if(!u) u = await mdl.db.createnewuser(target.id, 0, target.tag)
        if(!m) m = await mdl.db.createnewmember(target.id, message.guild.id, target.tag);

        let globalxp = u.xp;
        let localxp = m.xp;

        let globallevel = u.level;
        let locallevel = m.level;

        let globalrequiredxp = mdl.config.lvl[globallevel];
        let localrequiredxp = mdl.config.lvl[locallevel];

        let actualglobalxp = globalxp;
        let actuallocalxp = localxp;

        if(globallevel >= 1) {
            actualglobalxp = globalxp - mdl.config.lvl[globallevel-1];
            globalrequiredxp = globalrequiredxp - mdl.config.lvl[globallevel-1];
        }
        if(locallevel >= 1) {
            actuallocalxp = localxp - mdl.config.lvl[locallevel-1];
            localrequiredxp = localrequiredxp - mdl.config.lvl[locallevel-1];
        }

        let globalpercentage = Math.floor((actualglobalxp*100)/globalrequiredxp)/100-0.05;
        let localpercentage = Math.floor((actuallocalxp*100)/localrequiredxp)/100-0.05;

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
        registerFont('./config/bahnschrift.ttf', { family: "Bahnschrift" });

        var canvas = Canvas.createCanvas(934, 282)
        const ctx = canvas.getContext('2d');

        let primarycolor = "#C069FF";
        let secondarycolor = "#FFFFFF";
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

        ctx.fillStyle = "#202225"
        ctx.fillRect(0, 0, 934, 282)
        let text = `${target.username}`;
        if(u.rankcardlink!=0) {
            try {
                const specialbackground = await Canvas.loadImage(`${u.rankcardlink}`)
                ctx.drawImage(specialbackground, 0, 0, canvas.width, canvas.height);
            } catch (e) {}  
        } else if(mdl.pservers.has(message.guild.id)) {
            const sv = mdl.pservers.get(message.guild.id);
            try {
                const lol = await Canvas.loadImage(`${sv.svcard}`);
                ctx.drawImage(lol, 0, 0, canvas.width, canvas.height);
            } catch (e) {}
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
            ctx.lineWidth = 7;
            ctx.strokeStyle = `#000000`;
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

        gradient2.addColorStop(localpercentage,`${primarycolor}`)
        gradient2.addColorStop(localpercentage, `#36393f`)

        let lpx = Math.floor(290*localpercentage) + 49;

        ctx.beginPath();
        ctx.fillStyle = gradient2;
        ctx.fillRect(49, 124, 290, 34);
        ctx.arc(lpx, 141, 17, Math.PI * 1.5, Math.PI * (-0.5), true);
        ctx.fillStyle = `${primarycolor}`
        ctx.fill();
        ctx.closePath();
        
        let gradient = ctx.createLinearGradient(595, 0, 885, 0);


        gradient.addColorStop(globalpercentage,`${primarycolor}`)
        gradient.addColorStop(globalpercentage, `#36393f`)

        let gpx = Math.floor(290*globalpercentage) + 595;

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(595, 124, 290, 34);
        ctx.arc(gpx, 141, 17, Math.PI * 1.5, Math.PI * (-0.5), true);
        ctx.fillStyle = `${primarycolor}`
        ctx.fill();
        ctx.closePath();

        if(u.rankavatar == 1) {
            let avatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 387, 61, 160, 160);
        }

        const attachment = new MessageAttachment(canvas.toBuffer(), `${target.id}.png`);

        message.channel.send(attachment);
    }

}