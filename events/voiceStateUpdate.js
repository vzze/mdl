const { MessageEmbed } = require("discord.js-light");
module.exports = {
    async run(mdl, before, after) {

        const generalization = (before) ? (before) : (after);
        const s = mdl.pservers.get(generalization.guild.id);

        if(generalization.member.user.bot) return;

        if(s) {
            const txt = mdl.linker.get(generalization.channel.id)
            if(txt) txt.updateOverwrite(generalization.member.user, { VIEW_CHANNEL: true });
            const ch = await generalization.guild.channels.fetch(generalization.channel.id, { cache: false });
            if(ch.parentID == s.parent) {
                if(!after || (before && after)) {
                    if(!after) mdl.vcowners.delete(before.member.user.id);
                    if(before.channel.id != s.mainvc) {
                        const [members, bots] = before.channel.members.partition(m => m.user.bot == false);
                        if(members.size == 0) {
                            mdl.vcowners.delete(before.member.user.id);
                            before.channel.delete();
                            const txt = mdl.linker.get(before.channel.id);
                            if(txt) txt.delete();
                        } else {
                            const txt = mdl.linker.get(before.channel.id);
                            if(txt && (!mdl.vcowners.has(before.member.user.id || mdl.vcowners.get(before.member.user.id) != before.channel.id))) {
                                txt.updateOverwrite(before.member.user, { VIEW_CHANNEL: false });
                            } 
                        }
                    }
                }
                if(after) {
                    if(after.channel.id == s.mainvc) {
                        after.guild.channels.create(`${after.member.user.username}`, {
                            type: 'voice', parent: s.parent,
                            permissionOverwrites: [
                                { id: after.member.user, allow: ["CONNECT"] } 
                            ]
                        }).then(vc => {
                            after.setChannel(vc);
                            after.guild.channels.create(`${after.member.user.username}`, 
                                { type: 'text', parent: s.parent, 
                                permissionOverwrites: [
                                    { id: after.guild.roles.everyone, deny: ["VIEW_CHANNEL"] },
                                    { id: after.member.user, allow: ["VIEW_CHANNEL"] }
                                ]
                            }).then(async txt => {
                                const cmds = mdl.commands.filter(c => c.module == 'autovc');
                                txt.send(new MessageEmbed()
                                    .setColor(mdl.config.pcol)
                                    .setTitle("`Auto VC`")
                                    .setDescription("```prolog\n" + cmds.map(c => `${c.cmd.name} - ${c.cmd.description}`).join("\n") + "\n```"))
                                if(s.wrole != '0') {
                                    const role = await after.guild.roles.fetch(s.wrole, { cache: false });
                                    txt.updateOverwrite(role, { VIEW_CHANNEL: true });
                                    vc.updateOverwrite(role, { VIEW_CHANNEL: true, CONNECT: true });
                                }
                                mdl.linker.set(vc.id, txt) 
                            });
                            mdl.vcowners.set(after.member.user.id, vc.id)
                        })
                        
                    }
                }
            }
        }
        if(after) {
            if(after.selfMute == false && after.serverMute == false) {
                mdl.vcxp.set(after.member.user.id, { 
                    uid: after.member.user.id, 
                    gid: after.guild.id, 
                    name: after.member.user.tag, 
                    guild: after.guild
                });
            }
        } else mdl.vcxp.delete(before.member.user.id);
    }
}