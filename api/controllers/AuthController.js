const { User, Media } = require("../models");

const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const mediaService = require("../services/media.service");

const AuthController = () => {
  const register = async (req, res) => {
    const { email, password, name, username, phone } = req.body;

    try {
      const user = await User.create({
        email,
        password,
        name,
        username,
        phone,
      });
      const token = authService().issue({ id: user.id });

      return res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      console.log(err.fields);
      if (err.fields)
        return res.status(500).json({
          duplicate: Object.keys(err.fields)
            .map((key) => key.replace("users.", ""))
            .join(""),
        });
      else {
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    }
  };

  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await User.findOne({
          where: {
            username,
          },
        });

        if (!user) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          user.avatar = await mediaService().getMediaUrlById(user.avatar);
          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: "Unauthorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ msg: "Bad Request: Username and password don't match" });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, async (err, payload) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }
      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        return res.status(400).json({ msg: "Bad Request: User not found" });
      }
      user.avatar = await mediaService().getMediaUrlById(user.avatar);
      return res.status(200).json({ isvalid: true, user });
    });
  };

  return {
    register,
    login,
    validate,
  };
};

module.exports = AuthController;
