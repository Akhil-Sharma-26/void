import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel"; 
connect();
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {token}=reqBody;
        console.log(token);
        const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"Invalid token,user not found"},{status:400});
        }

        console.log(user);
        console.log("hello email 1");
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        console.log("hello email");
        await user.save(); // await is very important
        return NextResponse.json({success:true,
        message:"Email Verified Successfulllly"});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}