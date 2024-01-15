"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
  return function() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// kolmafia-polyfill.js
var kolmafia, console, init_kolmafia_polyfill = __esm({
  "kolmafia-polyfill.js": function() {
    "use strict";
    kolmafia = require("kolmafia"), console = {
      log: kolmafia.print
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Snapshot: function() {
    return Snapshot;
  }
});
module.exports = __toCommonJS(src_exports);
init_kolmafia_polyfill();

// src/snapshot.ts
init_kolmafia_polyfill();
var import_kolmafia4 = require("kolmafia");

// node_modules/libram/dist/lib.js
init_kolmafia_polyfill();
var import_kolmafia2 = require("kolmafia");

// node_modules/libram/dist/template-string.js
init_kolmafia_polyfill();
var import_kolmafia = require("kolmafia");

// node_modules/libram/dist/utils.js
init_kolmafia_polyfill();
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function sum(addends, x) {
  return addends.reduce(function(subtotal, element) {
    return subtotal + (typeof x == "function" ? x(element) : element[x]);
  }, 0);
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}
function undelay(delayedObject) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    args[_key - 1] = arguments[_key];
  return typeof delayedObject == "function" ? delayedObject.apply(void 0, args) : delayedObject;
}
function makeByXFunction(source) {
  return function(options) {
    var _options$val, val = undelay(source);
    return "default" in options ? (_options$val = options[val]) !== null && _options$val !== void 0 ? _options$val : options.default : options[val];
  };
}

// node_modules/libram/dist/template-string.js
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, handleTypeGetError = function(Type, error) {
  var message = "".concat(error), match = message.match(RegExp("Bad ".concat(Type.name.toLowerCase(), " value: .*")));
  match ? (0, import_kolmafia.print)("".concat(match[0], "; if you're certain that this ").concat(Type.name, " exists and is spelled correctly, please update KoLMafia"), "red") : (0, import_kolmafia.print)(message);
}, createSingleConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    try {
      return Type.get(input);
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia.abort)();
  };
  return tagFunction.none = Type.none, tagFunction;
}, createPluralConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    if (input === "")
      return Type.all();
    try {
      return Type.get(splitByCommasWithEscapes(input));
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia.abort)();
  };
  return tagFunction.all = function() {
    return Type.all();
  }, tagFunction;
}, $bounty = createSingleConstant(import_kolmafia.Bounty), $bounties = createPluralConstant(import_kolmafia.Bounty), $class = createSingleConstant(import_kolmafia.Class), $classes = createPluralConstant(import_kolmafia.Class), $coinmaster = createSingleConstant(import_kolmafia.Coinmaster), $coinmasters = createPluralConstant(import_kolmafia.Coinmaster), $effect = createSingleConstant(import_kolmafia.Effect), $effects = createPluralConstant(import_kolmafia.Effect), $element = createSingleConstant(import_kolmafia.Element), $elements = createPluralConstant(import_kolmafia.Element), $familiar = createSingleConstant(import_kolmafia.Familiar), $familiars = createPluralConstant(import_kolmafia.Familiar), $item = createSingleConstant(import_kolmafia.Item), $items = createPluralConstant(import_kolmafia.Item), $location = createSingleConstant(import_kolmafia.Location), $locations = createPluralConstant(import_kolmafia.Location), $modifier = createSingleConstant(import_kolmafia.Modifier), $modifiers = createPluralConstant(import_kolmafia.Modifier), $monster = createSingleConstant(import_kolmafia.Monster), $monsters = createPluralConstant(import_kolmafia.Monster), $phylum = createSingleConstant(import_kolmafia.Phylum), $phyla = createPluralConstant(import_kolmafia.Phylum), $servant = createSingleConstant(import_kolmafia.Servant), $servants = createPluralConstant(import_kolmafia.Servant), $skill = createSingleConstant(import_kolmafia.Skill), $skills = createPluralConstant(import_kolmafia.Skill), $slot = createSingleConstant(import_kolmafia.Slot), $slots = createPluralConstant(import_kolmafia.Slot), $stat = createSingleConstant(import_kolmafia.Stat), $stats = createPluralConstant(import_kolmafia.Stat), $thrall = createSingleConstant(import_kolmafia.Thrall), $thralls = createPluralConstant(import_kolmafia.Thrall), $path = createSingleConstant(import_kolmafia.Path), $paths = createPluralConstant(import_kolmafia.Path);

