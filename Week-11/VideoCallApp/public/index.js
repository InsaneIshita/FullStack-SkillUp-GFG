const socket = io('/');
const peer = new Peer();

const videoGrid = document.getElementById('videoDiv');
const userCountEl = document.getElementById('userCount');
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');

let myStream;
let peers = {};
let userIndex = 1;

// Get media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    myStream = stream;
    addVideo(stream, "You");

    peer.on('call', call => {
        call.answer(stream);
        call.on('stream', userStream => {
            addVideo(userStream, `User ${++userIndex}`, call.peer);
        });
    });

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });

    socket.on('user-disconnected', userId => {
        if (peers[userId]) {
            peers[userId].remove();
            delete peers[userId];
            updateUserCount();
        }
    });
});

// Join room
peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

// Call new user
function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    call.on('stream', userStream => {
        addVideo(userStream, `User ${++userIndex}`, userId);
    });
}

// Add video with label
function addVideo(stream, label, peerId) {
    const box = document.createElement('div');
    box.classList.add('video-box');

    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = label === "You";
    video.setAttribute('playsinline', true);

    const span = document.createElement('span');
    span.innerText = label;

    video.addEventListener('loadedmetadata', () => video.play());

    box.append(span);
    box.append(video);
    videoGrid.append(box);

    if (label === "You") box.id = "myVideoBox";

    if (peerId) peers[peerId] = box;
    updateUserCount();
}


// Buttons
function toggleMute() {
    const track = myStream.getAudioTracks()[0];
    track.enabled = !track.enabled;
    muteBtn.innerText = track.enabled ? "Mute" : "Unmute";
}

function toggleVideo() {
    const track = myStream.getVideoTracks()[0];
    const myBox = document.getElementById("myVideoBox");

    if (!myBox.classList.contains("video-off")) {
       
        myBox.classList.add("video-off");
        videoBtn.innerText = "Video On";

        

    } else {
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

// Mobile audio unlock
document.body.addEventListener('click', () => {
    document.querySelectorAll('video').forEach(v => v.play());
}, { once: true });

const roomLabel = document.getElementById("roomIdLabel");
const roomText = document.getElementById("roomIdText");

if (roomLabel && roomText) {
    roomLabel.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(roomText.innerText);
            roomLabel.classList.add("copied");

            const originalText = roomLabel.innerHTML;
            roomLabel.innerHTML = "Copied!";

            setTimeout(() => {
                roomLabel.classList.remove("copied");
                roomLabel.innerHTML = `Room: <span id="roomIdText">${roomText.innerText}</span>`;
            }, 1200);
        } catch (err) {
            alert("Failed to copy room ID");
        }
    });
}
