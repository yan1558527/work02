/**
 * Created by Lenovo on 2016/9/13.
 */
window.onload = function () {
    var arr = [
        {   //  1
            width:266,
            top:20,
            left:37,
            opacity:20,
            zIndex:2
        },
        {  // 2
            width:400,
            top:70,
            left:5,
            opacity:80,
            zIndex:3
        },
        {   // 3
            width:532,
            top:50,
            left:137,
            opacity:100,
            zIndex:4
        },
        {  // 4
            width:400,
            top:70,
            left:405,
            opacity:80,
            zIndex:3
        },
        {   //5
            width:266,
            top:20,
            left:505,
            opacity:20,
            zIndex:2
        }
    ];

    //0.获取元素
    var slide = document.getElementById("slide");
    var liArr = slide.getElementsByTagName("li");
    var arrow = slide.children[1];
    var arrowChildren = arrow.children;
    //设置一个开闭原则变量，点击以后修改这个值。
    var flag = true;

    //1.鼠标放到轮播图上，两侧的按钮显示，移开隐藏。
    slide.onmouseenter = function () {
        //arrow.style.opacity = 1;
        animate(arrow,{"opacity":100});
    }
    slide.onmouseleave = function () {
        //arrow.style.opacity = 1;
        animate(arrow,{"opacity":0});
    }

    move();
    //3.把两侧按钮绑定事件。(调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转)
    arrowChildren[0].onclick = function () {
        if(flag){
            flag = false;
            move(true);
        }
    }
    arrowChildren[1].onclick = function () {
        if(flag){
            flag = false;
            move(false);
        }
    }

    //4.书写函数。
    function move(bool){
        //判断：如果等于undefined,那么就不执行这两个if语句
        if(bool === true || bool === false){
            if(bool){
                arr.unshift(arr.pop());
            }else{
                arr.push(arr.shift());
            }
        }
        //在次为页面上的所有li赋值属性，利用缓动框架
        for(var i=0;i<liArr.length;i++){
            animate(liArr[i],arr[i], function () {
                flag = true;
            });
        }
    } //需求：鼠标放到小盒子上，让大盒子里面的图片和我们同步等比例移动。
            //技术点：onmouseenter==onmouseover 第一个不冒泡
            //技术点：onmouseleave==onmouseout  第一个不冒泡
            //步骤：
            //1.鼠标放上去显示盒子，移开隐藏盒子。
            //2.老三步和新五步（黄盒子跟随移动）
            //3.右侧的大图片，等比例移动。

            //0.获取相关元素
	var two = document.getElementsByClassName("two")[0];
            var small = two.firstElementChild || two.firstChild;
            var big = two.children[1];
            var mask = small.children[1];
            var bigImg = big.children[0];

            //1.鼠标放上去显示盒子，移开隐藏盒子。(为小盒子绑定事件)
            small.onmouseenter = function () {
                //封装好方法调用：显示元素
                show(mask);
                show(big);
            }
            small.onmouseleave = function () {
                //封装好方法调用：隐藏元素
                hide(mask);
                hide(big);
            }

            //2.老三步和新五步（黄盒子跟随移动）
            //绑定的事件是onmousemove，而事件源是small(只要在小盒子上移动1像素，黄盒子也要跟随)
            small.onmousemove = function (event) {
                //想移动黄盒子，必须知道鼠标在small中的位置。x作为mask的left值，y作mask的top值。
                //新五步
                event = event || window.event;
                var pagex = event.pageX || scroll().left + event.clientX;
                var pagey = event.pageY || scroll().top + event.clientY;
                //让鼠标在黄盒子最中间，减去黄盒子宽高的一半
                var x = pagex - two.offsetLeft - mask.offsetWidth/2;
                var y = pagey - two.offsetTop - mask.offsetHeight/2;
                //限制换盒子的范围
                //left取值为大于0，小盒子的宽-mask的宽。
                if(x<0){
                    x = 0;
                }
                if(x>small.offsetWidth-mask.offsetWidth){
                    x = small.offsetWidth-mask.offsetWidth;
                }
                //top同理。
                if(y<0){
                    y = 0;
                }
                if(y>small.offsetHeight-mask.offsetHeight){
                    y = small.offsetHeight-mask.offsetHeight;
                }
                //移动黄盒子
                console.log(small.offsetHeight);
                mask.style.left = x + "px";
                mask.style.top = y + "px";

                //3.右侧的大图片，等比例移动。
                //如何移动大图片？等比例移动。
                //    大图片/大盒子 = 小图片/mask盒子
                //    大图片走的距离/mask走的距离 = （大图片-大盒子）/（小图片-黄盒子）
//                var bili = (bigImg.offsetWidth-big.offsetWidth)/(small.offsetWidth-mask.offsetWidth);
                //大图片走的距离/mask盒子都的距离 = 大图片/小图片
                var bili = bigImg.offsetWidth/small.offsetWidth;
                var xx = bili*x;
                var yy = bili*y;
                bigImg.style.marginTop = -yy+"px";
                bigImg.style.marginLeft = -xx+"px";
            }
}