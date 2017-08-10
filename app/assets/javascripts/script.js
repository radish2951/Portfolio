$(function() {

    var intervalId = displayLoadingIcon();
    // var src = removeSrcFromImgs();

});

$(window).on("load", function() {

    showContentOnLoad(intervalId);
    renameObjOnHover($(".unthumbnailize"), "サムネイルを解除");
    // showImgOnScroll(src, 1000, 100);

});





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

    }, 100); 

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
