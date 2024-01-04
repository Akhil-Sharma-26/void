import { getDatafromToken } from "@/helpers/getDatafromToken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";
// import { ErrorRounded } from "@mui/icons-material";
connect();
export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email);
    console.log(reqBody);
    try {
        let finduser = await User.findOne({ email: email }).select("-password");
        console.log(finduser);
            return NextResponse.json({
                message: "user Found",
                data: finduser,
            })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
        // console.log(error.message);
    }
}