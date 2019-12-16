const db = require("../Config/dbConnect");
const jwt = require("jsonwebtoken");

module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.sqlMessage);
        }
      });
    });
  },
  getByEmail: email => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, password, salt, date, role FROM user WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getById: id => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, date, role FROM user WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateUser: body => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET ? WHERE user.id = ?",
        [body.data, body.id],
        (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, role FROM user",
        (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  deleteUser: id => {
    return new Promise((resolve, reject) => {
      db.query("DELETE from user WHERE id = ?", [id], (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  }
};
