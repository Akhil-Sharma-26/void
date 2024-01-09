import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
export const getDatafromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedtoken:any=jwt.verify(token,process.env.TOKEN_SECRET!); // any is not good here, but you can use it at development stage
        return decodedtoken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}