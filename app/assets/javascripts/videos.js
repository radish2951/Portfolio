$(function() {
    //hideExceptImgs();
    //transparentOnHover();
    showTitleOnHover();
});

function showGifOnBg() {

    var $img = $("img");

    $("h2, p").hide();

    $img.on("click", function() {

        var scrollTop = $(window).scrollTop();

        var src = $(this).attr("src");

        var $h2 = $(this).prevAll("h2").first();
        var text = $h2.text();
        var href = $h2.children().attr("href");

        $("#content, header").hide();
        $("body").append('<img id="bg">');
        $("body").append('<a id="title">' + text + '</a>');

        var $bg = $("#bg");
        var $title = $("#title");

        $bg.hide();
        $bg.attr("src", src);

        $title.hide();


        var fullWidth = $(window).width();
        var fullHeight = $(window).height();
        var bgWidth = $bg.width();
        var bgHeight = $bg.height();
        var fullRatio = fullWidth / fullHeight;
        var bgRatio = bgWidth / bgHeight;

        if (bgRatio < fullRatio) {
            $bg.css({
                "width": "100%",
                "top": -0.5 * (fullWidth / bgRatio - fullHeight)
            });
        } else {
            $bg.css({
                "width": fullHeight * bgRatio,
                "left": -0.5 * (fullHeight * bgRatio - fullWidth)
            });
        }
        
        $bg.css({
            position: "absolute"
        });

        $(window).scrollTop(0);
        $("body").css("overflow", "hidden");
        $bg.fadeIn("fast");

        $title.css({
            position: "absolute",
            fontSize: "40px",
            color: "white"
        });

        var titleWidth = $title.width();
        var titleHeight = $title.height();

        $title.css({
            top: (fullHeight - titleHeight) / 2,
            left: (fullWidth - titleWidth) / 2
        });
        $title.attr("href", href);
        $title.fadeIn("fast");

        $bg.on("click", function() {
            $(this).remove();
            $title.remove();
            $("#content, header").fadeIn();
            $("body").css("overflow", "");
            $(window).scrollTop(scrollTop);
        });

    });

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

function hideExceptImgs() {
    $("h2, p").hide();
}

function showTitleOnHover() {

    $(".post").on({
        mouseenter: function() {
            var $h2 = $(this).children("h2");
            var title = $h2.text();
            var href = $h2.children().attr("href");
            $(this).append('<a id="title"><div>' + title + '</div></a>');

            var imgPos = $(this).children("img").position();
            var imgWidth = $(this).children("img").width();
            var imgHeight = $(this).children("img").height();
            
            var $title = $("#title");
            $title.hide();
            $title.css({
                display: "block",
                position: "absolute",
                top: imgPos.top,
                left: imgPos.left,
                width: imgWidth,
                height: imgHeight,
                fontSize: "30px",
                backgroundColor: "white",
                opacity: 0.8
            });

            var titleHeight = $title.children("div").height();
            $title.children("div").css({
                display: "block",
                textAlign: "center",
                width: imgWidth,
                position: "relative",
                top: (imgHeight-titleHeight)/2
            });
            $title.attr("href", href);
            $title.show();
        },
        mouseleave: function() {
            $("#title").remove();
        }
    });
}
