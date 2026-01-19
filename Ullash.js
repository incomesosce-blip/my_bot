const login = require("cyber-bot-fca");
const fs = require("fs-extra");

// appstate পড়ার সময় এরর চেক
if (!fs.existsSync('appstate.json')) {
    console.error("ওস্তাদ রুহিন, appstate.json ফাইলটি পাওয়া যাচ্ছে না!");
    process.exit(1);
}

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({appState: appState}, (err, api) => {
    if(err) {
        console.error("লগইন এরর! নতুন কুকি দিয়ে আবার চেষ্টা করো। এরর কোড:", err);
        return;
    }

    api.setOptions({
        listenEvents: true, 
        selfListen: false, 
        online: true
    });

    console.log("বট একদম জ্যান্ত ওস্তাদ রুহিন! এখন থেকে সব মেসেজ নিচে দেখা যাবে। 🔥");

    api.listenMqtt((err, event) => {
        if(err) return;

        // এই অংশটি গিটহাবে লেখা দেখাবে (Logging)
        if (event.type === "message") {
            console.log(`[মেসেজ আসছে] আইডি: ${event.senderID} -> মেসেজ: ${event.body}`);
            
            const message = event.body ? event.body.toLowerCase().trim() : "";

            if (message === "/bot") {
                api.sendMessage("আমি হাজির ভাই! হুকুম করুন। ✅", event.threadID, () => {
                    console.log("-> রিপ্লাই পাঠানো হয়েছে!");
                });
            }
        }
    });
});
