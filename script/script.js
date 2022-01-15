// get element from HTML 
const $ = document
let bodyElem = $.body
let player = $.getElementById('player')
let cover = $.getElementById('music-cover');
let musicName = $.querySelector('.music-name');
let current = $.getElementById('current-time');
let musicDuration = $.getElementById('duration');
let progressBar = $.querySelector('.progress')
let progressActive = $.querySelector('.progress-update')
let backward = $.querySelector('.backward');
let pausePlay = $.querySelector('.pause-play');
let PausePlayIcon = $.getElementById('pause-play-icon')
let speed = $.querySelector('.speed');
let forward = $.querySelector('.forward');
let volumeIcon = $.getElementById('volume')
let volumeRange = $.querySelector('.volume-range')

let musics = [{
        Name: 'Shadmehr Aghili - Bi Ehsas',
        coverImg: './images/cover1.jpg',
        link: 'http://dl.avangtv.com/music/00-10/Shadmehr%20Aghili/Shadmehr%20Aghili%20-%20Bi%20Ehsas.mp3'
    },

    {
        Name: 'Amir Tataloo – Parvaz',
        coverImg: './images/cover2.jpg',
        link: 'https://dl.roadmusic.ir/Music/1400/09/Amir%20Tataloo/Amir_Tataloo_Parvaz%28128%29.mp3'
    },

    {
        Name: 'Leito - Omadam To Shahr',
        coverImg: './images/cover3.jpg',
        link: 'http://dl.uptrack.ir/Uptrack-ROOt/1400/02%20Ordibehesht/15/Oomadam%20Too%20Shahr.mp3'
    }
]


// audio controler
// pause and ply button 
let isplaying;

function pausePlayAction() {
    if (PausePlayIcon.classList.contains('fa-play')) {
        isplaying = true
        PausePlayIcon.className = 'fas fa-pause'
        player.play()
    } else {
        isplaying = false
        PausePlayIcon.className = 'fas fa-play'
        player.pause()
    }

}

pausePlay.addEventListener('click', pausePlayAction)
let index = 0;
let playing;

function nowPlaying() {
    playing = musics[index];
    player.src = playing.link;
    musicName.innerHTML = playing.Name;
    cover.src = playing.coverImg;
    bodyElem.style.backgroundImage = `url(${playing.coverImg})`;
}
nowPlaying()

// Auto play next song after end previous
player.addEventListener('ended', function () {
    forwardAction()
})

// Song Duration 




// forward bakcward button action
function eventKeys(event) {
    if (event.keyCode === 176) {
        forwardAction()
    }
    if (event.keyCode === 177) {
        backwardAction()
    }
    if (event.keyCode === 179 || event.keyCode === 32) {
        pausePlayAction()
    }
}
document.addEventListener('keyup', eventKeys)

function nextAutoPlay() {
    if (PausePlayIcon.className === 'fas fa-pause') {
        player.play()
    }
}

function forwardAction() {
    index++
    if (index === musics.length) {
        index = 0;
        nowPlaying()
    } else {
        nowPlaying()
    }
    nextAutoPlay()
}
forward.addEventListener('click', forwardAction);

function backwardAction() {
    index--
    if (index === -1) {
        index = musics.length;
        index--
        nowPlaying()
    } else {
        nowPlaying()
    }
    nextAutoPlay()

}
backward.addEventListener('click', backwardAction);


function testfunc() {
    let duration = player.duration
    let currentTime = player.currentTime
    if (isplaying) {
        let durationMin = Math.floor(duration / 60)
        let durationSec = Math.floor(duration % 60)
        musicDuration.innerHTML = durationMin + ':' + durationSec
        if (!durationMin || !durationSec) {
            musicDuration.innerHTML = '00:00'
        }
    }

    let progressUpdate = (currentTime / duration) * 100;
    progressActive.style.width = progressUpdate + '%'

    // Current Time Update 
    let currentTimeUpdate = Math.floor(currentTime)
    current.innerHTML = '00:' + '0' + currentTimeUpdate;
    let currentMin = Math.floor(currentTimeUpdate / 60);
    let currentSec = Math.floor(currentTimeUpdate % 60);

    if (currentSec < 10) {
        currentSec = '0' + currentSec;
    }

    if (currentMin < 10) {
        currentMin = '0' + currentMin
    }


    current.innerHTML = currentMin + ':' + currentSec;
}
player.addEventListener('timeupdate', testfunc)

function progressBarAction(event) {
    let width = this.clientWidth;
    let clicked = event.offsetX
    let durations = player.duration
    player.currentTime = (clicked / width) * durations
}
progressBar.addEventListener('click', progressBarAction)

// playback Rate Button 
let playBackRate = 1

function playBackRateAction() {
    playBackRate++
    speed.innerHTML = 'x' + playBackRate
    player.playbackRate = playBackRate
    if (playBackRate === 4) {
        playBackRate = 0
    }
}
speed.addEventListener('click', playBackRateAction)

// music volume on change 
function volumeRangeAction(){
    player.volume = volumeRange.value
    if(volumeRange.value === '0') {
        volumeIcon.className = 'fas fa-volume-mute'
    } else {
        volumeIcon.className = 'fas fa-volume-up'
    }
}
volumeRange.addEventListener('change', volumeRangeAction)