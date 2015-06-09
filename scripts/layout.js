var resizeLayout = function() {
    if ($(window).width() <= 530) {
        $("#bubble_green").css("top", "30px");
        $("#bubble_green").css("left", 0);
        $("#bubble_blue").css("top", "60px");
        $("#bubble_blue").css("left", 0);
    } else {
        $("#bubble_green").css("top", "-5px");
        $("#bubble_green").css("left", "-135px");
        $("#bubble_blue").css("top", "-245px");
        $("#bubble_blue").css("left", "135px");
    }
}

$(window).resize(resizeLayout);
$(document).ready(resizeLayout);

$(".rgb-input").focusin(function() { $(this).closest(".rgb-bubble").addClass("rgb-bubble-zoom"); });

$(".rgb-input").focusout(function() { $(this).closest(".rgb-bubble").removeClass("rgb-bubble-zoom"); });