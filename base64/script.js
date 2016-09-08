var text;
var base64;
window.onload = function () {
    text = document.getElementById("text");
    base64 = document.getElementById("base64");
};

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function textEventHandler() {
    try {
        base64.value = b64EncodeUnicode(text.value);
    } catch (e) {
        base64.value = "invalid text " + String.fromCodePoint(0x1F61E); // disappointed emoji
    }
}

function base64EventHandler() {
    try {
        text.value = b64DecodeUnicode(base64.value);
    } catch (e) {
        text.value = "invalid base64 " + String.fromCodePoint(0x1F61E); // disappointed emoji
    }
}