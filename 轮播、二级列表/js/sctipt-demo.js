window.onload=function(){

    var index=0,
        bannerImg=byId("banner").getElementsByTagName("div"),
        lableSpan=byId("lable").getElementsByTagName("span"),
        size=lableSpan.length;


    for(var i=0;i<size;i++){
        lableSpan[i].setAttribute("index",i);
        addHandler(lableSpan[i],"click",function(){
            index=this.getAttribute("index");
            changeImg();
        });
    }

    // 图片自动轮播
    function startAutoPlay(){
        timer = setInterval(function(){
            if(index>=size-1){
                index=0;
            }else{
                index++;
            }
            changeImg();
        },1000)
    }
    // 清除定时器,停止自动播放
    function stopAutoPlay(){
        if(timer){
            clearInterval(timer);
        }
    }
    //鼠标滑过界面停止定时器
    addHandler(main,"mouseover",stopAutoPlay);
    //鼠标离开界面开始定时器
    addHandler(main,"mouseout",startAutoPlay);


    //切换图片
    function changeImg(){
        for(var i=0;i<size;i++){
           lableSpan[i].style.background="#fff";
           bannerImg[i].style.display="none";
        }
        lableSpan[index].style.background="#ffcc00";
        bannerImg[index].style.display="block";
    }

    //封装getElementById
    function byId(id){
        return typeof(id)=== "string" ? document.getElementById(id) : id;
    }
    //封装事件绑定方法
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, true);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = handler;
        }
    }

}