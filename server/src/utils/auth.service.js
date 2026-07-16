import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = { id: user._id };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log(token);
  } catch (error) {
    throw next(error);
  }
};

export const genOTPToken = async (user, res) => {
  try {
    const payload = { id: user._id };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    res.cookie("kitkat", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log(token);
  } catch (error) {
    throw next(error);
  }
};