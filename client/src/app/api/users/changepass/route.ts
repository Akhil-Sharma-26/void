import axios from "axios";
import {connect} from "@/db/dbConfig";
import {NextRequest,NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request:NextRequest){
    const reqBody=await request.json();
    const {token,newpass}=reqBody;
    console.log(token);
    console.log(reqBody);
    try {
        let finduser=await User.findOne({_id:token}).select("-password");
        console.log(finduser);
        if(finduser){
            const hashedPassword=await bcryptjs.hash(newpass,12);
            finduser.password=hashedPassword;
            await finduser.save();
        }
        return NextResponse.json({
            message:"Password changed successfully",
            success:true,
        });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
        // console.log(error.message);
    }
}