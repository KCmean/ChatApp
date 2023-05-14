const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      res.json({ message: "Username already exists", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.json({ message: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({
      message: "User created successfully",
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.json({ message: "Incorrect username or passowrd", status: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Incorrect username or passowrd",
        status: false,
      });
    }
    delete user.password;

    return res.json({
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};
