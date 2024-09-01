import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// export function POST(req:NextRequest, {params : {authRoutes}}: {params: {authRoutes : string[]}} ){
//     //arg.params.authRoutes when you do {params} you are destructuring
//     return NextResponse.json({
         
//     })
// }

const handler = NextAuth(NEXT_AUTH)
 
export const GET=handler;
export const POST = handler