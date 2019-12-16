const userModels = require("../Models/users");
const jwt = require("jsonwebtoken");
const MiscHelper = require("../Helpers/helpers");
const helper = require("../Helpers/formResponse");

module.exports = {
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userModels
      .getByEmail(email)
      .then(result => {
        const dataUser = result[0];

        if (dataUser !== undefined) {
          const usePassword = MiscHelper.setPassword(password, dataUser.salt)
            .passwordHash;

          if (dataUser.password === usePassword) {
            const token = jwt.sign(
              {
                userid: dataUser.userId
              },
              process.env.SECRET_KEY,
              { expiresIn: "10m" }
            );

            delete dataUser.salt;
            delete dataUser.password;
            // delete dataUser.token

            return MiscHelper.response(res, 200, dataUser, null, token);
          } else {
            return MiscHelper.response(res, 200, null, "Wrong password!");
          }
        } else {
          return MiscHelper.response(res, 200, null, "Wrong password!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18);
    const passwordHash = MiscHelper.setPassword(req.body.password, salt);
    const mail = req.body.email;
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      role: req.body.role,
      token: "slur"
    };
    userModels
      .register(data)
      .then(resultRegister => {
        userModels.getByEmail(mail).then(result => {
          const dataUser = result[0];
          const token = jwt.sign(
            {
              userid: dataUser.userId
            },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
          );
          delete dataUser.password;
          delete dataUser.salt;

          MiscHelper.response(res, 200, dataUser, null, token);
        });
      })
      .catch(error => {
        console.log(error);
        helper.sql(res, error);
      });
  },
  verify: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (decode !== undefined) {
        const id = decode.userid;
        userModels
          .getById(id)
          .then(result => {
            MiscHelper.response(res, 200, result);
          })
          .catch(err => console.log(err));
        console.log(decode);
      } else {
        MiscHelper.response(res, 200, err.message, err.message);
        console.log(err.message);
      }
    });
  },
  getAllUser: (req, res) => {
    userModels
      .getAllUser()
      .then(result => {
        MiscHelper.response(res, 200, result);
      })
      .catch(err => console.log(err));
  },
  addUser: (req, res) => {
    const salt = MiscHelper.generateSalt(18);
    const passwordHash = MiscHelper.setPassword(req.body.password, salt);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      role: req.body.role
    };
    userModels
      .register(data)
      .then(() => {
        MiscHelper.response(res, 204);
      })
      .catch(error => {
        console.log(error);
        helper.sql(res, error);
      });
  },
  updateUser: (req, res) => {
    const body = {
      id: req.params.id,
      data: req.body
    };
    userModels
      .updateUser(body)
      .then(() => {
        MiscHelper.response(res, 204);
      })
      .catch(err => console.log(err));
  },
  deleteUser: (req, res) => {
    const id = req.params.id;

    userModels
      .deleteUser(id)
      .then(() => {
        const result = {msg:'delete success'}
        MiscHelper.response(res, 204, result)
      })
      .catch(err => console.log(err));
  }
};
