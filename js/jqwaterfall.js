$(window).on("load",function(){
    waterfall();
    var data={datas:[{src:"81.jpg"},{src:"82.jpg"},{src:"83.jpg"}]}
    $(window).on("scroll",function(){
        if(checkbottom){
            // for(var i=0;i<data.datas.length;i++){
            //     var box=$("<div>").addClass("box").appendTo($("#main"));
            //     var pic=$("<div>").addClass("pic").appendTo($(box));
            //     $("<img>").attr("src","images/"+data.datas[i].src).appendTo($(pic));
            // } 
            $.each(data.datas,function(index,value){
                var box=$("<div>").addClass("box").appendTo($("#main"));
                var pic=$("<div>").addClass("pic").appendTo($(box));
                $("<img>").attr("src","images/"+$(value).attr("src")).appendTo($(pic));
                console.log($(value))
            })
        }
        waterfall();
    }) 
})
function waterfall(){
    //取得所有的box的div
    var boxes=$("#main>div");
    var w=boxes.eq(0).outerWidth();
    var col=Math.floor($(window).outerWidth()/w);
    $("#main").css({"width":col*w+"px","margin":"0 auto"})
    var boxH=[];
    boxes.each(function(index,value){
        if(index<col){
            boxH.push($(value).outerHeight()); 
        }else{
            var minH=Math.min.apply(null,boxH);
            var index=$.inArray(minH,boxH);
            $(value).css({
                "position":"absolute",
                "left":w*index+"px",
                "top":minH+"px"
            });
            boxH[index]+=$(value).outerHeight();
        }
    }) 
}
function checkbottom(){
    var boxes=$("#main>div");
    var lastbox=boxes.last();
    var h1=lastbox.offset().top+lastbox.outerHeight()/2;
    var h2=$(window).outerHeight()+$(window).scrollTop();
    h1<h2?true:false;
}