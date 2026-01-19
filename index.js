const login = require("fca-project-orion");
const fs = require("fs");

// MT Manager দিয়ে বানানো appstate.json ফাইলটি পড়া হচ্ছে
const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({appState: appState}, (err, api) => {
    if(err) return console.error("হায় হায় রুহিন ভাই! লগইন এরর:", err);

    api.setOptions({listenEvents: true, selfListen: false});
    console.log("বট একদম রেডি ওস্তাদ রুহিন! 🚀");

    api.listenMqtt((err, event) => {
        if(err) return console.error(err);

        if (event.type === "message" && event.body) {
            const message = event.body.toLowerCase();

            // তোমার চাওয়া সেই স্পেশাল কমান্ড
            if (message === "/bot") {
                api.sendMessage("আমি হাজির ভাই! হুকুম করুন। 🔥", event.threadID, event.messageID);
            }

            // বড় ভাইয়ের পক্ষ থেকে বোনাস কমান্ড
            if (message === "সালাম") {
                api.sendMessage("ওয়ালাইকুম আসসালাম! রুহিন ওস্তাদের গ্রুপে আপনাকে স্বাগতম। ✨", event.threadID);
            }
        }
    });
});
