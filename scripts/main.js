console.log($(".rgb-input").length);
$(".rgb-input").change(function() {
    $(this).val(verifyColor($(this).val()));

    var type = $(this).attr("type");
    var rgb = [
                verifyColor($("#"+type+"_red").val()),
                verifyColor($("#"+type+"_green").val()),
                verifyColor($("#"+type+"_blue").val())
            ];
    if (type == "number") {
        $("[id^=range]").each(function(i) { $(this).val(rgb[i]); });
    } else {
        $("[id^=number]").each(function(i) { $(this).val(rgb[i]); });
    }
    $("#number_red").css("color", "#"+colortohex(rgb[0])+"0000");
    $("#number_green").css("color", "#00"+colortohex(rgb[1])+"00");
    $("#number_blue").css("color", "#0000"+colortohex(rgb[2]));
    $("body").css("background-color", "#"+rgbtohex(rgb));
});

function hextorgb(hex) {
    var rgb = [];
    return rgb;
}

function colortohex(color) {
    var hex = color.toString(16);
    if (hex.length < 2) { hex = "0"+hex; }
    return hex;
}

function rgbtohex(rgb) {
    var hex = [];
    $.each(rgb, function(index, value) {
        hex.push(colortohex(value));
    });
    return (hex[0] + hex[1] + hex[2]);
}

function verifyColor(col) {
    var corr = 0;

    if ((col == "") || (col < 0)) {
        corr = 0;
    } else if (col > 255) {
        corr = 255;
    } else {
        corr = col;
    }

    return parseInt(corr, 10);
}