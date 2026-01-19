const login = require("fca-project-orion");
const fs = require("fs-extra");

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({appState: appState}, (err, api) => {
    if(err) return console.error("লগইন এরর! নতুন কুকি দিন।");

    api.setOptions({listenEvents: true, selfListen: false, online: true});
    console.log("বট একদম জ্যান্ত ওস্তাদ রুহিন! এবার রিপ্লাই দিবে ইনশাআল্লাহ্। 🔥");

    api.listenMqtt((err, event) => {
        if(err) return;
        
        // গিটহাবের কালো স্ক্রিনে মেসেজ দেখার জন্য এই লাইন
        if(event.body) console.log(`[মেসেজ] ${event.body}`);

        if (event.type === "message" && event.body) {
            const message = event.body.toLowerCase().trim();
            if (message === "/bot") {
                api.sendMessage("আমি জ্যান্ত আছি ভাই! হুকুম করুন। ✅", event.threadID);
            }
        }
    });
});
