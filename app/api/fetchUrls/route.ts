import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/utils/config/dbConfig";
import User from "@/models/userSchema";
import Url from "@/models/linkSchema";
import {getToken} from "next-auth/jwt";
export const POST = async (req: NextRequest, res: NextResponse) => {
  const jwtToken = await getToken({req});

  //connect DB
  await connectDB();

  const urlIds = (await User.findOne({_id: jwtToken}))?.urls || [];
  //   console.log(urlIds);

  // Fetch URLs associated with the URL IDs
  const urlPromises = urlIds.map(async (id: any) => Url.findOne({_id: id}));
  const urls = await Promise.all(urlPromises);
  return NextResponse.json({urls}, {status: 200});
};