// node_modules/libram/dist/lib.js
var _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
}
function _arrayLikeToArray2(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t)
          return;
        f = !1;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0)
          ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var Wanderer;
(function(Wanderer2) {
  Wanderer2.Digitize = "Digitize Monster", Wanderer2.Enamorang = "Enamorang Monster", Wanderer2.Familiar = "Familiar", Wanderer2.Holiday = "Holiday Monster", Wanderer2.Kramco = "Kramco", Wanderer2.Nemesis = "Nemesis Assassin", Wanderer2.Portscan = "portscan.edu", Wanderer2.Romantic = "Romantic Monster", Wanderer2.Vote = "Vote Monster";
})(Wanderer || (Wanderer = {}));
var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
function getFoldGroup(item) {
  return Object.entries((0, import_kolmafia2.getRelated)(item, "fold")).sort(function(_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2), a = _ref3[1], _ref4 = _slicedToArray(_ref2, 2), b = _ref4[1];
    return a - b;
  }).map(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1), i = _ref6[0];
    return import_kolmafia2.Item.get(i);
  });
}
var holidayWanderers = /* @__PURE__ */ new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
var telescopeStats = /* @__PURE__ */ new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]), telescopeElements = /* @__PURE__ */ new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap1 = /* @__PURE__ */ new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap2 = /* @__PURE__ */ new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap3 = /* @__PURE__ */ new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
var byStat = makeByXFunction(function() {
  return (0, import_kolmafia2.myPrimestat)().toString();
}), byClass = makeByXFunction(function() {
  return (0, import_kolmafia2.myClass)().toString();
});

