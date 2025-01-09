// Variables
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressSlider = document.getElementById("progress");
const trackTitle = document.getElementById("track-title");

// Audio
let audio = new Audio();
let isPlaying = false;
let currentTrackIndex = 0;
let tracks = [];

// Fetch track list
fetch('tracks.json')
    .then(response => response.json())
    .then(data => {
        tracks = data;
        loadTrack(currentTrackIndex);
    });

// Functions
function loadTrack(index) {
    if (tracks.length === 0) return;

    const track = tracks[index];
    audio.src = track.url;
    trackTitle.textContent = track.title;
    progressSlider.value = 0;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
}

function playPauseTrack() {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress;
}

function seekTrack(event) {
    const seekTime = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Event Listeners
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
progressSlider.addEventListener("input", seekTrack);
