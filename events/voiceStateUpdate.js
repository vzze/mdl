const { client } = require("../index");
const { Collection } = require("discord.js");
const getRandomXP = require("../functions/getRandomXP");
const addXP = require("../functions/addXP");
const VCXP = new Collection;
const ranks = require("../data/ranks");

client.on("voiceStateUpdate", VoiceState => {
    if(VoiceState.member.user.bot) return;
    if(VCXP.has(VoiceState.member.id)) return;
    VCXP.set(VoiceState.member.id);
    var xpval = setInterval(() => {
        if(VoiceState.member.voice.channelID == null) {
            clearInterval(xpval);
            VCXP.delete(VoiceState.member.id);
        } else {
            if(VoiceState.member.voice.serverMute == true || VoiceState.member.voice.selfMute == true) {

            } else {
                addXP(VoiceState.member.id, getRandomXP(15, 25), VoiceState.member.user.tag, 0, 0).then(async () => {
                    let r = await ranks.findOne({ guild_id: VoiceState.guild.id, rank_id: await newlevel});
                    let rolecheck = 0;
                    if(r!=undefined) {
                        rolecheck = r.role_id;
                    }
                    if(rolecheck!='0' && await newlevel > 0) {
                        try {
                            await VoiceState.member.roles.add(rolecheck);
                        } catch (e) {

                        }
                    }
                    if(await levelupchecker == 1 && await newlevel > 0) {
                        let generalchat = VoiceState.guild.channels.cache.find(channel => channel.name == "general");
                        if(generalchat) {
                            await generalchat.send(`<@${VoiceState.member.id}> has advanced to level ${await newlevel}`);
                        } else {
                            let nogeneralchat = VoiceState.guild.channels.cache.filter(channel => channel.type == 'text');
                            let nogen = nogeneralchat.first();
                            await nogen.send(`<@${VoiceState.member.id}> has advanced to level ${await newlevel}`);
                        }
                    }
                })
            }
        }
    }, 30000)
});