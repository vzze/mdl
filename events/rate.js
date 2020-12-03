const { client } = require("../index")

client.on("rateLimit", RateLimitData => {
    console.log(RateLimitData);
});