const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { number } = req.body;
    const user = await User.findOne({ number });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { number, email } = req.body;
    const usernameCheck = await User.findOne({ number });
    if (usernameCheck)
      return res.json({ msg: "number already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      number,
      // password: hashedPassword,
    });
    // delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.sayHello = (req, res, next) => {
  console.log('Hello');
  next();
}
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "number",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};



module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
