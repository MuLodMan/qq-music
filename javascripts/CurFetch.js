import { RECOMMEND_URL } from './constants.js'
function CurFetch(res,rej){
        let httpreq = new XMLHttpRequest()
        httpreq.open('GET',RECOMMEND_URL)
        httpreq.send()
        httpreq.onload=function(e){
          res(JSON.parse(e.target.response))
        }
        
}
export default new Promise(CurFetch)