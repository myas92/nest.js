let {createCipheriv, createDecipheriv} = require("crypto");


const AES128_Encrypt = (data, secret, iv) => {

    const cipher = createCipheriv("AES-128-CBC", secret, iv);
    return (
        cipher.update(data, "utf8", "base64") +
        cipher.final("base64")
    );
};



const AES128_Decrypt = (hash, secret, iv) => {
    const decipher = createDecipheriv("AES-128-CBC", secret, iv);
    return (
        decipher.update(hash, "base64", "utf8") +
        decipher.final("utf8")
    );
};

exports.AES128_Encrypt = AES128_Encrypt;
exports.AES128_Decrypt = AES128_Decrypt;

