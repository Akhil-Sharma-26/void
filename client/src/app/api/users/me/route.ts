import { getDatafromToken } from "@/helpers/getDatafromToken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";
connect();
export async function GET(request: NextRequest){
    try {
        let userID=await getDatafromToken(request);
        let user=await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({
            message: "user Found",
            data: user,
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}