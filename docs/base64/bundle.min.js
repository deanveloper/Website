(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var text = void 0;
var base64 = void 0;

function init() {
    text = document.querySelector("#text");
    base64 = document.querySelector("#base64");

    text.addEventListener("keydown", textEventHandler);
    text.addEventListener("keyup", textEventHandler);
    text.addEventListener("input", textEventHandler);
    base64.addEventListener("keydown", base64EventHandler);
    base64.addEventListener("keyup", base64EventHandler);
    base64.addEventListener("input", base64EventHandler);
}

if (document.readyState === "complete") {
    init();
} else {
    window.addEventListener("load", init);
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
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

},{}]},{},[1]);
