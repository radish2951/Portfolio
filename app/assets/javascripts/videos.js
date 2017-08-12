$(function() {

    hideExceptImgs();
    showTitleOnHover();

});



function hideExceptImgs() {
    $("h1, p").hide();
}



function showTitleOnHover() {

    $(".post").on({

        mouseenter: function() {

            if (!$(this).children("img").attr("src")) { return; }

            var $h = $(this).children("h1");
            var text = $h.text();
            var href = $h.children("a").attr("href");

            var imgPos = $(this).children("img").position();
            var imgWidth = $(this).children("img").width();
            var imgHeight = $(this).children("img").height();

            $(this).append('<a id="title"><div>' + text + '</div></a>');
            
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

            $title = $("#title");
            $title.remove();

        }
    });
}
