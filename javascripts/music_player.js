import {
  ProgressBar
} from './progress_bar.js'
import {
  LyricsPlayer
} from './lyrics_player.js'
import {
  songUrl,
  lyricsUrl,
  albumCoverUrl
} from './helpers.js'

class MiniPlayer {
  constructor(el) {
    this.$el = el;
  }
  showMessage(imgUrl, Title) {
    this.$el.querySelector('.songimg').style.background = `url(${imgUrl}) 0/cover`
    this.$el.querySelector('.song-message>.songtitle').textContent = Title;
  }
  PlayerHandler(target) {
    switch (true) {
      case target.matches('.icon-play'):
        this.$el.querySelector('.icon-action.icon-play').classList.replace('icon-play', 'icon-pause')
        break
      case target.matches('.icon-pause'):
        this.$el.querySelector('.icon-action.icon-pause').classList.replace('icon-pause', 'icon-play')
        break
    }
  }
  showlyrics() {

  }
}
export class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this.onOff.bind(this))
    this.$audio = this.createAudio()
    this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio)
    this.progress = new ProgressBar(this.$el.querySelector('.progress'))
    this.fetching = false
    this.miniPlayer = new MiniPlayer(document.querySelector('.miniPlayer'))
    let miniSelector = this.miniPlayer.$el.querySelector.bind(this.miniPlayer.$el)
    miniSelector('.songimg').onclick = this.show.bind(this)
    miniSelector('.icon-action').onclick = this.onOff.bind(this)
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
    if (!this.contains(event.target))
      target = this.$el.querySelector('.' + event.target.classList[0])
    switch (true) {
      case target.matches('.icon-play'):
        this.onPlay(target)
        break
      case target.matches('.icon-pause'):
        this.onPause(target)
        break
      case target.matches('.icon-list'):
        this.hide()
        break
    }
  }

  onPlay(target) {
    if (this.fetching || !this.songid) return
    this.$audio.play()
    this.lyrics.start()
    this.progress.start()
    this.miniPlayer.PlayerHandler(target)
    target.classList.add('icon-pause')
    target.classList.remove('icon-play')
  }

  onPause(target) {
    this.$audio.pause()
    this.lyrics.pause()
    this.progress.pause()
    this.miniPlayer.PlayerHandler(target)
    target.classList.add('icon-play')
    target.classList.remove('icon-pause')
  }
  onPosition(e) {
    // console.log(e.target.style.transform.replace(/translate\((.+?)\)/g,'$1'))
    let clickBarPosition = e.clientX - this.$el.querySelector('.progress-elapsed').offsetWidth,
      ratio = clickBarPosition / e.target.clientWidth;
    this.$audio.currentTime = this.$audio.duration * ratio
    this.progress.elapsed = ratio * this.progress.duration
    this.progress.update(true)
    this.lyrics.update();
  }
  play(options = {}) {
    if (!options) return
    let coverUrl = albumCoverUrl(options.albummid),
      artist = options.artist;
    this.$el.querySelector('.song-name').textContent = options.songname
    this.$el.querySelector('.song-artist').textContent = artist
    this.progress.reset(options.duration)
    this.$el.querySelector('.album-cover').src = coverUrl
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${coverUrl})`
    this.miniPlayer.showMessage(coverUrl, artist)
    if (options.songid) {
      if (this.songid !== options.songid) {
        this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
        this.miniPlayer.$el.querySelector('.icon-action').className = 'icon-action icon-play'
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
    this.progress.$el.querySelector('.progress-bar').addEventListener('click', this.onPosition.bind(this))
  }

  show() {
    this.$el.classList.add('show')
    document.body.classList.add('noscroll')
  }

  hide() {
    this.$el.classList.remove('show')
    document.body.classList.remove('noscroll')
  }
  contains(node) {
    if($el.contains){
      return $el.contains(node) 
    }
    let $el = this.$el,
    queue = [$el],
    i = 0;
    while (queue.length > 0) {
      let currentNode = queue.shift()
      for (; i < $el.children.length; i++) {
        let boundary = $el.children.length - 1;
        currentNode = $el.children[i]
        if (currentNode !== node) {
          queue.push(node)
          if (i === boundary)
            $el = queue.shift()
        } else return true
      }
    }
    return false
  }
}