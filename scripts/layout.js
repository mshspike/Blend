var resizeLayout = function() {
    if ($(window).innerWidth() <= 530) {
        $("#block_green").css("top", "30px");
        $("#block_green").css("left", 0);
        $("#block_blue").css("top", "60px");
        $("#block_blue").css("left", 0);
    } else {
        $("#block_green").css("top", "-10px");
        $("#block_green").css("left", "-140px");
        $("#block_blue").css("top", "-250px");
        $("#block_blue").css("left", "140px");
    }
}

$(window).resize(resizeLayout);
$(document).ready(resizeLayout);