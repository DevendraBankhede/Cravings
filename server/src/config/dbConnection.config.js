// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_DB_URI);
//     console.log("Mongo DB connected Successfully");
//     console.log("DB Host :", conn.connection.host);
//     console.log("DB Name :", conn.connection.name);
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("ENV VALUE:", process.env.MONGO_DB_URL);

    const conn = await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("Mongo DB connected Successfully");
    console.log("DB Host :", conn.connection.host);
    console.log("DB Name :", conn.connection.name);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;