import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const UserData = [
  {
    fullName: "Manager1",
    email: "manager1@gmail.com",
    rawPassword: "Manager@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "restaurant",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=M1", publicId: null },
  },
  {
    fullName: "Manager2",
    email: "manager2@gmail.com",
    rawPassword: "Manager@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "restaurant",
    phone: "9876543211",
    photo: { url: "https://placehold.co/600x400?text=M2", publicId: null },
  },
  {
    fullName: "Manager3",
    email: "manager3@gmail.com",
    rawPassword: "Manager@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "restaurant",
    phone: "9876543212",
    photo: { url: "https://placehold.co/600x400?text=M3", publicId: null },
  },
  {
    fullName: "Customer1",
    email: "customer1@gmail.com",
    rawPassword: "Customer@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "customer",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=C1", publicId: null },
  },
  {
    fullName: "Customer2",
    email: "customer2@gmail.com",
    rawPassword: "Customer@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "customer",
    phone: "9876543213",
    photo: { url: "https://placehold.co/600x400?text=C2", publicId: null },
  },
  {
    fullName: "Customer3",
    email: "customer3@gmail.com",
    rawPassword: "Customer@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "customer",
    phone: "9876543214",
    photo: { url: "https://placehold.co/600x400?text=C3", publicId: null },
  },
  {
    fullName: "Rider1",
    email: "rider1@gmail.com",
    rawPassword: "Rider@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "rider",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=R1", publicId: null },
  },
  {
    fullName: "Rider2",
    email: "rider2@gmail.com",
    rawPassword: "Rider@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "rider",
    phone: "9876543215",
    photo: { url: "https://placehold.co/600x400?text=R2", publicId: null },
  },
  {
    fullName: "Rider3",
    email: "rider3@gmail.com",
    rawPassword: "Rider@123",
    dob: new Date("2000-01-01"),
    gender: "other",
    userType: "rider",
    phone: "9876543216",
    photo: { url: "https://placehold.co/600x400?text=R3", publicId: null },
  },
];

const userSeed = async () => {
  try {
    const preparedUserData = await Promise.all(
      UserData.map(async (user) => {
        const { rawPassword, ...userPayload } = user;

        return {
          ...userPayload,
          password: await bcrypt.hash(rawPassword, 10),
        };
      }),
    );

    for (const user of preparedUserData) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        console.log(`Existing ${user.userType} Found (${user.email})`);
        console.log(`Deleting Existing ${user.userType} (${user.email})`);
        await existingUser.deleteOne();
      }

      console.log(`Creating New ${user.userType} (${user.email})`);
      await User.create(user);
      console.log(`${user.userType} Created Successfully (${user.email})`);
    }
  } catch (error) {
    console.log("User Not Created");
    throw error;
  }
};

export default userSeed;