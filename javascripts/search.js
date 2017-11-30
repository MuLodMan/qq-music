import { searchUrl } from './helpers.js'
import {HotSearch_URL} from './constants'
 class Search {
  constructor(el) {
    this.$el = el
    this.$input = document.getElementById('search')
    this.$songs = this.$el.querySelector('.song-list')
    this.page = 1
    this.songs = {}
    this.keyword = ''
    this.perpage = 20
    this.nomore = false
    this.fetching = false
    this.$el.addEventListener('scroll', this.onScroll.bind(this))
  }

  onChanged(event) {
    let keyword = event.target.value.trim(),
        searchInput = document.querySelector('.result_tags');
    if (!keyword) return this.reset()
    this.search(keyword)
    return true;
  }

  onScroll(event) {
    event.stopPropagation()
    if(!this.keyword) return
    if (this.nomore) return this.$el.removeEventListener('scroll', this.onScroll)
    if (getComputedStyle(this.$songs.lastElementChild).paddingTop<getComputedStyle(this.$songs).height) {
      this.search(this.keyword, this.page + 1)
    }
  }

  reset() {
    this.page = 1
    this.songs = {}
    this.keyword = ''
    this.nomore = false
    this.$songs.innerHTML = ''
    return false;
  }
  search(keyword, page) {
    if (this.keyword === keyword && this.songs[page || this.page]) return
    if (this.nomore || this.fetching) return
    if (this.keyword !== keyword) this.reset()
    this.keyword = keyword
    this.loading()
    fetch(searchUrl(this.keyword, page || this.page))
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.songs[this.page] = json.data.song.list
        this.nomore = json.message === 'no results'
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then(() => this.done())
      .catch(() => this.fetching = false)
  }

  append(songs) {
    let html = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `
        <a class="song-item"
           href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
          <i class="icon icon-music"></i>
          <div class="song-name ellipsis">${song.songname}</div>
          <div class="song-artist ellipsis">${artist}</div>
        </a>`}).join('')
    this.$songs.innerHTML+=html
  }

  loading() {
    this.fetching = true
    this.$el.querySelector('.search-loading').classList.add('show')
  }

  done() {
    this.fetching = false
    if (this.nomore) {
      this.$el.querySelector('.loading-icon').style.display = 'none'
      this.$el.querySelector('.loading-text').style.display = 'none'
      this.$el.querySelector('.loading-done').style.display = 'block'
      this.$el.querySelector('.search-loading').classList.add('show')
    } else {
      this.$el.querySelector('.search-loading').classList.remove('show')
    }
  }
  
}
// class hotSearch{
//   constructor(){
//     this.listHtml = document.querySelector('.result_tags')
//     this.getResult()
//   }
//   getResult(){
//     let req = new XMLHttpRequest()
//     let that =this;
//     req.open('get',HotSearch_URL)
//     req.send()
//     req.addEventListener("load",function(e){
//       // console.log(e)
//      let results = JSON.parse(e.target.response)
//      console.log(results)
//      let htmlTemp = results.data.hotkey.map(function(e){
//         return `<a href="javascript:;" class="js_keyword tag_s">${e.k} </a>`
//      }).join('')
//      that.listHtml.innerHTML = htmlTemp;
//     })
//   }
  
// }
export {Search}