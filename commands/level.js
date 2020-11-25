const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;

module.exports = {
	name: 'level',
	description: 'Shows a users level.',
    usage: `\`${pref}level\` \n \`${pref}level\` <User>`,
    cooldown: 1,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        const target = message.mentions.users.first() || message.author;
        const xpbar2 = await Canvas.loadImage('./data/levelcarddata/xpbar2.png');
        let customcard = await users.findOne({ user_id: target.id });
        if(customcard==null) {
            const newU = new users({
                user_id: target.id, 
                xp: 0, 
                level: 0, 
                user_name: `${target.tag}`,
                rankcardlink: 0,
                rankavatar: 1
            });
            newU.save();
            users.save();
            customcard = newU;
            setTimeout(() => {}, 3000);
        }

        var bigcheck = 0;
        var change1 = 0;
        var change2 = 0;
        let tarlevelxp = lvls.lvl[customcard.level];
        let currlevelxp = lvls.lvl[customcard.level-1];
        let actualtarlevelxp = tarlevelxp - currlevelxp;
        let actualuserxp = customcard.xp - currlevelxp;
        let percentage = (actualuserxp * 100) / actualtarlevelxp;
        let levelzeroxpperc = customcard.xp / 100;
        

        if(customcard.level != 0) {
            bigcheck = 1;
            percentage = percentage / 100;
        }
        if(actualtarlevelxp>=1000) {
            change1 = Math.floor((actualtarlevelxp / 100) % 10)
            actualtarlevelxp = Math.floor(actualtarlevelxp/1000);
            actualtarlevelxp = `${actualtarlevelxp}.${change1}K`
        }
        if(actualuserxp>=1000) {
            change2 = Math.floor((actualuserxp / 100) % 10)
            actualuserxp = Math.floor(actualuserxp/1000);
            actualuserxp = `${actualuserxp}.${change2}K`
        }

        const u = await users.find();
        u.sort((a, b) => b.xp - a.xp)
        const uarray = Array.from(u);
        const localarray = uarray.filter(u => message.guild.members.cache.has(u.user_id));

        var k = 0;
        var z = -1;
        for(var j = 0; j<=localarray.length; j = j + 1) {
            k = k + 1;
            if(localarray[j].user_id == target.id) {
                z = k;
                break;
            }
        }

        const { registerFont } = require('canvas');
        registerFont('./data/bahnschrift.ttf', { family: "Bahnschrift" });

        var canvas = Canvas.createCanvas(934, 282)
        const ctx = canvas.getContext('2d');
        let text = `${target.username}`;
        let string = target.tag.toString("utf-8");
        string = string.slice(-5);

        let imlink = customcard.rankcardlink;
        if(imlink!=0) {
            const specialbackground = await Canvas.loadImage(`${imlink}`)
            ctx.drawImage(specialbackground, 0, 0, canvas.width, canvas.height);
        } else {
            const background = await Canvas.loadImage('./data/levelcarddata/mandemcard.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }


        var fontsize = 47;
        do {
            fontsize = fontsize - 1;
            ctx.font = `${fontsize}px Bahnschrift`;
            var measurm = ctx.measureText(text).width
        } while(ctx.measureText(text).width > 250) 

        ctx.font = `${fontsize}px Bahnschrift`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${text}`, 268, 170);

        ctx.font = '30px Bahnschrift';
        ctx.fillStyle = '#878787';
        ctx.fillText(`${string}`, 275+measurm, 170);

        if(bigcheck==1) {
            ctx.font = '30px Bahnschrift';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${actualuserxp} / ${actualtarlevelxp}`, 700, 170);
        } else {
            ctx.font = '30px Bahnschrift';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${customcard.xp} / 100`, 700, 170);
        }

        ctx.font = '20px Bahnschrift';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`LEVEL`, 670, 50);

        ctx.font = '40px Bahnschrift';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${customcard.level}`, 730, 50);

        ctx.font = '20px Bahnschrift';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`RANK`, 790, 50);
        if(z==-1) {
            ctx.font = '40px Bahnschrift';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`NaN`, 845, 50);
        } else {
            if(z>=1000) {
                z = Math.floor(z/100);
                z = `${z}K`;
                ctx.font = '40px Bahnschrift';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${z}`, 845, 50);
            } else {
                ctx.font = '40px Bahnschrift';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${z}`, 845, 50);
            }
        }

        let imbool = customcard.rankavatar;
        if(imbool!=0) {
            ctx.beginPath();
            ctx.arc(122, 142, 82, 0, 2 * Math.PI);
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        } else {

        }

        ctx.drawImage(xpbar2, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(122, 142, 80, 0, Math.PI * 2, true);
        ctx.rect(277, 185, 596, 34);
        ctx.arc(873, 202, 17, 0, 2 * Math.PI);
        ctx.arc(276, 202, 17, Math.PI, 180);   
        ctx.closePath();
        ctx.clip();
        
        var gradient = ctx.createLinearGradient(258, 0, 890, 0);
        if(bigcheck==1) {
        gradient.addColorStop(percentage-0.05,'#C069FF')
        gradient.addColorStop(percentage+0.05, '#000000')
        } else {
            gradient.addColorStop(levelzeroxpperc-0.05,'#C069FF')
            gradient.addColorStop(levelzeroxpperc+0.05, '#000000')
        }

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(258, 184, 632, 36);
        ctx.closePath();

        if(imbool!=0) {
            const avatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 42, 62, 160, 160);
        } else {

        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'mandemcard.png');

        message.channel.send(attachment);
    }
}