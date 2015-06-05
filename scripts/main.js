console.log($(".rgb-input").length);
$(".rgb-input").change(function() {
    var type = $(this).attr("type");
    var rgb = [
                verifyRGB($("#"+type+"_red").val()),
                verifyRGB($("#"+type+"_green").val()),
                verifyRGB($("#"+type+"_blue").val())
            ];
    if (type == "number") {
        $("[id^=range]").each(function(i) {
            $(this).val(rgb[i]);
        });
    } else {
        $("[id^=number]").each(function(i) {
            $(this).val(rgb[i]);
        });
    }
    $("body").css("background-color", "#"+rgbtohex(rgb));
});

function rgbtohex(rgb) {
    var hex = [];
    $.each(rgb, function(index, value) {
        var color = value.toString(16);
        if (color.length < 2) { color = "0" + color; }
        hex.push(color);
    });
    return (hex[0] + hex[1] + hex[2]);
}

function verifyRGB(col) {
    var corr = 0;

    if (!isNaN(col)) {
        // is numnber
        if (col > 255) {
            corr = 255;
        } else if (col < 0) {
            corr = 0;
        } else {
            corr = col;
        }
    } else {
        corr = 0;
    }
    return parseInt(corr, 10);
}