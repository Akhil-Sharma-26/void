import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // awiat is important
    const { email, password } = reqBody;
    console.log(reqBody);
    // check if user already exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    //create token data:
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }; // a lot more than this data can be sent through the token
    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    }); //signed token
    const response = NextResponse.json({
      message: "Login Succefully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  

    } 
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
