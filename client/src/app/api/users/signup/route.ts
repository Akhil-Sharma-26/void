import {connect} from '@/db/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody
        console.log(reqBody); 
        //check if user already exists
        const user =  await User.findOne({email})
        if(user){
            return NextResponse.json({error:'user already exists'},{status: 400})
            // console.log(error);
        }

        // hash password
        const salt=await bcryptjs.genSalt(10) // salt with 10 rounds
        const hashedPassword=await bcryptjs.hash(password, salt)

        const newUser= new User({
            username,
            email,
            passowrd: hashedPassword
        })
        const savedUser = await newUser.save() //To save the user
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfuly",
            success: true,
            savedUser,
        })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status: 500})
    }
}
