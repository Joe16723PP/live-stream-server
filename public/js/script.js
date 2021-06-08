let userAvatar = "avatar-1.png";
let userName = "jirotjoe";
let uid = new Date().valueOf();
// for production
const hostname = window.location.hostname;

const socket = io("http://localhost:8080");

let btnStatus = true;
let flvPlayer;

const formInput = document.querySelector("#formInput");
const chatContent = document.querySelector(".chat-content");
const dialog = document.querySelector(".dialog");
const joinLiveBtn = document.querySelector("#joinLiveBtn");

// dialog
joinLiveBtn.addEventListener("click", () => {
  const nameInput = document.querySelector("#userName");
  const radioGroup = document.querySelectorAll("[name='avatar']");
  radioGroup.forEach((ele) => {
    if (ele.checked) {
      userAvatar = ele.value;
    }
  });
  userName = nameInput.value;
  // set default
  if (userAvatar.length === 0) {
    userAvatar = "avatar-1.png";
  }
  if (userName.length === 0) {
    userName = "DUMMY";
  }
  const classList = dialog.classList;
  classList.replace("show", "hide");
});

// get live
if (flvjs.isSupported()) {
  var videoElement = document.getElementById("videoElement");
  flvPlayer = flvjs.createPlayer({
    type: "flv",
    url: "http://localhost:8000/live/test.flv",
  });
  flvPlayer.attachMediaElement(videoElement);
  flvPlayer.load();
  flvPlayer.play();
}

// socket
socket.on("connect", () => {
  // console.log(socket.id);
  console.log("socket connected!");
});

socket.on("msg", (payload) => {
  const { avatar, sender, message } = payload;
  const userId = payload.uid;
  const msgBox = document.createElement("div");
  if (+userId === uid) {
    msgBox.className = "message-box my-message";
  } else {
    msgBox.className = "message-box";
  }
  const content = `
              <div class="avatar">
                <img src="/image/${avatar}" alt="${sender}-avatar" />
              </div>
              <div class="message-group">
                <div class="sender">${sender} (@${uid})</div>
                <div class="msg">${message}</div>
              </div>`;
  msgBox.innerHTML = content;
  chatContent.appendChild(msgBox);
});

// send message
formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target[0].value;
  const url = "http://localhost:8080/message";
  const body = {
    message: msg,
    sender: userName,
    avatar: userAvatar,
    uid: uid,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      formInput.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
