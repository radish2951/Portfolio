var id;

$(function() {

    id = displayLoadingIcon2();
    hideMenuSP();
    $("#content").hide();
});

$(window).on("load", function() {

    showContentOnLoad(id);
    showToggleMenuSP();
    renameObjOnHover($(".unthumbnailize"), "サムネイルを解除");
        
    $("iframe").each(function() {
        $(this).height($(this).width() * 9 / 16);
    });

});

function hideMenuSP() {

    if (device() == 'sp') {
        $("nav ul").hide();
    }
}


function showToggleMenuSP() {

    if (device() == 'sp') {
        $("header .clearfix").before('<button>menu</button>');
        $menu = $("nav button");
        $list = $("nav ul");
        $list.hide();

        $menu.css({
            float: "right"
        });

        $list.css({
            width: "100%",
            position: "absolute",
            backgroundColor: "white",
            top: $("header").outerHeight(),
            //height: $(window).height() - $("header").height(),
            margin: 0,
            padding: 0
        });

        $list.children().css({
            borderBottom: "1px solid #ccc",
            padding: "30px 0",
            textAlign: "center"
        });

        $list.insertAfter("header");

        $menu.on("click", function() {
            $("body").toggleClass("overflow-hidden");
            $list.slideToggle(320);
        });  
    }
} 


function displayLoadingIcon() {

    var w = $(window).width();
    var h = $(window).height();
    var hh = $("header").height();
    var $content = $("#content");

    $content.hide();

    $("body").append('<canvas id="cv"></canvas>');
    $("canvas").attr({
        "width": w,
        "height" : h
    });
    $("body").css("overflow", "hidden");

    var cv = document.getElementById("cv");
    var ctx = cv.getContext('2d');

    var i = 0;

    intervalId = setInterval(function() {

        ctx.lineWidth = 12;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.beginPath();
        ctx.arc(w / 2, (h-hh) / 2, 40, i, i + 2.5, false);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(w / 2, (h-hh) / 2, 40, i - Math.PI*0.2, i + 2.5 - Math.PI*0.2, false);
        ctx.stroke();

        i += Math.PI * 0.2;

    }, 40); 

    return intervalId;

};

function displayLoadingIcon2() {

    var w = $(window).width();
    var h = $(window).height();
    var hh = $("header").height();
    var $content = $("#content");

    $content.hide();

    $("body").append('<canvas id="cv"></canvas>');
    $("canvas").attr({
        "width": w,
        "height" : h
    });
    $("body").css("overflow", "hidden");

    var cv = document.getElementById("cv");
    var ctx = cv.getContext('2d');

    var i = 0;
    var r = 30;

    intervalId = setInterval(function() {

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.beginPath();
        ctx.arc(w/2 + r*Math.cos(i), h/2 + r*Math.sin(i), 8, 0, 2*Math.PI, true);
        ctx.fill();

        i += Math.PI * 0.2;

    }, 80); 

    return intervalId;

}; 

function showContentOnLoad(id) {

    $("canvas").remove();
    $("#content").fadeIn();
    $("body").css("overflow", "");
    clearInterval(id); 

};



function renameObjOnHover($obj, target) {

    var origin = $obj.text();

    $obj.on({
        "mouseenter": function() {
            $(this).text(target);
        },
        "mouseleave": function() {
            $(this).text(origin);
        }
    });
}



function removeSrcFromImgs() {

    $img = $("img");
    src = $img.map(function() { return $(this).attr("src"); });

    $img.attr("src", "");
    $img.css("opacity", 0);

    return src;
}



function showImgOnScroll(src, speed, preload) {

    $img = $("img");

    if ($img.length == 0) { return; }

    var bottomOfLoadedImgs = 0;
    var i = 0;

    $img.on("load", function() {

        $(this).animate({
            "opacity": 1
        }, speed);

        bottomOfLoadedImgs = $(this).offset().top + parseInt($(this).css("height"));

        if (!scrollable()) {
            $img.eq(++i).attr("src", src[i]);
        }

    });

    $(window).on("scroll", function() {
        
        if (bottomOfLoadedImgs < $(this).scrollTop() + $(window).height() + preload) {
            $img.eq(++i).attr("src", src[i]);
        }
    });


    $img.eq(0).attr("src", src[0]);

}



function scrollable() {

    return $("body").height() > $(window).height();

}



 function transparentOnHover() {

    $("img").on({
        "mouseenter": function() {
            $(this).animate({
                opacity: 0.5
            }, 100);
        },
        "mouseleave": function() {
            $(this).animate({
                opacity: 1
            }, 100);
        }
    });
} 



function device() {

    var ua = navigator.userAgent;

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('iPod') > 0 && ua.indexOf('Mobile')) {
        return 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return 'tab';
    } else {
        return 'pc';
    }

}
