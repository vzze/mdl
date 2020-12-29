const { MessageEmbed, Message } = require("discord.js");
const { prefix, primarycol } = require("../../config/config.json");

module.exports.exec = (v, prVC, link, sv) => {
    v.guild.channels.create(`${v.member.user.username}`, {
        type: "voice",
        parent: sv.parent,
    }).then(async ch => {
        await ch.overwritePermissions([
            {
                id: v.member.user.id,
                allow: ["CONNECT"]
            }
        ])
        if(sv.whitelist != '0') {
            await ch.updateOverwrite(sv.whitelist, {
                VIEW_CHANNEL: true,
                CONNECT: true,
            })
        }
        v.setChannel(ch);
        prVC.set(v.member.id, { owner: true, vc: ch });
        v.guild.channels.create(`${v.member.user.username}`, {
            type: "text",
            parent: sv.parent,
            
        }).then(async ch2 => {
            await ch2.overwritePermissions([
                {
                    id: v.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: v.member.user.id,
                    allow: ["VIEW_CHANNEL"]
                }
            ])
            if(sv.whitelist != '0') {
                await ch2.updateOverwrite(sv.whitelist, {
                    VIEW_CHANNEL: true,
                })
            }
            const firstchem = new MessageEmbed()
                .setAuthor(`Hi ${v.member.user.username}!`, `${v.member.user.displayAvatarURL()}`)
                .addField('A list of commands for your very own VC channel!', 
                `\u200B \n \`${prefix}ban <User>\` - Bans a user! He goes poof.
                \`${prefix}kick <User>\` - Kicks the mentioned a user.
                \`${prefix}lock\` - Locks your VC.
                \`${prefix}unlock\` - Unlocks the VC!
                \`${prefix}slots number\` - The number of slots of the VC. Suggestion: 69
                \`${prefix}name name\` - Changes the name of your VC.
                \`${prefix}invisible\` - Turns your VC invisible!
                \`${prefix}visible\` - Makes an invisible VC visible!
                \`${prefix}allow <User>\` - No need to unlock your VC for people to join!
                \`${prefix}transfer <User>\` - Transfers the ownership.
                \`${prefix}claim\` - Claim the ownership if a VC has no owner.`
                )
                .addField('\u200B', '[Click here to invite MDL!](https://discord.com/api/oauth2/authorize?client_id=776551374380204033&permissions=268553216&scope=bot)')
                .setColor(primarycol)
            ch2.send(firstchem)
            link.set(ch.id, ch2);
        })
    })
}