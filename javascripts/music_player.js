import { ProgressBar } from './progress_bar.js'
import { LyricsPlayer } from './lyrics_player.js'
import { songUrl, lyricsUrl, albumCoverUrl } from './helpers.js'

export class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this.onOff.bind(this))
    this.$audio = this.createAudio()
    this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio)
    this.progress = new ProgressBar(this.$el.querySelector('.progress'))
    this.fetching = false
  }

  createAudio() {
    let audio = document.createElement('audio')
    audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    audio.addEventListener('ended', () => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    })
    document.body.appendChild(audio)
    return audio
  }

  onOff(event) {
    let target = event.target
    switch (true) {
      case target.matches('.icon-play'):
        this.onPlay(event)
        break
      case target.matches('.icon-pause'):
        this.onPause(event)
        break
      case target.matches('.icon-list'):
        this.hide()
        break
    }
  }

  onPlay(event) {
    if (this.fetching||!this.songid) return
    this.$audio.play()
    this.lyrics.start()
    this.progress.start()
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }

  onPause(event) {
    this.$audio.pause()
    this.lyrics.pause()
    this.progress.pause()
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }
  onPosition(e){
    // console.log(e.target.style.transform.replace(/translate\((.+?)\)/g,'$1'))
    let clickBarPosition =  e.clientX-this.$el.querySelector('.progress-elapsed').offsetWidth,
        ratio = clickBarPosition/e.target.clientWidth;
        this.$audio.currentTime = this.$audio.duration*ratio
        this.progress.elapsed=ratio*this.progress.duration
        this.progress.update(true)
        this.lyrics.update();
  }
  play(options = {}) {
    if (!options) return
    
    this.$el.querySelector('.song-name').innerText = options.songname
    this.$el.querySelector('.song-artist').innerText = options.artist
    this.progress.reset(options.duration)
    
    let coverUrl = albumCoverUrl(options.albummid)
    this.$el.querySelector('.album-cover').src = coverUrl
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${coverUrl})`

    if (options.songid) {
      if (this.songid !== options.songid) {
        this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
      }
      
      this.songid = options.songid
      this.$audio.src = songUrl(this.songid)
      this.fetching = true
      fetch(lyricsUrl(this.songid))
        .then(res => res.json())
        .then(json => json.lyric)
        .then(text => this.lyrics.reset(text))
        .catch(() => {})
        .then(() => this.fetching = false)
    }
    this.show()
    this.progress.$el.querySelector('.progress-bar').addEventListener('click',this.onPosition.bind(this))
  }

  show() {
    this.$el.classList.add('show')
    document.body.classList.add('noscroll')
  }

  hide() {
    this.$el.classList.remove('show')
    document.body.classList.remove('noscroll')
  }
}