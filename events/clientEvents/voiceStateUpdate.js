const { Collection } = require("discord.js");
const getRandomXP = require("../../functions/XP/getRandomXP");
const addXP = require("../../functions/XP/addXP");
const VCXP = new Collection;
const ranks = require("../../data/ranks");

module.exports = async (client, VoiceState) => {
    if(VoiceState.member.user.bot) return;
    if(VCXP.has(VoiceState.member.id)) return;
    if(VoiceState.member.voice.channelID == null) return;

    VCXP.set(VoiceState.member.id, VoiceState.member.voice.channelID);
    var xpval = setInterval(() => {
        if(VoiceState.member.voice.channelID == null) {
            VCXP.delete(VoiceState.member.id);
            clearInterval(xpval);
        } else {
            if(VoiceState.member.voice.serverMute == true || VoiceState.member.voice.selfMute == true) {

            } else {
                if(VCXP.get(VoiceState.member.id) != VoiceState.member.voice.channelID) {
                    VCXP.delete(VoiceState.member.id);
                    VCXP.set(VoiceState.member.id, VoiceState.member.voice.channelID);
                }
                let memperchan = VCXP.filter(ch => ch == VoiceState.member.voice.channelID);
                if(memperchan.size>=2) {     
                    addXP(VoiceState.member.id, getRandomXP(1, 15), VoiceState.member.user.tag, 0, 0).then(async val => {
                        let r = await ranks.findOne({ guild_id: VoiceState.guild.id, rank_id: val[1]});
                        let rolecheck = 0;
                        if(r!=undefined) {
                            rolecheck = r.role_id;
                        }
                        if(rolecheck!='0' && val[1] > 0) {
                            try {
                                await VoiceState.member.roles.add(rolecheck);
                            } catch (e) {
                                
                            }
                        }
                    })
                }
            }
        }
    }, 30000)
}