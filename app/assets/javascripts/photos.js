$(function() {
    if (device() == 'pc') {
        transparentOnHover();
    }
});

$(window).on("load resize", function() {
    
    if (device() != 'sp') {
        column(2, 4); 
    } 

});

function column(col, mgn) {

    var $content = $("#content");
    var $post = $(".post");

    $content.css({
        fontSize: 0,
        marginBottom: 0,
        padding: 0
    });

    var w = $(window).width();

    var column = col;
    var margin = mgn;

    var postW = (w - margin * (column + 1)) / column;

    var diffs = [];
    var heights = [];
    var columnHeights = [];

    for (var i = 0; i < column; i++) {
        diffs[i] = 0;                                             
        columnHeights[i] = 0;
    }

    $post.css({
        width: postW,
        display: "inline-block",
        position: "relative",
        verticalAlign: "top",
        margin: 0,
        marginLeft: margin,
        marginBottom: margin
    });

    $post.each(function(index, element) {
        heights[index] = $(this).height();
    });

    $post.each(function(index, element) {

        var currentRow = Math.floor(index / column);
        var currentColumn = index % column;
        var currentRowHeights = heights.slice(currentRow * column, (currentRow + 1) * column);
        var maxHeight = Math.max.apply(null, currentRowHeights);
        var diff = $(this).height() - maxHeight;
        
        $(this).css({
            top: -diffs[currentColumn]
        });
        
        diffs[currentColumn] -= diff;
        columnHeights[currentColumn] += $(this).height() + margin;

    });
    
    $content.css({
        overflow: "hidden",
        height: Math.max.apply(null, columnHeights)
    });

    
}
