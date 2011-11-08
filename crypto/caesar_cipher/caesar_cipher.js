/**
 *
 * @see http://blog.aijoona.com
 * @author Valentin Starck
 */

/**
 *
 * @param {String} key
 * @param {Number} offset
 */
function CaesarCipher(key, offset) {
    this.offset = offset || 0;
    this.setupKey(key);
    this.createAlpha();
}

CaesarCipher.alpha = 'abcdefghijklmnopqrstuvwxyz';

CaesarCipher.prototype.setupKey = function(key) {
    this.key = key.replace(/\s*/g, '').split('').reduce(function(memo, chr) {
        if (memo.indexOf(chr) != -1 || chr == '') return memo;

        return memo + chr;
    }, '');
};

CaesarCipher.prototype.createAlpha = function() {
    this.originalAlpha = CaesarCipher.alpha;

    var
            original = this.originalAlpha,
            key = this.key, lastKeyChar = key.charAt(key.length - 1),
            splitPos = this.originalAlpha.indexOf(lastKeyChar) + 1;

    this.alpha = original.slice(splitPos) + original.slice(0, splitPos);

    this.alpha = key + this.alpha.replace(/./g, function(chr, index) {
        return key.indexOf(chr) == -1 ? chr : ''
    });
};

CaesarCipher.translate = CaesarCipher.prototype.translate = function(str, offset, from, to) {
    from = (from || CaesarCipher.alpha).split('');
    to = (to || CaesarCipher.alpha).split('');

    var
            l = from.length;

    return str.split('').reduce(function(memo, chr, i) {
        var
                index = from.indexOf(chr.toLowerCase()),
                up = /[A-Z]/.test(chr);

        if (index != -1) {
            chr = to[index + offset % l];
        }

        return memo + ( up ? chr.toUpperCase() : chr);
    }, '');
};


CaesarCipher.prototype.encrypt = function(str) {
    return this.translate(str, this.offset, this.alpha, this.originalAlpha);
};

CaesarCipher.prototype.decrypt = function(str) {
    return this.translate(str, -this.offset, this.originalAlpha, this.alpha);
};




