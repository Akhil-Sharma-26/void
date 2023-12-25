import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST (request: NextRequest){
    const reqBody=await request.json();
    const {email,emailType,userID}=reqBody;
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
    console.log(process.env.MAIL, process.env.PASS)
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "akhil26sharma04@gmail.com",
          pass: process.env.PASS
        }
      });
      console.log(email);
      console.log(emailType);
      console.log(userID);
      const mailOption={
        from: "akhil26sharma04@gmail.com",
        to:email,
        subject: emailType ==="VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType ==="VERIFY" ? "Verify your email" : "Reset your password"} <br/> Or copy and paste the following link into your browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
        //TODO:
        // Edit the env variable before deployment.
        
      }
      const mailresponse =await transport.sendMail(mailOption);
      return NextResponse.json({
        message: `Email sent to ${email}`,
        success: true,
        });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    // throw new Error(error.message);
  }
};
