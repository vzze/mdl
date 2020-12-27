const { Collection } = require("discord.js");

const VCXP = new Collection();
const prVC = new Collection();
const link = new Collection();

const ranks = require("../../data/ranks");

const { serverlist } = require("../../events/clientEvents/ready");
const memberaddXP = require("../../functions/XP/memberaddXP");
const getRandomXP = require("../../functions/XP/getRandomXP");
const addXP = require("../../functions/XP/addXP");
const CC = require("../../functions/autoVC/channelcreate");
const VCCheker = require("../../functions/autoVC/vcchecker");
const PC2U = require("../../functions/autoVC/permchange2unviewable");
const PC2V = require("../../functions/autoVC/permchange2viewable");

module.exports = {
        vccoll: prVC,
        linker: link,
        async run(client, v) {
        if(v.member.user.bot) return;
        let sv = serverlist.get(v.guild.id);
        if(sv.premium == 1) {
            if(!prVC.has(v.member.id) && v.member.voice.channelID != null) prVC.set(v.member.id, { owner: false, vc: v.member.voice.channel });
            let b = prVC.get(v.member.id);
            if(b) {
                if(v.member.voice.channelID != b.vc.id) {
                    let a = VCCheker.exec(v, b, prVC, link);
                    if(a[0] == false) {
                        if(v.member.id != prVC.findKey(c => c.vc.id == a[1] && c.owner == true)) {
                            PC2U.exec(a[1], link, v);
                        }
                    }
                    if(a[1] == true) {
                        if(v.member.voice.channelID != null) {
                            prVC.set(v.member.id, {owner: false, vc: v.member.voice.channel});
                        } 
                    }
                    if(b.owner == false) {
                        if(v.member.voice.channelID != null) {
                            prVC.set(v.member.id, {owner: false, vc: v.member.voice.channel});
                        }
                    }
                }
            }
        }
        PC2V.exec(v.member.voice.channelID, link, v);
        if(v.member.voice.channelID == sv.mainvc) CC.exec(v, prVC, link, sv);

        if(VCXP.has(v.member.id)) return;
        if(v.member.voice.channelID == null) return;

        VCXP.set(v.member.id, v.member.voice.channelID);
        var xpval = setInterval(() => {
            if(v.member.voice.channelID == null) {
                VCXP.delete(v.member.id);
                clearInterval(xpval);
            } else {
                if(v.member.voice.serverMute == true || v.member.voice.selfMute == true) {

                } else {
                    if(VCXP.get(v.member.id) != v.member.voice.channelID) {
                        VCXP.set(v.member.id, v.member.voice.channelID);
                    }
                    let memperchan = VCXP.filter(ch => ch == v.member.voice.channelID);
                    if(memperchan.size>=2) {     
                        addXP(v.member.id, getRandomXP(1, 15), v.member.user.tag, 0, 0)
                        memberaddXP(v.member.id, getRandomXP(1, 15), v.member.user.tag, 0, 0, v.guild.id).then(async val => {
                            let r = await ranks.findOne({ guild_id: v.guild.id, rank_id: val[1]});
                            let rolecheck = 0;
                            if(r!=undefined) {
                                rolecheck = r.role_id;
                            }
                            if(rolecheck!='0' && val[1] > 0) {
                                try {
                                    await v.member.roles.add(rolecheck);
                                } catch (e) {
                                    
                                }
                            }
                        })
                    }
                }
            }
        }, 30000)
    }
}