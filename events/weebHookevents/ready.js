module.exports = (weebhook, hook) => {
    console.log(`DBL Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
}