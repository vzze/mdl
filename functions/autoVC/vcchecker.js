module.exports.exec = (v, lol, prVC, link, sv) => {
    let temp = lol;
    let vcchan = temp.vc;
    const [members, bots] = vcchan.members.partition(m => m.user.bot == false);
    if(members.size == 0) {
        if(link.has(temp.vc.id)) {
            let text = link.get(temp.vc.id);
            text.delete();
            link.delete(temp.vc.id);
        }
        if(vcchan.id == sv.mainvc) return [false, temp.vc.id]
        prVC.delete(v.member.id);
        vcchan.delete();
        return [true, temp.vc.id];
    } else {
        return [false, temp.vc.id];
    }
}