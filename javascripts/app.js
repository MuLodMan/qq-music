import { Search } from './search.js'
import { TopList } from './toplist.js'
import { Recommend } from './recommend.js'
import { MusicPlayer } from './music_player.js'
import {Carousel,broadCasting,MusicList} from './MusicHall.js'
import Sl from './slider'
import '../lessStyle/app.less'
//initialize
let wraperHead = document.querySelector(".wraper-Head"),
    search = new Search(wraperHead),
    tabSwith = document.querySelector('.navbar>.nav-list'),
    musiclist = new MusicList(),
    slider = new Sl(),
    scrollLock = false,
    player = new MusicPlayer(document.querySelector('#player')),
    c = new Carousel();
    new broadCasting()
    slider.$slider.style.left=-slider.$slider.clientWidth+'px'
tabSwith.addEventListener('click', function(event) {
  let target = event.target,
      content = document.querySelector(target.dataset.view)
  if (target.dataset.view === '.slider') {
    slider.$slider.style.left = 0;
    return
  }
  Array.prototype.forEach.call(target.parentElement.children, tab => {
    tab.classList.remove('active')
  })
  target.classList.add('active')
  if (content) {
    Array.prototype.forEach.call(content.parentElement.children, child => {
      child.style.display = 'none'
    })
    content.style.display = 'block'
    if(target.dataset.view !== ".MusicHall"){
      c.isAnimate=false;
      for (let idx in c.$items){
        if(idx === 'length') break
        if(c.$items[idx].classList.contains('active')){
          c.curIdx =parseInt(idx);
        }
      }
      c.stopAuto()
    }
    else{
      c.autoPlay()
    }
  }
})
tabSwith.children[2].dispatchEvent(new Event('click',{bubbles:true}))
search.$input.addEventListener('change',(event)=>{
  scrollLock = search.onChanged(event)
})
window.onscroll=function(event){
  if(scrollLock)
  window.scroll(0,0)
  else
  musiclist.scrollHandler()
}
addEventListener('hashchange', onHashChange)
function onHashChange() {
  let hash = location.hash
  if (/^#player\?.+/.test(hash)) {
    let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
    let options = matches && matches.reduce((res, cur) => {
      let arr = cur.split('=')
      res[arr[0]] = decodeURIComponent(arr[1])
      return res
    }, {})
    player.play(options)
  } else {
    player.hide()
  }
}
