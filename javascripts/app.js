import './tab.js'
import { hotSearch,Search } from './search.js'
import { TopList } from './toplist.js'
import { Recommend } from './recommend.js'
import { MusicPlayer } from './music_player.js'
import '../lessStyle/app.less'

let search = new Search(document.querySelector('#search-view'))
let hotsearch = new hotSearch()
let player = new MusicPlayer(document.querySelector('#player'))
let toplist = new TopList(document.querySelector('#rank-view')).launch()
let recommend = new Recommend(document.querySelector('#rec-view')).launch()
if(hotsearch.listHtml.hasChildNodes()){
  hotsearch.listHtml.addEventListener('click',function(e){
   search.$input.value =  e.target.textContent;
   search.$input.dispatchEvent(new Event('keyup'))
   })
   
}

document.querySelector('.show-player').addEventListener('click', () => {
  player.show()
})
search.$input.addEventListener('keyup',function(e){
  let keyword = event.target.value.trim();
  if(keyword)
  hotsearch.listHtml.style.display="none"
  else
  hotsearch.listHtml.style.display="block"
  search.onKeyUp.call(search,e);
})
onHashChange()
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