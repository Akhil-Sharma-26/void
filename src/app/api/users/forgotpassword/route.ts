import axios from "axios";
import {connect} from "@/db/dbConfig";
import {NextResponse,NextRequest} from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
connect();
export async function POST(request:NextRequest){
    const reqBody=await request.json();
    const {token,newpass}=reqBody;
    console.log(token);
    console.log(newpass);
    try {
        const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}
    })
    if(!user){
        return NextResponse.json({
            error:"Invalid token,user not found. Try again",
            success:false,
        },{status:400});
    }
    const hashedPassword=await bcryptjs.hash(newpass,12);
    user.password=hashedPassword;
    user.forgotPasswordToken=undefined;
    user.forgotPasswordTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({
        message:"Password changed successfully",
        success:true,
    });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}