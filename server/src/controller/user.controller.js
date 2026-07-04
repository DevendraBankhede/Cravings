import User from "../models/user.model.js";

export const EditUserProfile = async (req, res, next) => {
  try {
    const { email, fullName, phone } = req.body;

    if (!email || !fullName || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "User Updated Sucessfully", data: existingUser });
  } catch (error) {
    console.log(error.message);
    next();
  }
};