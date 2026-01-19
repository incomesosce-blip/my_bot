const login = require("fca-project-orion");
const fs = require("fs");

// appstate.json ফাইলটি পড়া হচ্ছে
const appStatePath = 'appstate.json';
if (!fs.existsSync(appStatePath)) {
    console.error("ওস্তাদ রুহিন, appstate.json ফাইলটি খুঁজে পাওয়া যায়নি!");
    process.exit(1);
}

const appState = JSON.parse(fs.readFileSync(appStatePath, 'utf8'));

const loginConfig = {
    appState: appState
};

login(loginConfig, (err, api) => {
    if (err) {
        console.error("লগইন এরর! সম্ভবত কুকি কাজ করছে না। আবার নতুন কুকি নিন।");
        return console.error(err);
    }

    // বটের সেটিংস
    api.setOptions({
        listenEvents: true,
        selfListen: false, // নিজের মেসেজে নিজে উত্তর দিবে না
        forceLogin: true,
        online: true
    });

    console.log("বট একদম রেডি ওস্তাদ রুহিন! সিলেটের বাঘ এখন অনলাইন। 🚀");

    api.listenMqtt((err, event) => {
        if (err) {
            console.error("Mqtt Listen Error:", err);
            return;
        }

        // মেসেজ আসলে কী করবে
        if (event.type === "message" && event.body) {
            const message = event.body.toLowerCase().trim();

            // ১. বটের পরিচয় কমান্ড
            if (message === "/bot") {
                api.sendMessage("আমি হাজির ভাই! হুকুম করুন। 🔥", event.threadID, event.messageID);
            }

            // ২. বড় ভাইয়ের জন্য সালাম কমান্ড
            if (message === "সালাম" || message === "assalamualaikum") {
                api.sendMessage("ওয়ালাইকুম আসসালাম! রুহিন ওস্তাদের গ্রুপে আপনাকে স্বাগতম। ✨", event.threadID, event.messageID);
            }

            // ৩. টাইম চেক কমান্ড
            if (message === "/time") {
                const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
                api.sendMessage(`ওস্তাদ, এখন সময়: ${time}`, event.threadID);
            }
        }
    });
});

// হুট করে বট বন্ধ হওয়া রোধ করতে
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
