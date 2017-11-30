import myfetch from './CurFetch'
import silder from './slider';
let $ = document.querySelector.bind(document)
class Carousel{
    constructor(){
            let $ct = $('.img-ct'),
            template = ``,
            bulletTemplete=``;
            this.$bullet = $('.bullet')
            this.fetch=false
            this.imgCount=0
            this.$items=[]//HTMLCollection
            this.curIdx = 0
            this.clock
            this.isAnimate = false
            this.isfetch = false
            myfetch.then((res)=>{
              let slider = res.data.slider||[]
              for (let i=0;i<slider.length;i++){
                template+=`
                <li>
                    <a href="${slider[i].linkUrl}">
                        <img src="${slider[i].picUrl}">
                    </a>
                </li>`
                bulletTemplete+=
                `<li data-num=${i}></li>`
              }
              $ct.innerHTML=template;
              this.$bullet.innerHTML=bulletTemplete;
              $ct.firstElementChild.classList.add('active')
              this.$bullet.firstElementChild.classList.add('active')
              this.imgCount = $ct.children.length
              this.$items = $ct.children
              this.isfetch = true
          })

    }
    playNext() {
        this.play((this.curIdx + 1) % this.imgCount)
    }
    playPre() {
        this.play((imgCount + this.curIdx - 1) % this.imgCount)
    }
     play(idx) {
        if (this.isAnimate) return;
        this.isAnimate = true;
        this.$items[this.curIdx].classList.remove('active')
        this.$items[idx].classList.add('active')
        this.setBullet(idx);
        let addP = new Promise( (res, rej) => {
            this.$items[idx].addEventListener('transitionend', function () {
                res()
            })
        })
        let remP = new Promise((res, rej) => {
            this.$items[this.curIdx].addEventListener('transitionend',  ()=> {
                res()
            })
        })
        Promise.all([addP, remP]).then( ()=> {
            this.isAnimate = false;
            this.curIdx = idx;
        })
    }
     setBullet(idx) {
        Array.prototype.forEach.call(this.$bullet.children, function (ele) {
            ele.classList.remove('active')
        })
        this.$bullet.children[idx].classList.add('active')
    }
     stopAuto() {
        clearInterval(this.clock);
    }
    
     autoPlay() {
        this.clock = setInterval(()=> {
            if(this.isfetch===true)
            this.playNext();
        }, 2000);
    }
}
class broadCasting{
    constructor(){
        //temple
        let picUrl=[
            'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg?max_age=2592000',
            'https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000'
        ]
        this.$broadCast = $('.broadCast>.content')
        myfetch.then((res)=>{
            let template = ``,
                radioList = res.data.radioList;
            for(let i = 0; i<radioList.length;i++)
            template+=`<div class="list-media" data-radioId="${radioList[i].radioid}">
            <img class="" src="${picUrl[i]}">
            <span class="icon icon-play"></span>
            <div class="list-detail">
            <h3 class="list-title">${radioList[i].Ftitle}</h3>
            </div>
          </div>`
            this.$broadCast.innerHTML = template;
        })
    }
    
}
class MusicList{
    constructor(){
        let template = ``,
            $hotSongList = $('.hotSongList>.content');
        this.scrollHandler = ()=>{
            $hotSongList.innerHTML="<div>Now Loading....</div>"
        }
        myfetch.then((res)=>{
            let songList=res.data.songList;
            for(let i =0 ; i<songList.length; i++){
            template+=`<div class="list-item">
            <div class="list-media">
              <img class="" data-src="${songList[i].picUrl}">
              <span class="icon icon-play"></span>
            </div>
            <div class="list-detail">
              <h3 class="list-title">${songList[i].songListDesc}</h3>
              <div class="list-text"></div>
            </div>
          </div>`
            }
            $hotSongList.innerHTML = template
           this.scrollHandler = ()=>{
                let listItem = $hotSongList.children
                        Array.prototype.forEach.call(listItem,function(item){
                            item.getBoundingClientRect().top<window.innerHeight;
                            item.querySelector('img').src = item.querySelector('img').dataset.src
                        })
                    }
        })
        
    }
}
export {Carousel,broadCasting,MusicList}

