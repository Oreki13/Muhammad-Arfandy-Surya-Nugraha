const crypto = require("crypto");

module.exports = {
  generateSalt: length => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  },

  setPassword: (password, salt) => {
    let hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    let value = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: value
    };
  },
  response: (res, status, result, error, token) => {
    const resultPrint = {};

    resultPrint.error = error || null;
    resultPrint.status_code = status || 200;
    resultPrint.result = result;
    resultPrint.token = token;
    // console.log(resultPrint);

    return res.status(resultPrint.status_code).json(resultPrint);
  }
};
