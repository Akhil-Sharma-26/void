import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    // hashing the token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10); // 10 round of hashing. tostring() ,is a function, for changing the userID to string

    // await User.findByIdAndUpdate(userID,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}) // in miliseconds
    if (emailType === "VERIFY") {
      // you can also use enum
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } 
    else if (emailType === "RESET") { // for FORGOT PASSWORD
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASS
        }
      });

      const mailOption={
        from: "a.sharma1.be26@gmail.com",
        to:email,
        subject: emailType ==="VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType ==="VERIFY" ? "Verify your email" : "Reset your password"} <br/> Or copy and paste the following link into your browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
        //TODO:
        // Edit the env variable before deployment.
        
      }
      const mailresponse =await transport.sendMail(mailOption);
      return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
