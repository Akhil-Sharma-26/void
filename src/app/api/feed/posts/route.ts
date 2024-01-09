import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
    try {
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}