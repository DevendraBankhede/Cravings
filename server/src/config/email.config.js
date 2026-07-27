import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    //   console.log("Started Sending Email");

    //    console.log(process.env.GMAIL_USERNAME);

    //    console.log(process.env.GMAIL_PASSCODE);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    //   console.log("3....2....1....");

    const mailOption = {
      from: process.env.GMAIL_USERNAME,
      to,
      subject,
      html: message,
    };

    //   console.log("Sending Email");

    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendEmail;

// sendEmail(
//   "receiversemail@gmail.com",
//   "test Email",
//   `<h1 style='color:blue;'>Test Message</h1>
//   <p style='color:red;'>Batch 6</p>`,
// );