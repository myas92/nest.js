
const RandomBytes = (
    (typeof self !== 'undefined' && (self.crypto ))
        ? function() { // Browsers
            const crypto = (self.crypto), QUOTA = 65536;
            return function(n) {
                const a = new Uint8Array(n);
                for (let i = 0; i < n; i += QUOTA) {
                    crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
                }
                return a;
            };
        }
        : function() { // Node
            return require("crypto").randomBytes;
        }
)();


const RandomNumber = (max,min)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RandomNumberDecimal = (max,min)=>{
    return Math.random() * (max - min) + min;
};

const UniqueNumber = ()=>{
    return Number(new Date().getTime()).toString().replace('16138','')
};

exports.UniqueNumber=UniqueNumber
exports.RandomNumberDecimal=RandomNumberDecimal
exports.RandomNumber=RandomNumber
exports.RandomBytes=RandomBytes