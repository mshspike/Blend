function dectohex(oct) {
    var hex, temp, remainder;
    oct = parseInt(oct);

    temp = Math.floor(oct / 16);
    remainder = oct % 16;

    hex = String(convertHexDigit(remainder));

    if (temp > 0) {
        remainder = temp % 16;
        hex = String(convertHexDigit(remainder)) + hex;
    } else {
        hex = "0" + hex;
    }

    return hex;
}

function convertHexDigit(digit) {
    var ch = digit;
    switch (digit) {
        case 10: ch = "A"; break;
        case 11: ch = "B"; break;
        case 12: ch = "C"; break;
        case 13: ch = "D"; break;
        case 14: ch = "E"; break;
        case 15: ch = "F"; break;
    }
    return ch;
}

function rgbtohex(r, g, b) {
    return (dectohex(r) + dectohex(g) + dectohex(b));
}

function verifyRGB() {
    return true;
}

$(document).ready(function() {

    $(".input_rgb").focusout(function() {
        var r,g,b;
        switch ($(this).attr("name")) {
            case "red": r = $(this).val(); break;
            case "green": g = $(this).val(); break;
            case "blue": b = $(this).val(); break;
        }

        console.log("rgb = " +r+g+b);
        $("body").css("background-color", "#"+rgbtohex(r,g,b));
    });

});