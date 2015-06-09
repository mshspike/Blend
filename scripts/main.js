var red   = 0;
var green = 0;
var blue  = 0;

$("#new_col").on("click", function() {
    $(".bubble-block").addClass("spin-360");
    setTimeout(function() { setRandomColor(); }, 1500);
    setTimeout(function() { $(".bubble-block").removeClass("spin-360"); }, 2000);
});

function setRandomColor() { setColor((Math.floor(Math.random()*255)),(Math.floor(Math.random()*255)),(Math.floor(Math.random()*255))); }

/**
 * Document ready function. Set a random color when page is reloaded
 */
$(document).ready(function() {
    setRandomColor();
    $("#hex").focus();
});

$(".rgb-bubble").on("click", function(e) {
    var this_val = $(this).children().first().children("input[type=range]").val();
    var shift = 2;
    if (e.pageX < ($(this).offset().left + ($(this).width() / 2)+32)) {
        shift *= -1;
    }
    if ((this_val < (0-shift)) || (this_val > (255-shift))) {
        shift = 0;
    }

    if ($(this).data("color") == "red") {
        setColor(getRed()+shift, getGreen(), getBlue());
    } else if ($(this).data("color") == "green") {
        setColor(getRed(), getGreen()+shift, getBlue());
    } else if ($(this).data("color") == "blue") {
        setColor(getRed(), getGreen(), getBlue()+shift);
    }
});

$(".rgb-input").on("click", function(e) { e.stopPropagation(); });

$("input[type=text]").on("paste", function(e) {
    var pastedText;
    if (pastedText = e.originalEvent.clipboardData.getData('Text')) {
        // All browsers other than IE
        
        if (/([0-9]{1,3}[ ,;\t]+){2}[0-9]{1,3}/.test(pastedText)) {
            /* RGB */
            console.log("RGB detected!");
            var splitText = pastedText.match(/\S+/g);
            var rgb = [];
            $.each(splitText, function(index, value) {
                rgb[index] = validateColor(value);
            });
            setTimeout(function() {
                setColor(rgb[0], rgb[1], rgb[2]);
            }, 100);
        } else if (/[#]{0,1}[0-9A-Fa-f]{6}/.test(pastedText)) {
            /* HEX */
            console.log("HEX detected! string = " + pastedText);
            var rgb = hextorgb(pastedText);
            setTimeout(function () {
                setColor(rgb[0], rgb[1], rgb[2]);
            });
        } else {
            console.log("Nothing special detected...");
        }

        // Todo: use try-catch to catch typeError
        
    } else if (pastedText = window.clipboardData.getData('Text')) {
        // IE
        console.log("[win] Pasted event captured! text = " + pastedText);
    }
});

$("[id^=text]").on("click", function() { $(this).select(); });

/**
* Capture "tab" key on the 3 RGB input.
* It is to allow using tab key to loop through each RGB color.
*/
$(".bubble-content").on("keydown", "[id^=text]", function(e) {
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
$(".rgb-input").on("change", function() {
    $(this).val(validateColor($(this).val()));

    var type = $(this).attr("type");
    var rgb  = [validateColor($("#"+type+"_red").val()),
                validateColor($("#"+type+"_green").val()),
                validateColor($("#"+type+"_blue").val()) ];

    if (type == "text") {
        $("[id^=range]").each(function(i) { $(this).val(rgb[i]); });
    } else {
        $("[id^=text]").each(function(i) { $(this).val(rgb[i]); });
    }
    $("#hex").val("#"+rgbtohex(rgb[0], rgb[1], rgb[2]));

    setColor(rgb[0],rgb[1],rgb[2]);
});

$(".rgb-input").on("click", function() {
    // Nothing happen. LOL
});

/**
 * Set final color.
 * @param {[type]} r Red integer range 0-255
 * @param {[type]} g Green integer range 0-255
 * @param {[type]} b Blue integer range 0-255
 */
function setColor(r,g,b) {
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

    // Set RGB bubble text
    setEach("red",   r);
    setEach("green", g);
    setEach("blue",  b);

    // Set hex text & background-color
    $("#hex").val("#"+rgbtohex(r,g,b));
    //$("#hex").css("color", "rgb("+r+","+g+","+b+")");
    $("body").css("background-color","rgb("+r+","+g+","+b+")")
}

function hextorgb(hex) {
    var rgb = [];

    if (hex.length == 7) {
        if (hex[0] == "#") { hex = hex.substr(1); }
    }
    console.log("hex = " + hex);
    var rgbhex = [hex[0]+hex[1],
                  hex[2]+hex[3],
                  hex[4]+hex[5]];
    console.log("rgbhex = " + rgbhex);
    $.each(rgbhex, function(index, value) {
        rgb[index] = parseInt(value, 16);
    });

    console.log("rgb = " + rgb);
    return rgb;
}

function rgbtohex(r,g,b) {
    var rgb = [r,g,b];
    var hex = [];
    $.each(rgb, function(index, value) { hex.push(colortohex(value)); });
    return (hex[0] + hex[1] + hex[2]).toUpperCase();
}

function colortohex(color) {
    var hex = parseInt(color,10).toString(16);
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
function validateColor(col) {
    var parsed = parseInt(col, 10);
    var corr = 0;
    if (!isNaN(parsed)) {
        if (parsed > 255) { corr = 255; }
        else if (parsed < 0) { corr = 0; }
        else { corr = parsed; }
    }
    return corr;
}

function getIndivColor(color) { return parseInt($("#range_"+color).val(),10); }
function getRed() { return parseInt($("#range_red").val(),10); }
function getGreen() { return parseInt($("#range_green").val(),10); }
function getBlue() { return parseInt($("#range_blue").val(),10); }