// src/itemValue.ts
init_kolmafia_polyfill();
var import_kolmafia3 = require("kolmafia");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject92, _templateObject102, _templateObject112, _templateObject122, _templateObject132, _templateObject142, _templateObject152, _templateObject162, _templateObject172, _templateObject182, _templateObject192, _templateObject202, _templateObject212, _templateObject222, _templateObject232, _templateObject242, _templateObject252, _templateObject262, _templateObject272, _templateObject282, _templateObject292, _templateObject302, _templateObject312, _templateObject322, _templateObject332, _templateObject342, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62;
function _taggedTemplateLiteral2(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function itemValue(item) {
  switch (item) {
    case $item(_templateObject || (_templateObject = _taggedTemplateLiteral2(["Mob Penguin cellular phone"]))):
      return 0;
    case $item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral2(["Loathing Idol Microphone (75% charged)"]))):
      return 0.75 * itemValue($item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral2(["Loathing Idol Microphone"]))));
    case $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral2(["Loathing Idol Microphone (50% charged)"]))):
      return 0.5 * itemValue($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral2(["Loathing Idol Microphone"]))));
    case $item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral2(["Loathing Idol Microphone (25% charged)"]))):
      return 0.25 * itemValue($item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral2(["Loathing Idol Microphone"]))));
  }
  function specialValue(item2) {
    switch (item2) {
      case $item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral2(["Spooky Putty monster"]))):
        return itemValue($item(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral2(["Spooky Putty sheet"]))));
      case $item(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral2(["empty Rain-Doh can"]))):
        return itemValue($item(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral2(["can of Rain-Doh"]))));
      case $item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral2(["coffee pixie stick"]))):
        return itemValue($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral2(["Game Grid ticket"])))) * 10;
      case $item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral2(["roll of Hob-Os"]))):
        return 4.5 * averageValue($items(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral2(["sterno-flavored Hob-O, frostbite-flavored Hob-O, fry-oil-flavored Hob-O, strawberry-flavored Hob-O, garbage-juice-flavored Hob-O"]))));
      case $item(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral2(["BRICKO brick"]))):
        return 90;
      case $item(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral2(["BRICKO trunk"]))):
        return 5 * itemValue($item(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral2(["BRICKO brick"])))) + itemValue($item(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral2(["BRICKO eye brick"])))) / 10;
      case $item(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral2(["d4"]))):
        return 2.5 * itemValue($item(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral2(["generic restorative potion"]))));
      case $item(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral2(["d6"]))):
        return 3.5 * itemValue($item(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral2(["generic mana potion"]))));
      case $item(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral2(["d8"]))):
        return 4.5 * itemValue($item(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral2(["generic healing potion"]))));
      case $item(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral2(["bag of park garbage"]))):
        return 200;
      case $item(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral2(["Gathered Meat-Clip"]))):
        return 520;
      case $item(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral2(["1,970 carat gold"]))):
        return 20500;
      case $item(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral2(["unfinished ice sculpture"]))):
        return 3 * itemValue($item(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral2(["snow berries"])))) + 3 * itemValue($item(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral2(["ice harvest"]))));
      case $item(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral2(["fake hand"]))):
        return 5e4;
      case $item(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral2(["free-range mushroom"]))):
        return 3 * itemValue($item(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral2(["mushroom filet"]))));
      case $item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral2(["plump free-range mushroom"]))):
        return itemValue($item(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral2(["free-range mushroom"])))) + 3 * itemValue($item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral2(["mushroom filet"]))));
      case $item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral2(["bulky free-range mushroom"]))):
        return itemValue($item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral2(["plump free-range mushroom"])))) + 3 * itemValue($item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral2(["mushroom filet"]))));
      case $item(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral2(["giant free-range mushroom"]))):
        return itemValue($item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral2(["bulky free-range mushroom"])))) + itemValue($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral2(["mushroom slab"]))));
      case $item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral2(["immense free-range mushroom"]))):
        return itemValue($item(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral2(["giant free-range mushroom"])))) + itemValue($item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral2(["mushroom slab"]))));
      case $item(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral2(["colossal free-range mushroom"]))):
        return itemValue($item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral2(["immense free-range mushroom"])))) + itemValue($item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral2(["house-sized mushroom"]))));
      case $item(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral2(["Freddy Kruegerand"]))):
        return 0.95 * Math.max(itemValue($item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral2(["bottle of Bloodweiser"])))), itemValue($item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral2(["electric Kool-Aid"]))))) / 200;
      case $item(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral2(["FunFunds\u2122"]))):
        return itemValue($item(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral2(["one-day ticket to Dinseylandfill"])))) / 20;
      case $item(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral2(["Beach Buck"]))):
        return itemValue($item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral2(["one-day ticket to Spring Break Beach"])))) / 100;
      case $item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral2(["Volcoino"]))):
        return itemValue($item(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral2(["one-day ticket to That 70s Volcano"])))) / 3;
      case $item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral2(["Coinspiracy"]))):
        return itemValue($item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral2(["one-day ticket to Conspiracy Island"])))) / 100;
      case $item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral2(["Wal-Mart gift certificate"]))):
        return itemValue($item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral2(["one-day ticket to The Glaciest"])))) / 50;
      default:
        return (0, import_kolmafia3.npcPrice)(item2) > 0 ? (0, import_kolmafia3.npcPrice)(item2) : 0;
    }
  }
  function singularValue(item2) {
    var minValue = specialValue(item2);
    return recentPrice(item2) <= Math.max(100, 2 * (0, import_kolmafia3.autosellPrice)(item2)) ? Math.max(minValue, (0, import_kolmafia3.autosellPrice)(item2)) : Math.max(minValue, recentPrice(item2));
  }
  var maxValue = singularValue(item);
  if ((0, import_kolmafia3.getRelated)(item, "zap").length > 0)
    for (var j in (0, import_kolmafia3.getRelated)(item, "zap"))
      maxValue = Math.min(maxValue, singularValue((0, import_kolmafia3.toItem)(j)));
  return maxValue;
}
function averageValue(itemList) {
  return itemList.length === 0 ? 0 : sum(itemList, function(i) {
    return itemValue(i);
  }) / itemList.length;
}
function recentPrice(item) {
  if (!item.tradeable)
    return 0;
  if ((0, import_kolmafia3.historicalAge)(item) < 7)
    return (0, import_kolmafia3.historicalPrice)(item) * 0.9;
  if ((0, import_kolmafia3.mallPrice)(item) > 0)
    return (0, import_kolmafia3.mallPrice)(item) * 0.9;
  if ((0, import_kolmafia3.mallPrice)(item) < 0 && (0, import_kolmafia3.myHash)() !== "")
    return (0, import_kolmafia3.isNpcItem)(item) ? 0 : (0, import_kolmafia3.historicalAge)(item) < 4015 ? (0, import_kolmafia3.historicalPrice)(item) * 0.9 : 1e9;
  throw "No idea how to price item: ".concat(item);
}

