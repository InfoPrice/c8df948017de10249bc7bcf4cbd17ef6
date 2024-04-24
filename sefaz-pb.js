/*Setup crypto. Import in index.hmtl*/
var i = crypto;

/* Setup a */
var setupA = function(e) {
    var t, n;
    t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    n = {
        rotl: function(e, t) {
            return e << t | e >>> 32 - t
        },
        rotr: function(e, t) {
            return e << 32 - t | e >>> t
        },
        endian: function(e) {
            if (e.constructor == Number)
                return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
            for (var t = 0; t < e.length; t++)
                e[t] = n.endian(e[t]);
            return e
        },
        randomBytes: function(e) {
            for (var t = []; e > 0; e--)
                t.push(Math.floor(256 * Math.random()));
            return t
        },
        bytesToWords: function(e) {
            for (var t = [], n = 0, a = 0; n < e.length; n++,
            a += 8)
                t[a >>> 5] |= e[n] << 24 - a % 32;
            return t
        },
        wordsToBytes: function(e) {
            for (var t = [], n = 0; n < 32 * e.length; n += 8)
                t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
            return t
        },
        bytesToHex: function(e) {
            for (var t = [], n = 0; n < e.length; n++)
                t.push((e[n] >>> 4).toString(16)),
                t.push((15 & e[n]).toString(16));
            return t.join("")
        },
        hexToBytes: function(e) {
            for (var t = [], n = 0; n < e.length; n += 2)
                t.push(parseInt(e.substr(n, 2), 16));
            return t
        },
        bytesToBase64: function(e) {
            for (var n = [], a = 0; a < e.length; a += 3)
                for (var i = e[a] << 16 | e[a + 1] << 8 | e[a + 2], r = 0; r < 4; r++)
                    8 * a + 6 * r <= 8 * e.length ? n.push(t.charAt(i >>> 6 * (3 - r) & 63)) : n.push("=");
            return n.join("")
        },
        base64ToBytes: function(e) {
            e = e.replace(/[^A-Z0-9+\/]/ig, "");
            for (var n = [], a = 0, i = 0; a < e.length; i = ++a % 4)
                0 != i && n.push((t.indexOf(e.charAt(a - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | t.indexOf(e.charAt(a)) >>> 6 - 2 * i);
            return n
        }
    }
    return n
}
a = setupA();

/* Setup o */
var setupO = function(method) {
    var t = {
        utf8: {
            stringToBytes: function(e) {
                return t.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(t.bin.bytesToString(e)))
            }
        },
        bin: {
            stringToBytes: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push(255 & e.charCodeAt(n));
                return t
            },
            bytesToString: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push(String.fromCharCode(e[n]));
                return t.join("")
            }
        }
    };
    return t[method]
}

o = setupO('utf8')
obin = setupO('bin')

/*
Setup f, p, g, v
*/

f = function(e, t, n, a, i, r, o) {
    var u = e + (t & n | ~t & a) + (i >>> 0) + o;
    return (u << r | u >>> 32 - r) + t
}

p = function(e, t, n, a, i, r, o) {
    var u = e + (t & a | n & ~a) + (i >>> 0) + o;
    return (u << r | u >>> 32 - r) + t
}

g = function(e, t, n, a, i, r, o) {
    var u = e + (t ^ n ^ a) + (i >>> 0) + o;
    return (u << r | u >>> 32 - r) + t
}

v = function(e, t, n, a, i, r, o) {
    var u = e + (n ^ (t | ~a)) + (i >>> 0) + o;
    return (u << r | u >>> 32 - r) + t
}

