//原理：算出列数，前几个放到一个数组，找出该数组中高度最小的一个以及它的index,之后的添加absolute,left,top,最后重新计算最小高度元素的高度
//页面加载
window.onload=function(){
    waterfall();
    var data={datas:[{src:"81.jpg"},{src:"82.jpg"},{src:"83.jpg"}]}
    window.onscroll=function(){
        if(checkbottom){
            var main=document.getElementById("main");
            //如果为真就执行加载图片
            for(var i=0;i<data.datas.length;i++){
                var cbox=document.createElement("div");
                cbox.className="box";
                main.appendChild(cbox);
                var cpic=document.createElement("div");
                cpic.className="pic";
                cbox.appendChild(cpic);
                var cimg=document.createElement("img");
                cimg.src="images/"+data.datas[i].src;
                cpic.appendChild(cimg);
            } 
            waterfall();
        }
    } 
}
//定义瀑布流的函数
function waterfall(){ 
    var main=document.getElementById("main");
    //获取class为box的元素
    var boxes=getElement(main,"box");
    //获取一个box的宽度
    var w=boxes[0].offsetWidth;
    //获取列数
    var col=Math.floor(document.documentElement.offsetWidth/w);
    //定义main的样式
    main.style.cssText="width:"+w*col+"px;"+"margin:0 auto";
    //获取前col个元素的高度在内的数组 
    var boxH=[];
    var minH;
    for(var i=0;i<boxes.length;i++){
        if(i<col){
            boxH.push(boxes[i].offsetHeight); 
        }else{
            minH=Math.min.apply(null,boxH);
            var index=getIndex(minH,boxH);
            var left=w*index;
            boxes[i].style.position="absolute";
            boxes[i].style.top=minH+"px";
            boxes[i].style.left=left+"px";
            boxH[index]+=boxes[i].offsetHeight;
        } 
    }
 
}
//获取class的函数
function getElement(parent,className){
    var classes=[];
    var all=parent.getElementsByTagName("*");
    for(var i=0;i<all.length;i++){
        if(all[i].className==className){
            classes.push(all[i]); 
        }
    } 
    return classes;
}
//获取匹配值在数组中的index
function getIndex(value,array){
    for(var i in array){
        if(array[i]==value){
            return i;
        }
    }
}

//判断是否滚动到最后一个box的高度的一半
function checkbottom(){
    var main=document.getElementById("main");
    var boxes=getElement(main,"box");
    var lastbox=boxes[boxes.length-1];
    var scrollTop=window.scrollTop();
    (lastbox.offsetTop+lastbox.offsetHeight/2<scrollTop+window.offsetHeight)?true:false;
}