import sendEmail from "../config/email.config.js";

export const sendOTPEmail = async (email, newOTP) => {
  try {
    const subject = "Your OTP from Cravings";

    const message = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cravings - Password Reset OTP</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;padding:40px 15px;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:#ff6b35;padding:35px 25px;">

                            <img
                                src="https://res.cloudinary.com/dpl3xwf1z/image/upload/v1783776802/circleLogo_z7icie.png"
                                alt="Cravings Logo"
                                width="90"
                                style="display:block;border:0;outline:none;text-decoration:none;background:#ffffff;border-radius:50%;padding:8px;margin:0 auto 20px auto;"
                            />

                            <p style="margin:12px 0 0;color:#ffe9df;font-size:16px;line-height:24px;">
                                Delicious Food Delivered to Your Doorstep
                            </p>

                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px 35px;">

                            <h2 style="margin:0 0 20px;color:#222222;font-size:28px;">
                                Password Reset Request
                            </h2>

                            <p style="margin:0 0 18px;color:#555555;font-size:16px;line-height:28px;">
                                Hi,
                            </p>

                            <p style="margin:0 0 25px;color:#555555;font-size:16px;line-height:28px;">
                                We received a request to reset the password for your
                                <strong>Cravings</strong> account.
                                Use the One-Time Password (OTP) below to continue.
                            </p>

                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">

                                        <div style="display:inline-block;background:#fff4ef;border:2px dashed #ff6b35;border-radius:12px;padding:18px 35px;margin:10px 0 25px;">

                                            <span style="font-size:38px;font-weight:bold;color:#ff6b35;letter-spacing:12px;">
                                                ${newOTP}
                                            </span>
                                        </div> 
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 18px;color:#555555;font-size:16px;line-height:28px;">
                                This OTP is valid for
                                <strong>5 minutes</strong>.
                            </p>

                            <p style="margin:0 0 18px;color:#555555;font-size:16px;line-height:28px;">
                                Please do not share this code with anyone. Our team will
                                never ask for your OTP.
                            </p>

                            <p style="margin:0;color:#555555;font-size:16px;line-height:28px;">
                                If you did not request this password reset, you can safely
                                ignore this email. Your account remains secure.
                            </p>

                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding:0 35px;">
                            <hr style="border:none;border-top:1px solid #eeeeee;margin:0;">
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding:30px 35px;background:#fafafa;">

                            <img
                                src="https://res.cloudinary.com/dpl3xwf1z/image/upload/v1783776802/circleLogo_z7icie.png"
                                alt="Cravings Logo"
                                width="70"
                                style="display:block;border:0;outline:none;text-decoration:none;margin:0 auto 12px auto;"
                            />

                            <p style="margin:12px 0 0;color:#777777;font-size:14px;line-height:24px;">
                                Fresh Food • Fast Delivery • Great Taste
                            </p>

                            <p style="margin:20px 0 0;color:#999999;font-size:12px;line-height:20px;">
                                © 2026 Cravings. All Rights Reserved.
                                <br>
                                This is an automated email. Please do not reply.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `;

    await sendEmail(email, subject, message);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};