/* Setup u */
var u = function(e, t) {
    e.constructor == String ? e = t && "binary" === t.encoding ? obin.stringToBytes(e) : o.stringToBytes(e) : r(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
    for (var n = a.bytesToWords(e), s = 8 * e.length, d = 1732584193, l = -271733879, m = -1732584194, c = 271733878, h = 0; h < n.length; h++)
        n[h] = (n[h] << 8 | n[h] >>> 24) & 16711935 | (n[h] << 24 | n[h] >>> 8) & 4278255360;
    n[s >>> 5] |= 128 << s % 32,
    n[(s + 64 >>> 9 << 4) + 14] = s;
    // for (var f = u._ff, p = u._gg, g = u._hh, v = u._ii, h = 0; h < n.length; h += 16) { -- change to get functions from global
    for (h = 0; h < n.length; h += 16) {
        var b = d
          , w = l
          , y = m
          , k = c;
        d = f(d, l, m, c, n[h + 0], 7, -680876936),
        c = f(c, d, l, m, n[h + 1], 12, -389564586),
        m = f(m, c, d, l, n[h + 2], 17, 606105819),
        l = f(l, m, c, d, n[h + 3], 22, -1044525330),
        d = f(d, l, m, c, n[h + 4], 7, -176418897),
        c = f(c, d, l, m, n[h + 5], 12, 1200080426),
        m = f(m, c, d, l, n[h + 6], 17, -1473231341),
        l = f(l, m, c, d, n[h + 7], 22, -45705983),
        d = f(d, l, m, c, n[h + 8], 7, 1770035416),
        c = f(c, d, l, m, n[h + 9], 12, -1958414417),
        m = f(m, c, d, l, n[h + 10], 17, -42063),
        l = f(l, m, c, d, n[h + 11], 22, -1990404162),
        d = f(d, l, m, c, n[h + 12], 7, 1804603682),
        c = f(c, d, l, m, n[h + 13], 12, -40341101),
        m = f(m, c, d, l, n[h + 14], 17, -1502002290),
        l = f(l, m, c, d, n[h + 15], 22, 1236535329),
        d = p(d, l, m, c, n[h + 1], 5, -165796510),
        c = p(c, d, l, m, n[h + 6], 9, -1069501632),
        m = p(m, c, d, l, n[h + 11], 14, 643717713),
        l = p(l, m, c, d, n[h + 0], 20, -373897302),
        d = p(d, l, m, c, n[h + 5], 5, -701558691),
        c = p(c, d, l, m, n[h + 10], 9, 38016083),
        m = p(m, c, d, l, n[h + 15], 14, -660478335),
        l = p(l, m, c, d, n[h + 4], 20, -405537848),
        d = p(d, l, m, c, n[h + 9], 5, 568446438),
        c = p(c, d, l, m, n[h + 14], 9, -1019803690),
        m = p(m, c, d, l, n[h + 3], 14, -187363961),
        l = p(l, m, c, d, n[h + 8], 20, 1163531501),
        d = p(d, l, m, c, n[h + 13], 5, -1444681467),
        c = p(c, d, l, m, n[h + 2], 9, -51403784),
        m = p(m, c, d, l, n[h + 7], 14, 1735328473),
        l = p(l, m, c, d, n[h + 12], 20, -1926607734),
        d = g(d, l, m, c, n[h + 5], 4, -378558),
        c = g(c, d, l, m, n[h + 8], 11, -2022574463),
        m = g(m, c, d, l, n[h + 11], 16, 1839030562),
        l = g(l, m, c, d, n[h + 14], 23, -35309556),
        d = g(d, l, m, c, n[h + 1], 4, -1530992060),
        c = g(c, d, l, m, n[h + 4], 11, 1272893353),
        m = g(m, c, d, l, n[h + 7], 16, -155497632),
        l = g(l, m, c, d, n[h + 10], 23, -1094730640),
        d = g(d, l, m, c, n[h + 13], 4, 681279174),
        c = g(c, d, l, m, n[h + 0], 11, -358537222),
        m = g(m, c, d, l, n[h + 3], 16, -722521979),
        l = g(l, m, c, d, n[h + 6], 23, 76029189),
        d = g(d, l, m, c, n[h + 9], 4, -640364487),
        c = g(c, d, l, m, n[h + 12], 11, -421815835),
        m = g(m, c, d, l, n[h + 15], 16, 530742520),
        l = g(l, m, c, d, n[h + 2], 23, -995338651),
        d = v(d, l, m, c, n[h + 0], 6, -198630844),
        c = v(c, d, l, m, n[h + 7], 10, 1126891415),
        m = v(m, c, d, l, n[h + 14], 15, -1416354905),
        l = v(l, m, c, d, n[h + 5], 21, -57434055),
        d = v(d, l, m, c, n[h + 12], 6, 1700485571),
        c = v(c, d, l, m, n[h + 3], 10, -1894986606),
        m = v(m, c, d, l, n[h + 10], 15, -1051523),
        l = v(l, m, c, d, n[h + 1], 21, -2054922799),
        d = v(d, l, m, c, n[h + 8], 6, 1873313359),
        c = v(c, d, l, m, n[h + 15], 10, -30611744),
        m = v(m, c, d, l, n[h + 6], 15, -1560198380),
        l = v(l, m, c, d, n[h + 13], 21, 1309151649),
        d = v(d, l, m, c, n[h + 4], 6, -145523070),
        c = v(c, d, l, m, n[h + 11], 10, -1120210379),
        m = v(m, c, d, l, n[h + 2], 15, 718787259),
        l = v(l, m, c, d, n[h + 9], 21, -343485551),
        d = d + b >>> 0,
        l = l + w >>> 0,
        m = m + y >>> 0,
        c = c + k >>> 0
    }
    return a.endian([d, l, m, c])
}



/* Setup "toBytes" */
var toBytes = function(e, t) {
    if (null == e)
        throw Error("Illegal argument " + e);
    var n = a.wordsToBytes(u(e, t));
    return t && t.asBytes ? n : t && t.asString ? o.bytesToString(n) : a.bytesToHex(n)
}


// 'products/prices'
var main = function(e) {
    var o = toBytes(i.randomUUID());
    var l = toBytes("".concat(o, "#").concat(e)) 
    var a = toBytes("".concat(o, ".").concat(l))
    return {
        "request-hac": o, "path": l, "request-id": a
    }
}

window.onload = function() {
    var r = main('procuts/prices')
    document.getElementById("response").innerHTML=JSON.stringify(r)
};
