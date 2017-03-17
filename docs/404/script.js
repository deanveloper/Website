(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PokemonEnum = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Move = require("./move/Move");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pokemon = function () {
    function Pokemon(name, moves) {
        _classCallCheck(this, Pokemon);

        // Name of the pokemon
        this.name = name;

        // Array of moves
        this.moves = moves;
    }

    _createClass(Pokemon, [{
        key: "use",
        value: function use(moveString) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.moves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var move = _step.value;

                    if (moveString === move.name) {
                        move.use(this);
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Pokemon;
}();

var PokemonEnum = exports.PokemonEnum = {
    FRIENDLY: new Pokemon("Abra", [_Move.Moves.TELEPORT, _Move.Moves.SLASH, _Move.Moves.NOTHING, _Move.Moves.NOTHING]),
    ENEMY: new Pokemon("404", [_Move.Moves.FILE, _Move.Moves.REDIRECT, _Move.Moves.NOTHING, _Move.Moves.NOTHING])
};

},{"./move/Move":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Moves = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _script = require("../../script");

var _Pokemon = require("../Pokemon");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Move = function () {
    function Move(name) {
        _classCallCheck(this, Move);

        console.assert(typeof name === "string", "name must be a string!");
        console.assert(this.use === Move.prototype.use);
        this.name = name;
    }

    _createClass(Move, [{
        key: "use",
        value: function use(pokemon) {
            var _this = this;

            if (this !== Moves.NOTHING) {
                (0, _script.pokeMessage)(pokemon.name + " used " + this.name + "!", function () {
                    window.setTimeout(_this.onUse, 1000);
                });
            }
        }
    }, {
        key: "onUse",
        value: function onUse() {
            console.warn("onUse not overridden");
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.name;
        }
    }]);

    return Move;
}();

var Nothing = function (_Move) {
    _inherits(Nothing, _Move);

    function Nothing() {
        _classCallCheck(this, Nothing);

        return _possibleConstructorReturn(this, (Nothing.__proto__ || Object.getPrototypeOf(Nothing)).call(this, "-----"));
    }

    _createClass(Nothing, [{
        key: "onUse",
        value: function onUse() {}
    }]);

    return Nothing;
}(Move);

var Teleport = function (_Move2) {
    _inherits(Teleport, _Move2);

    function Teleport() {
        _classCallCheck(this, Teleport);

        return _possibleConstructorReturn(this, (Teleport.__proto__ || Object.getPrototypeOf(Teleport)).call(this, "Teleport"));
    }

    _createClass(Teleport, [{
        key: "onUse",
        value: function onUse() {
            (0, _script.pokeMessage)("You were teleported to the main page!", _script.redirToMain);
        }
    }]);

    return Teleport;
}(Move);

var Slash = function (_Move3) {
    _inherits(Slash, _Move3);

    function Slash() {
        _classCallCheck(this, Slash);

        return _possibleConstructorReturn(this, (Slash.__proto__ || Object.getPrototypeOf(Slash)).call(this, "Slash"));
    }

    _createClass(Slash, [{
        key: "onUse",
        value: function onUse() {
            var msg = "But it " + (Math.random() < .5 ? "missed!" : "failed!");
            (0, _script.pokeMessage)(msg, function () {
                return (Math.random() < .8 ? Moves.FILE : Moves.REDIRECT).use(_Pokemon.PokemonEnum.ENEMY);
            });
        }
    }]);

    return Slash;
}(Move);

var File = function (_Move4) {
    _inherits(File, _Move4);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, "File"));
    }

    _createClass(File, [{
        key: "onUse",
        value: function onUse() {
            if (!this.counter) {
                this.counter = 0;
            }

            switch (this.counter) {
                case 0:
                    (0, _script.pokeMessage)("It was not found!", _script.mainMenu);
                    break;
                case 1:
                    (0, _script.pokeMessage)("It was still not found...", _script.mainMenu);
                    break;
                case 2:
                    (0, _script.pokeMessage)("The pokemon could not be found! Fleeing from battle...", _script.redirToMain);
                    break;
                default:
                    (0, _script.pokeMessage)("You should never see this message... counter is " + this.counter, _script.redirToMain);
                    break;
            }

            this.counter++;
        }
    }]);

    return File;
}(Move);

var Redirect = function (_Move5) {
    _inherits(Redirect, _Move5);

    function Redirect() {
        _classCallCheck(this, Redirect);

        return _possibleConstructorReturn(this, (Redirect.__proto__ || Object.getPrototypeOf(Redirect)).call(this, "Redirect"));
    }

    _createClass(Redirect, [{
        key: "onUse",
        value: function onUse() {
            (0, _script.pokeMessage)("You were redirected to the main page!", _script.redirToMain);
        }
    }]);

    return Redirect;
}(Move);

var Moves = exports.Moves = {
    NOTHING: new Nothing(),
    TELEPORT: new Teleport(),
    SLASH: new Slash(),
    FILE: new File(),
    REDIRECT: new Redirect()
};

},{"../../script":3,"../Pokemon":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.br = exports.bl = exports.tr = exports.tl = undefined;
exports.pokeMessage = pokeMessage;
exports.mainMenu = mainMenu;
exports.clearMenu = clearMenu;
exports.redirToMain = redirToMain;

var _Pokemon = require("./pokemon/Pokemon");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var tl = exports.tl = void 0;
var tr = exports.tr = void 0;
var bl = exports.bl = void 0;
var br = exports.br = void 0;

window.addEventListener("load", function () {
    exports.tl = tl = document.getElementById("tl");
    exports.tr = tr = document.getElementById("tr");
    exports.bl = bl = document.getElementById("bl");
    exports.br = br = document.getElementById("br");

    var audio = document.querySelector("audio");
    audio.volume = .25;

    window.setInterval(function () {
        if (audio.currentTime >= 50.5) {
            audio.currentTime = 13.95;
        }
    }, 10);

    setTimeout(function () {
        document.querySelector("#enemy").style.left = "350px";
        pokeMessage("A wild 404 appeared!", function () {
            document.querySelector("#friendly").style.right = "250px";
            pokeMessage("Go, ABRA!", function () {
                mainMenu();
            });
        });
    }, 500);

    var _arr = [tl, tr, bl, br];

    var _loop = function _loop() {
        var elem = _arr[_i];
        elem.addEventListener("click", function () {
            return mouseClicked(elem);
        });
        elem.addEventListener("mouseover", function () {
            return mousedOver(elem);
        });
        elem.addEventListener("mouseout", function () {
            return mouseOut(elem);
        });
    };

    for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
    }

    var _arr2 = ["#fPlat", "#ePlat"];
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var id = _arr2[_i2];
        var _elem = document.querySelector(id);
        var ctx = _elem.getContext("2d");
        ctx.beginPath();
        ctx.ellipse(_elem.width / 2, _elem.height / 2, _elem.width / 2, _elem.height / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
});

function pokeMessage(string, callback) {
    var counter = 0;
    var div = document.querySelector("#messageBox");
    div.textContent = "";
    div.style.width = "96%";
    document.getElementById("optionsBox").style.display = "none";
    clearMenu();
    var interval = window.setInterval(function () {
        if (counter < string.length) {
            div.innerHTML += string[counter];
            counter++;
        } else {
            clearInterval(interval);
            window.setTimeout(callback, 1000);
        }
    }, 50);
}

function mainMenu(tltext, trtext, bltext, brtext) {
    if (tltext === undefined) {
        mainMenu("FIGHT", "PKMN", "BAG", "RUN");
        return;
    }
    if (tltext !== "" || tltext === undefined) {
        document.getElementById("optionsBox").style.display = "block";
        document.getElementById("messageBox").style.width = "47%";
    }
    tl.innerHTML = tltext;
    tr.innerHTML = trtext;
    bl.innerHTML = bltext;
    br.innerHTML = brtext;
}

function clearMenu() {
    mainMenu("", "", "", "");
}

function redirToMain() {
    window.top.location.href = 'https://www.deanveloper.com';
}

function mousedOver(data) {
    if (data.innerHTML !== "") data.innerHTML = "&gt; " + data.innerHTML;
}

function mouseOut(data) {
    if (data.innerHTML.substring(0, 5) === "&gt; ") data.innerHTML = data.innerHTML.substring(5);
}

function mouseClicked(data) {
    var string = data.innerHTML.substring(5);
    switch (string) {
        case "FIGHT":
            pokeMessage("What would you like to do?", function () {
                return mainMenu.apply(undefined, _toConsumableArray(_Pokemon.PokemonEnum.FRIENDLY.moves));
            });
            break;
        case "PKMN":
            pokeMessage("This is your only pokemon!", mainMenu);
            break;
        case "BAG":
            pokeMessage("This is a future feature!", mainMenu);
            // TODO: IMPLEMENT POKEBALLS
            break;
        case "RUN":
            pokeMessage("Got away safely!", redirToMain);
            break;
        default:
            _Pokemon.PokemonEnum.FRIENDLY.use(string);
    }
}

},{"./pokemon/Pokemon":1}]},{},[3]);
