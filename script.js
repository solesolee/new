const players = document.querySelectorAll(".card");

const text = "Lagu Favorit Orang terfavoritku.... Halo sayang... Selamat ulang tahun ya! Terima kasih udah jadi alasan senyumku setiap hari. Semoga hari ini penuh dengan kebahagiaan buat kamu.";

const typingElement = document.getElementById("typingText");
const textbox = document.querySelector(".textbox");

players.forEach(player => {
  const audio = player.querySelector(".audio");
  const playBtn = player.querySelector(".playBtn");
  const playIcon = player.querySelector(".playIcon");
  const progressFill = player.querySelector(".progress-fill");

  playBtn.addEventListener("click", () => {

    // 🔥 Pause & reset semua audio lain
    players.forEach(otherPlayer => {
      const otherAudio = otherPlayer.querySelector(".audio");
      const otherIcon = otherPlayer.querySelector(".playIcon");
      const otherProgress = otherPlayer.querySelector(".progress-fill");

      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.currentTime = 0;          // reset ke awal
        otherIcon.src = "image/play.svg";    // reset icon
        otherProgress.style.width = "0%";    // reset progress bar
      }
    });

    // Toggle audio yang diklik
    if (audio.paused) {
      audio.play();
      playIcon.src = "image/pause.svg";
    } else {
      audio.pause();
      playIcon.src = "image/play.svg";
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + "%";
    }
  });

  audio.addEventListener("ended", () => {
    playIcon.src = "image/play.svg";
    progressFill.style.width = "0%";
  });
});

let index = 0;
let speed = 40;

function typeWriter() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    textbox.scrollTop = textbox.scrollHeight;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

const audio = document.querySelector("audio");

window.addEventListener("beforeunload", () => {
  localStorage.setItem("audioTime", audio.currentTime);
  localStorage.setItem("isPlaying", !audio.paused);
  localStorage.setItem("audioSrc", audio.src);
});

window.addEventListener("DOMContentLoaded", () => {

  const audio = document.querySelector("audio");

  const savedTime = localStorage.getItem("audioTime");
  const isPlaying = localStorage.getItem("isPlaying") === "true";
  const savedSrc = localStorage.getItem("audioSrc");

  if (savedSrc) {
    audio.src = savedSrc;
  }

  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  if (isPlaying) {
    audio.play().catch(() => {});
  }

});

//camera
const video = document.getElementById("video");

if (video) 
  navigator.mediaDevices.getUserMedia({
    video: true
  })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    alert("Kamera tidak bisa diakses");
  });


