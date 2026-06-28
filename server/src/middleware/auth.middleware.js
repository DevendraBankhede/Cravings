export const AuthProtect = async (req, res, next) => {
  try {
    //Controller Logic

    next();
  } catch (error) {
    console.log(error.message);
    const err = new Error("Unknown Error At Middleware");
    error.statusCode = 500;
    next(err);
  }
};