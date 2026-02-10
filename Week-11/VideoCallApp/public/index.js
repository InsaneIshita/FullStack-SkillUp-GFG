const socket = io('/');
const peer = new Peer();

const videoGrid = document.getElementById('videoDiv');
const userCountEl = document.getElementById('userCount');
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');

let myStream;
let peers = {};

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    myStream = stream;

    // Add my video
    addVideo(stream, USERNAME || "You");

    // When someone calls me
    peer.on('call', call => {
        const callerName = call.metadata?.username || "Guest";

        call.answer(stream);
        call.on('stream', userStream => {
            addVideo(userStream, callerName, call.peer);
        });
    });

    // When new user joins
    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });

    // When user leaves
    socket.on('user-disconnected', userId => {
        if (peers[userId]) {
            peers[userId].remove();
            delete peers[userId];
            updateUserCount();
        }
    });
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id, USERNAME);
});

function connectToNewUser(userId, stream) {
    if (peers[userId]) return;

    const call = peer.call(userId, stream, {
        metadata: { username: USERNAME }
    });

    call.on('stream', userStream => {
        addVideo(userStream, "Guest", userId);
    });

    call.on('close', () => {
        if (peers[userId]) {
            peers[userId].remove();
            delete peers[userId];
            updateUserCount();
        }
    });
}


function addVideo(stream, label, peerId) {
    if (peerId && peers[peerId]) return;

    const box = document.createElement('div');
    box.classList.add('video-box');

    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = label === USERNAME || label === "You";
    video.setAttribute('playsinline', true);

    const span = document.createElement('span');
    span.innerText = label;

    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    box.append(span);
    box.append(video);
    videoGrid.append(box);

    if (label === USERNAME || label === "You") {
        box.id = "myVideoBox";
    }

    if (peerId) peers[peerId] = box;

    updateUserCount();
}

function toggleMute() {
    const track = myStream.getAudioTracks()[0];
    track.enabled = !track.enabled;
    muteBtn.innerText = track.enabled ? "Mute" : "Unmute";
}

function toggleVideo() {
    const myBox = document.getElementById("myVideoBox");
    const track = myStream.getVideoTracks()[0];

    if (!myBox.classList.contains("video-off")) {
        track.enabled = false;
        myBox.classList.add("video-off");
        videoBtn.innerText = "Video On";
    } else {
        track.enabled = true;
        myBox.classList.remove("video-off");
        videoBtn.innerText = "Video Off";
    }
}

function endCall() {
    window.location.href = "/end";
}

function updateUserCount() {
    userCountEl.innerText = `Users: ${Object.keys(peers).length + 1}`;
}


document.body.addEventListener('click', () => {
    document.querySelectorAll('video').forEach(v => v.play());
}, { once: true });


const roomLabel = document.getElementById("roomIdLabel");
const roomText = document.getElementById("roomIdText");

if (roomLabel && roomText) {
    roomLabel.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(roomText.innerText);

            const original = roomLabel.innerHTML;
            roomLabel.innerHTML = "Copied!";

            setTimeout(() => {
                roomLabel.innerHTML = original;
            }, 1200);
        } catch {
            alert("Failed to copy room ID");
        }
    });
}
