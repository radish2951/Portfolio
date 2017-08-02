$(function() {

    var intervalId = displayLoadingIcon();
    var src = removeSrcFromImg();

});

$(window).on("load", function() {

    showContentOnLoad(intervalId);
    renameObjOnHover($(".unthumbnailize"), "サムネイルを解除");
    showImgOnScroll(src);

});





function displayLoadingIcon() {

    var w = $(window).width();
    var h = $(window).height();
    var hh = parseInt($("header").css("height"));
    var $content = $("#content");

    $content.hide();

    $("body").append("<canvas></canvas>");
    $("canvas").attr({
        "id": "cv",
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
    var originalWidth = parseInt($obj.css("width"));
    var targetWidth;

    $obj.text(target);

    targetWidth = parseInt($obj.css("width"));

    $obj.text(origin);


    $obj.hover(function() {

        $(this).animate({
            "width": targetWidth
        }, 200);

        $(this).text(target);

    }, function() {

        $(this).animate({
            "width": originalWidth
        }, 100);

        $(this).text(origin);
    });
};



function removeSrcFromImg() {

    $img = $("img");
    src = $img.map(function() { return $(this).attr("src"); });

    $img.attr("src", "");
    $img.css("opacity", 0);

    return src;
}



function showImgOnScroll(src) {

    $img = $("img");

    if ($img.length == 0) { return; }

    var bottomOfLoadedImgs = 0;
    var i = 0;

    $img.on("load", function() {

        $(this).animate({
            "opacity": "1"
        }, 1000);

        bottomOfLoadedImgs = $(this).offset().top + parseInt($(this).css("height"));

        if (!scrollable()) {
            $img.eq(++i).attr("src", src[i]);
        }

    });

    $(window).on("scroll", function() {
        
        if (bottomOfLoadedImgs < $(this).scrollTop() + $(window).height() + 1) {
            $img.eq(++i).attr("src", src[i]);
        }
    });


    $img.eq(0).attr("src", src[0]);

}



function scrollable() {

    return $("body").height() > $(window).height();

}
