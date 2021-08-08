const Base64Encode = (data) => {
    return Buffer.from(data).toString('base64');
};

const Base64Decode = (hash) => {
    return Buffer.from(hash, 'base64').toString('ascii');
};

exports.Base64Encode = Base64Encode;
exports.Base64Decode = Base64Decode