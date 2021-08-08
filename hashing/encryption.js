let { Base64Decode, Base64Encode } = require("./base64");
let { AES128_Decrypt, AES128_Encrypt } = require("./aes");
let { RandomBytes } = require("./random");

// Secret Key
const secret = Base64Decode('NWRhNjVzZDE2YTVzZHNkYQ==');
// Random Hash 32 Character
const hash = Base64Encode(RandomBytes(32)).substr(0, 32);

const Encrypt = (data) => {
    const iv = Base64Encode(RandomBytes(16)).substr(0, 16);
    const encrypted = AES128_Encrypt(data, secret, iv);
    return Base64Encode(Base64Encode(iv) + hash + encrypted);
};


const Decrypt = (hash) => {
    const final = Base64Decode(hash);
    const iv2Base64 = final.substr(0, 24);
    const iv2 = Base64Decode(iv2Base64);
    final.substr(24, 32);
    const hashBase64 = final.substr(56);
    return AES128_Decrypt(hashBase64, secret, iv2);
};

const EncryptResponse = (data) => {
    return {
        data: Encrypt(JSON.stringify(data)),
        result: data
    };
};

exports.Encrypt = Encrypt;
exports.Decrypt = Decrypt;
exports.EncryptResponse = EncryptResponse;
