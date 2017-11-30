export default class silder{
  constructor(){
    let $ = document.querySelector.bind(document);
        this.$slider = $('.slider')
        this.startX=0
        this.MoveX = 0
        this.baseX=0
        this.addEvents()
  }
  addEvents(){
    this.$slider.addEventListener('touchmove',this.TouchHandler.bind(this))
    this.$slider.addEventListener('touchstart',this.TouchHandler.bind(this))
    this.$slider.addEventListener('touchend',this.TouchHandler.bind(this))
  }
  TouchHandler(event){
    let _this = this;
    function MoveTarget(){
      console.log('this slider left '+ _this.$slider.style.left+' _this.MoveX '+_this.MoveX+'_this.startX '+_this.startX)
      _this.$slider.style.left = `${(_this.baseX+_this.MoveX-_this.startX)>0?0:(_this.baseX+_this.MoveX-_this.startX)}px`//limit right margin
    }
    switch(event.type){
      case "touchstart": 
      this.startX=event.touches[0].clientX
      return;
      case "touchmove":
      this.MoveX = event.touches[0].clientX
      MoveTarget()
      return;
      case "touchend":
      this.baseX = parseInt(this.$slider.style.left)
      if(-parseInt(this.$slider.style.left)>this.$slider.clientWidth/2){
        this.$slider.style.left='-'+window.getComputedStyle(this.$slider).width
        this.baseX=0
      }     
      return;
    }
  }
}