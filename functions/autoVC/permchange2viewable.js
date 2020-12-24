module.exports.exec = async (id, link, v) => {
    if(link.has(id)) {
        let txtchan = link.get(id);
        await txtchan.updateOverwrite(v.member.id, {
            VIEW_CHANNEL: true,
        })
        await txtchan.updateOverwrite(v.guild.id, {
            VIEW_CHANNEL: false,
        })
    }
}