import axios from "axios";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
connect();
export async function POST(request: NextRequest) {
    const reqBody=await request.json();
    const {token}=reqBody;
    console.log(token);
    const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}
    })
    if(!user){
        return NextResponse.json({
            error:"Invalid token,user not found",
            success:false,
        },{status:400});
    }
    return NextResponse.json({
        success:true,
    });
    // console.log(user);
}