// src/snapshot.ts
var _templateObject63, _templateObject210, _templateObject310, _templateObject410, _templateObject510, _templateObject64, _templateObject72, _templateObject82, _templateObject93, _templateObject103, _templateObject113, _templateObject123, _templateObject133, _templateObject143, _templateObject153, _templateObject163, _templateObject173, _templateObject183, _templateObject193, _templateObject203, _templateObject213, _templateObject223, _templateObject233, _templateObject243, _templateObject253, _templateObject263, _templateObject273, _templateObject283, _templateObject293, _templateObject303, _templateObject313, _templateObject323, _templateObject333, _templateObject343;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return typeof i == "symbol" ? i : String(i);
}
function _toPrimitive(t, r) {
  if (typeof t != "object" || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (typeof i != "object")
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function _createForOfIteratorHelper2(o, allowArrayLike) {
  var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray3(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t)
          return;
        f = !1;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0)
          ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray3(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
}
function _iterableToArray(iter) {
  if (typeof Symbol < "u" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray3(arr);
}
function _arrayLikeToArray3(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral3(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function getEquipment() {
  var equippedItems = {};
  return $slots(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral3([""]))).forEach(function(slot) {
    var item = (0, import_kolmafia4.equippedItem)(slot);
    item !== $item.none && (equippedItems[item.name] = 1);
  }), equippedItems;
}
function mySnapshotItemsWrapper() {
  for (var inventoryOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, manyToOne = function(primary, mapped) {
    return mapped.map(function(target) {
      return [target, primary];
    });
  }, foldable = function(item) {
    return manyToOne(item, getFoldGroup(item));
  }, itemMappings = new Map([].concat(_toConsumableArray(foldable($item(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral3(["liar's pants"]))))), _toConsumableArray(foldable($item(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral3(["ice pick"]))))), _toConsumableArray(manyToOne($item(_templateObject410 || (_templateObject410 = _taggedTemplateLiteral3(["Spooky Putty sheet"]))), [$item(_templateObject510 || (_templateObject510 = _taggedTemplateLiteral3(["Spooky Putty monster"])))].concat(_toConsumableArray(getFoldGroup($item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral3(["Spooky Putty sheet"])))))))), _toConsumableArray(foldable($item(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral3(["stinky cheese sword"]))))), _toConsumableArray(foldable($item(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral3(["naughty paper shuriken"]))))), _toConsumableArray(foldable($item(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral3(["Loathing Legion knife"]))))), _toConsumableArray(foldable($item(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral3(["deceased crimbo tree"]))))), _toConsumableArray(foldable($item(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral3(["makeshift turban"]))))), _toConsumableArray(foldable($item(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral3(["turtle wax shield"]))))), _toConsumableArray(foldable($item(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral3(["metallic foil bow"]))))), _toConsumableArray(foldable($item(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral3(["ironic moustache"]))))), _toConsumableArray(foldable($item(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral3(["bugged balaclava"]))))), _toConsumableArray(foldable($item(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral3(["toggle switch (Bartend)"]))))), _toConsumableArray(foldable($item(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral3(["mushroom cap"]))))), _toConsumableArray(manyToOne($item(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral3(["can of Rain-Doh"]))), $items(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral3(["empty Rain-Doh can"]))))), _toConsumableArray(manyToOne($item(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral3(["meteorite fragment"]))), $items(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral3(["meteorite earring, meteorite necklace, meteorite ring"]))))), _toConsumableArray(manyToOne($item(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral3(["Sneaky Pete's leather jacket"]))), $items(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral3(["Sneaky Pete's leather jacket (collar popped)"]))))), _toConsumableArray(manyToOne($item(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral3(["Boris's Helm"]))), $items(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral3(["Boris's Helm (askew)"]))))), _toConsumableArray(manyToOne($item(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral3(["Jarlsberg's pan"]))), $items(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral3(["Jarlsberg's pan (Cosmic portal mode)"]))))), _toConsumableArray(manyToOne($item(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral3(["tiny plastic sword"]))), $items(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral3(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), _toConsumableArray(manyToOne($item(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral3(["earthenware muffin tin"]))), $items(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral3(["blueberry muffin, bran muffin, chocolate chip muffin"]))))), _toConsumableArray(manyToOne($item(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral3(["ChibiBuddy\u2122 (on)"]))), $items(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral3(["ChibiBuddy\u2122 (off)"]))))))), inventory = /* @__PURE__ */ new Map(), invLocations = inventoryOnly ? [import_kolmafia4.getInventory, getEquipment] : [import_kolmafia4.getInventory, getEquipment, import_kolmafia4.getCloset, import_kolmafia4.getDisplay, import_kolmafia4.getStorage], _i = 0, _invLocations = invLocations; _i < _invLocations.length; _i++)
    for (var inventoryFunc = _invLocations[_i], _i2 = 0, _Object$entries = Object.entries(inventoryFunc()); _i2 < _Object$entries.length; _i2++) {
      var _itemMappings$get, _inventory$get, _Object$entries$_i = _slicedToArray2(_Object$entries[_i2], 2), itemStr = _Object$entries$_i[0], quantity = _Object$entries$_i[1], _item = (0, import_kolmafia4.toItem)(itemStr), mappedItem = (_itemMappings$get = itemMappings.get(_item)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : _item;
      inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
    }
  for (var _i3 = 0, _Object$entries2 = Object.entries((0, import_kolmafia4.getCampground)()); _i3 < _Object$entries2.length; _i3++) {
    var _itemMappings$get2, _inventory$get2, _Object$entries2$_i = _slicedToArray2(_Object$entries2[_i3], 2), _itemStr = _Object$entries2$_i[0], _quantity = _Object$entries2$_i[1], _item2 = (0, import_kolmafia4.toItem)(_itemStr);
    if (_item2 !== $item(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral3(["big rock"])))) {
      var _mappedItem = (_itemMappings$get2 = itemMappings.get(_item2)) !== null && _itemMappings$get2 !== void 0 ? _itemMappings$get2 : _item2;
      inventory.set(_mappedItem, _quantity + ((_inventory$get2 = inventory.get(_mappedItem)) !== null && _inventory$get2 !== void 0 ? _inventory$get2 : 0));
    }
  }
  return inventory;
}
function inventoryOperation(a, b, op) {
  var difference = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper2(new Set([].concat(_toConsumableArray(a.keys()), _toConsumableArray(b.keys())))), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _a$get, _b$get, _item3 = _step.value;
      difference.set(_item3, op((_a$get = a.get(_item3)) !== null && _a$get !== void 0 ? _a$get : 0, (_b$get = b.get(_item3)) !== null && _b$get !== void 0 ? _b$get : 0));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var diffEntries = _toConsumableArray(difference.entries());
  return new Map(diffEntries.filter(function(_ref) {
    var _ref2 = _slicedToArray2(_ref, 2), value = _ref2[1];
    return value !== 0;
  }));
}
var Snapshot = /* @__PURE__ */ function() {
  function Snapshot2(meat, items, totalTurns, timestamp) {
    _classCallCheck(this, Snapshot2), _defineProperty(this, "meat", void 0), _defineProperty(this, "items", void 0), _defineProperty(this, "totalTurns", void 0), _defineProperty(this, "timestamp", void 0), this.meat = meat, this.items = items, this.totalTurns = totalTurns, this.timestamp = timestamp != null ? timestamp : /* @__PURE__ */ new Date();
  }
  return _createClass(Snapshot2, [{
    key: "register",
    value: function(target, quantity) {
      if (target === "meat")
        this.meat += quantity;
      else {
        var _this$items$get;
        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this Snapshot
     *
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */
  }, {
    key: "value",
    value: function(itemValue2) {
      var turns = this.totalTurns, meat = Math.floor(this.meat), itemDetails = _toConsumableArray(this.items.entries()).map(function(_ref3) {
        var _ref4 = _slicedToArray2(_ref3, 2), item = _ref4[0], quantity = _ref4[1];
        return {
          item: item,
          quantity: quantity,
          value: itemValue2(item) * quantity
        };
      }), items = Math.floor(sum(itemDetails, "value"));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails,
        turns: turns
      };
    }
    /**
     * Subtract the contents of another Snapshot from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param other the Snapshot from which to pull values to remove from this Snapshot
     * @returns a new Snapshot representing the difference between this Snapshot and the other Snapshot
     */
  }, {
    key: "diff",
    value: function(other) {
      var timeDiff = this.timestamp.getTime() - other.timestamp.getTime();
      return new Snapshot2(this.meat - other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a - b;
      }), this.totalTurns - other.totalTurns, new Date(timeDiff));
    }
    /**
     * Subtract the contents of snapshot b from snapshot a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param a the Snapshot from which to subtract elements
     * @param b the Snapshot from which to add elements
     * @returns a new Snapshot representing the difference between a and b
     */
  }, {
    key: "toFile",
    value: (
      /**
       * Export this Snapshot to a file in the data/ directory. Conventionally this file should end in ".json"
       *
       * @param filename The file into which to export
       */
      function(filename) {
        var val = {
          meat: this.meat,
          items: Object.fromEntries(this.items),
          totalTurns: this.totalTurns,
          timestamp: this.timestamp.toJSON()
        };
        (0, import_kolmafia4.bufferToFile)(JSON.stringify(val), Snapshot2.getFilepath(filename));
      }
    )
    /**
     * Import a Snapshot from a file in the data/ directory. Conventionally the file should end in ".json"
     *
     * @param filename The file from which to import
     * @returns the Snapshot represented by the file
     */
  }, {
    key: "computeMPA",
    value: (
      /**
       * @param other the Snapshot to diff against this Snapshot when computing MPA
       * @param options options for computing MPA
       * @param options.value a function to compute the meat value of a given item
       * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
       * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
       * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
       * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
       * @returns an analysis of the effective MPA for the given session
       */
      function(other, options) {
        return Snapshot2.computeMPA(this, other, options);
      }
    )
  }, {
    key: "printDiff",
    value: function(other) {
      var eventDiff = this.diff(other), mpa = other.computeMPA(this, {
        value: itemValue
      }), report = [];
      eventDiff.items.forEach(function(qty, item) {
        report.push({
          item: item,
          qty: qty,
          totalPrice: itemValue(item) * qty
        });
      });
      var sortedReport = report.sort(function(a, b) {
        return b.totalPrice - a.totalPrice;
      });
      (0, import_kolmafia4.printHtml)("<b>**********************************</b>");
      var gains = sortedReport.filter(function(_ref5) {
        var qty = _ref5.qty;
        return qty > 0;
      });
      gains.slice(0, 10).forEach(function(lineItem) {
        return (0, import_kolmafia4.print)("".concat(lineItem.qty, " ").concat(lineItem.item, ": ").concat((0, import_kolmafia4.toString)(lineItem.totalPrice, "%,.0f")));
      }), (0, import_kolmafia4.print)("---------------------------------");
      var losses = sortedReport.filter(function(_ref6) {
        var qty = _ref6.qty;
        return qty < 0;
      });
      losses.slice(-10).reverse().forEach(function(lineItem) {
        return (0, import_kolmafia4.print)("".concat(lineItem.qty, " ").concat(lineItem.item, ": ").concat((0, import_kolmafia4.toString)(lineItem.totalPrice, "%,.0f")));
      }), (0, import_kolmafia4.printHtml)("<b>**********************************</b>");
      var startTimeFormatted = formatTimestamp(other.timestamp, "HH:mm:ss"), endTimeFormatted = formatTimestamp(this.timestamp, "HH:mm:ss"), timeDiff = this.timestamp.getTime() - other.timestamp.getTime(), hours = Math.floor(timeDiff / 36e5).toString().padStart(2, "0"), minutes = Math.floor(timeDiff % 36e5 / 6e4).toString().padStart(2, "0"), seconds = Math.floor(timeDiff % 6e4 / 1e3).toString().padStart(2, "0"), timeDiffFormatted = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
      (0, import_kolmafia4.printHtml)("<b>Summary:</b>"), (0, import_kolmafia4.print)("From ".concat(startTimeFormatted, " to ").concat(endTimeFormatted, " took ").concat(timeDiffFormatted, ".")), (0, import_kolmafia4.print)("You've earned ".concat((0, import_kolmafia4.toString)(mpa.values.items, "%,.0f"), " in item differences."), "teal"), (0, import_kolmafia4.printHtml)("<font color=cc5500>You've earned ".concat((0, import_kolmafia4.toString)(mpa.values.meat, "%,.0f"), " liquid meat.</font>")), (0, import_kolmafia4.printHtml)("You've spent ".concat(mpa.turns, " adventures for a total (meat + item) <b>").concat((0, import_kolmafia4.toString)(mpa.mpa.effective, "%,.2f"), " mpa</b>.")), (0, import_kolmafia4.print)("You've earned a total of ".concat((0, import_kolmafia4.toString)(mpa.values.effective, "%,.0f"), " meat."), "teal"), (0, import_kolmafia4.print)("");
    }
  }], [{
    key: "diff",
    value: function(a, b) {
      return a.diff(b);
    }
  }, {
    key: "getFilepath",
    value: function(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0, import_kolmafia4.myName)(), "/").concat((0, import_kolmafia4.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function(filename) {
      var fileValue = (0, import_kolmafia4.fileToBuffer)(Snapshot2.getFilepath(filename));
      if (fileValue.length > 0) {
        var _val$totalTurns, val = JSON.parse(fileValue), parsedItems = Object.entries(val.items).map(function(_ref7) {
          var _ref8 = _slicedToArray2(_ref7, 2), itemStr = _ref8[0], quantity = _ref8[1];
          return [(0, import_kolmafia4.toItem)(itemStr), quantity];
        });
        return new Snapshot2(val.meat, new Map(parsedItems), (_val$totalTurns = val.totalTurns) !== null && _val$totalTurns !== void 0 ? _val$totalTurns : 0, new Date(val.timestamp));
      } else
        return new Snapshot2(0, /* @__PURE__ */ new Map(), 0);
    }
    /**
     * Return the meat and items for the current Snapshot
     *
     * @param inventoryOnly should closet, DC, and storage be ignored for the Snapshot calculation
     * @returns current Snapshot
     */
  }, {
    key: "current",
    value: function() {
      var inventoryOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, meat = inventoryOnly ? [import_kolmafia4.myMeat] : [import_kolmafia4.myMeat, import_kolmafia4.myClosetMeat, import_kolmafia4.myStorageMeat];
      return new Snapshot2(sum(meat, function(f) {
        return f();
      }), mySnapshotItemsWrapper(inventoryOnly), (0, import_kolmafia4.totalTurnsPlayed)());
    }
    /**
     * @param baseline the base Snapshot to use when computing MPA
     * @param full the full Snapshot to use when computing MPA
     * @param options options for computing MPA
     * @param options.value a function to compute the meat value of a given item
     * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
     * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
     * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
     * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
     * @returns an analysis of the effective MPA for the given Snapshots
     */
  }, {
    key: "computeMPA",
    value: function(baseline, full, options) {
      var _options$excludeValue, _excludeValue$meat, _excludeValue$item, value = options.value, excludeValue = (_options$excludeValue = options.excludeValue) !== null && _options$excludeValue !== void 0 ? _options$excludeValue : {
        meat: 0,
        item: 0
      }, isOutlier = options.isOutlier, result = full.diff(baseline).value(value), meatValue = result.meat - ((_excludeValue$meat = excludeValue.meat) !== null && _excludeValue$meat !== void 0 ? _excludeValue$meat : 0), outlierItems = isOutlier ? result.itemDetails.filter(isOutlier) : [], outliersValue = sum(outlierItems, function(detail) {
        return detail.value;
      }), itemValue2 = result.items - outliersValue - ((_excludeValue$item = excludeValue.item) !== null && _excludeValue$item !== void 0 ? _excludeValue$item : 0), turns = result.turns;
      return {
        mpa: {
          effective: (meatValue + itemValue2) / turns,
          total: (meatValue + itemValue2 + outliersValue) / turns,
          meat: meatValue / turns,
          items: itemValue2 / turns
        },
        values: {
          effective: meatValue + itemValue2,
          total: meatValue + itemValue2 + outliersValue,
          meat: meatValue,
          items: itemValue2
        },
        outlierItems: outlierItems,
        turns: turns
      };
    }
  }]), Snapshot2;
}();
function formatTimestamp(date, format) {
  var hours = date.getHours().toString().padStart(2, "0"), minutes = date.getMinutes().toString().padStart(2, "0"), seconds = date.getSeconds().toString().padStart(2, "0");
  return format.replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Snapshot
});
