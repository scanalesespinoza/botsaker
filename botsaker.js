// Console colors

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

// send message to a web socket nodejs?
const websocket = require('ws');

const socket = new websocket('ws://localhost:8080/chat/botsaker')

const connections = [];
socket.on('connection', ws => {
    connections.push(ws);
});
const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "viral_jhonsly";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername, {
    processInitialData: false,
    enableExtendedGiftInfo: true,
    enableWebsocketUpgrade: true,
    requestPollingIntervalMs: 2000,
    clientParams: {
        "app_language": "en-US",
        "device_platform": "web"
    },
    requestOptions: {
        timeout: 10000
    },
    websocketOptions: {
        timeout: 10000
    }
});

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    console.log(BgGreen,`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    console.log(Reset,'')


    // send a new message
    ws.send(`hello again: ${data.uniqueId}`);
})

tiktokLiveConnection.on('gift', data => {
    if (data.giftType === 1 && !data.repeatEnd) {
        // Streak in progress => show only temporary
        console.log(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
    } else {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
    }
})

tiktokLiveConnection.on('roomUser', data => {
    console.log(`Viewer Count: ${data.viewerCount}`);
})

tiktokLiveConnection.on('like', data => {
    console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
})

tiktokLiveConnection.on('social', data => {
    console.log('social event data:', data);
})

tiktokLiveConnection.on('emote', data => {
    console.log('emote received', data);
})

tiktokLiveConnection.on('envelope', data => {
    console.log('envelope received', data);
})

tiktokLiveConnection.on('questionNew', data => {
    console.log(`${data.uniqueId} asks ${data.questionText}`);
})

tiktokLiveConnection.on('liveIntro', (msg) => {
    console.log(msg);
})

tiktokLiveConnection.on('subscribe', (data) => {
    console.log(data.uniqueId, "subscribed!");
})

tiktokLiveConnection.on('follow', (data) => {
    console.log(data.uniqueId, "followed!");
})



