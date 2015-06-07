/**
 * Document ready function. Set a random color when page is reloaded
 */
$(document).ready(function() {
    setColor((Math.floor(Math.random()*255)),(Math.floor(Math.random()*255)),(Math.floor(Math.random()*255)));
});

/**
* Capture "tab" key on the 3 RGB input.
* It is to allow using tab key to loop through each RGB color.
*/
$(".block-content").on("keydown", "[id^=text]", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
        e.preventDefault();

        var text_input_arr = $("[id^=text]");
        for (var i=0; i<text_input_arr.length; i++) {
            if (text_input_arr[i] == $(this)[0]) {
                if (i == 2) { $("[id^=text]")[0].focus(); $("[id^=text]")[0].select(); }
                else { $("[id^=text]")[i+1].focus(); $("[id^=text]")[i+1].select(); }
                return 1;
            }
        }
    }
});

/**
 * Onchange listener on the 3 RGB color input.
 */
$(".rgb-input").change(function() {
    $(this).val(verifyColor($(this).val()));

    var type = $(this).attr("type");
    var rgb  = [verifyColor($("#"+type+"_red").val()),
                verifyColor($("#"+type+"_green").val()),
                verifyColor($("#"+type+"_blue").val()) ];

    if (type == "text") {
        $("[id^=range]").each(function(i) { $(this).val(rgb[i]); });
    } else {
        $("[id^=text]").each(function(i) { $(this).val(rgb[i]); });
    }
    $("#hex").val("#"+rgbtohex(rgb[0], rgb[1], rgb[2]));

    setColor(rgb[0],rgb[1],rgb[2]);
});

$("[id*=text_]").on("paste", function(e) {
    var pastedText;
/*
    if (window.clipboardData && window.clipboardData.getData) { // IE
        pastedText = window.clipboardData.getData('Text');
    } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData('text/plain');
    }
    console.log("pastedText = " + pastedText);
*/
});

function setEach(color, value) {
    var rgb = "rgb(";
    if (color == "red") { rgb += value + ",0,0)"; }
    else if (color == "green") { rgb += "0," + value + ",0"; }
    else if (color == "blue") { rgb += "0,0," + value; }
    else { console.log("Error setting color. Passed color = " + color); return false; }

    $("#text_"+color).css("color", rgb);
    $("#range_"+color).val(value);
    $("#text_"+color).val(value);
}

function setColor(r,g,b) {
    // Color block text
    setEach("red",   r);
    setEach("green", g);
    setEach("blue",  b);

    // Hex & Background
    $("#hex").val("#"+rgbtohex(r,g,b));
    $("body").css("background-color","rgb("+r+","+g+","+b+")")
}

function hextorgb(hex) {
    var rgb = [];
    return rgb;
}

function rgbtohex(r,g,b) {
    var rgb = [r,g,b];
    var hex = [];
    $.each(rgb, function(index, value) { hex.push(colortohex(value)); });
    return (hex[0] + hex[1] + hex[2]).toUpperCase();
}

function colortohex(color) {
    var hex = color.toString(16);
    if (hex.length < 2) { hex = "0"+hex; }
    return hex;
}

/**
 * Verify the data from the 3 RGB input.
 * The raw input will be parsed into integer.
 * If out of bound, value is set to the closest bound (min/max), if it's invalid string, set it to 0.
 * 
 * @param  {String} col Raw input from the textfield
 * @return {Integer}     Parsed integer which will be assigned back to the textfield.
 */
function verifyColor(col) {
    var parsed = parseInt(col, 10);
    var corr = 0;
    if (!isNaN(parsed)) {
        if (parsed > 255) { corr = 255; }
        else if (parsed < 0) { corr = 0; }
        else { corr = parsed; }
    }
    return corr;
}