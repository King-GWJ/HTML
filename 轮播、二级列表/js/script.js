window.onload=function(){

    // 初始化变量
    var index=0,
        timer =null,//定时器
        main = byId("main"),
        prev = byId("prev"),//上一张
        next = byId("next"),//下一张
        pics = byId("banner").getElementsByTagName("div"),
        dots = byId("dots").getElementsByTagName("span"),
        menuContent=byId("menu-content"),
        menuItems=menuContent.getElementsByTagName("div"),
        subMenu = byId("sub-menu"),
        subItems = subMenu.getElementsByClassName("inner-box"),
        size = pics.length;

    //点击右侧按钮显示下一张图片
    addHandler(next,"click",function(){
        if(index>=size-1){
            index=0;
        }else{
            index++;
        }
        changeImg();
    });
    //点击左侧按钮显示上一张图片
    addHandler(prev,"click",function(){
        if(index<=0){
            index=size-1;
        }else{
            index--;
        }
        changeImg();
    });
    //点击圆点切换图片
    for(var i=0;i<size;i++){
        dots[i].setAttribute("index",i);
        addHandler(dots[i],"click",function(){
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
        },3000)
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
            pics[i].style.display="none";
            dots[i].className="";
        }
        pics[index].style.display="block";
        dots[index].className="active";
    }

    //菜单
    for(var i=0;i<menuItems.length;i++){
        menuItems[i].setAttribute("idx",i);
        addHandler(menuItems[i],"mouseover",function(){
            var idx=this.getAttribute("idx");
            subMenu.className="sub-menu";
            for(var j=0;j<subItems.length;j++){
                subItems[j].style.display="none";
                menuItems[j].style.background = "none";
            }
            subItems[idx].style.display="block";
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        });
    }
    
    //滑过
    addHandler(subMenu,"mouseover",function(){
        this.className = "sub-menu";
    });
    //离开
    addHandler(subMenu,"mouseout",function(){
        this.className = "sub-menu hide";
    });
    //滑过
    addHandler(banner,"mouseout",function(){
        subMenu.className = "sub-menu hide";
    });
    //滑过
    addHandler(menuContent,"mouseout",function(){
        subMenu.className = "sub-menu hide";
    });


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