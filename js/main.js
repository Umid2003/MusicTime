/* Selectors */
const musicContainer = document.querySelector('.music_container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const bgImage = document.querySelector('.bg_image');

const audio = document.querySelector('#music');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress_container');
const title = document.querySelector('#title');
const image = document.querySelector('#image');

const songs = ['Dilwale-Janam', 'Nigar-BirSan',
    'Tarkan-Op'
];
let songIndex = 2;

// Song details
loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;
    image.src = `images/${song}.jpg`;
    bgImage.style.backgroundImage = `url(images/${song}.jpg)`
};

//Event listeners

// Play
playBtn.addEventListener("click", () => {
    const isPlay = musicContainer.classList.contains("play");
    (isPlay) ? pauseSong(): playSong();

})

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play')
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    audio.pause();
}

// Prev

prevBtn.addEventListener('click', prevSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    pauseSong();
}

// Next
nextBtn.addEventListener("click", nextSong);

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    pauseSong();
}

//Song update time

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `
    $ { progressPercentage } % `;
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}