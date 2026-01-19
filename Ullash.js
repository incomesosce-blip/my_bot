const login = require("cyber-bot-fca"); // ওরা এই লাইব্রেরি ব্যবহার করছে
const fs = require("fs-extra");

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({appState: appState}, (err, api) => {
    if(err) return console.error("লগইন এরর! নতুন কুকি নিন।");

    api.setOptions({listenEvents: true, selfListen: false, online: true});
    console.log("বট একদম রেডি ওস্তাদ রুহিন! 🔥");

    api.listenMqtt((err, event) => {
        if(err) return;
        if (event.type === "message" && event.body) {
            const message = event.body.toLowerCase();
            if (message === "/bot") {
                api.sendMessage("আমি হাজির ভাই! সাইবার বটের মতো কাজ করছি এখন। ⚡", event.threadID);
            }
        }
    });
});
