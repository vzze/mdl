module.exports.exec = (v, lol, prVC, link) => {
    let temp = lol;
    let vcchan = temp.vc;
    if(vcchan.members.size == 0) {
        if(link.has(temp.vc.id)) {
            let text = link.get(temp.vc.id);
            text.delete();
            link.delete(temp.vc.id);
        }
        prVC.delete(v.member.id);
        vcchan.delete();
        return [true, temp.vc.id];
    } else {
        return [false, temp.vc.id];
    }
}