module.exports = {
    run(mdl) {
        mdl.client.user.setActivity("Tag me!", { type: "LISTENING" });
    }
}