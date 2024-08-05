import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/utils/config/dbConfig";
import User from "@/models/userSchema";
import Url from "@/models/linkSchema";
import {getToken} from "next-auth/jwt";
import {userUrl} from "@/types";
export const POST = async (req: NextRequest, res: NextResponse) => {
  const jwtToken = await getToken({req});

  //connect DB
  await connectDB();

  const urlObjects = (await User.findOne({_id: jwtToken}))?.urls || [];
  //   console.log(urlIds);

  // Fetch URLs associated with the URL IDs
  const urlPromises = urlObjects.map(async (item: userUrl) => {
    const urlRes = await Url.findOne({_id: item.objectId});
    // console.log("=====");
    // console.log(urlRes);/

    return {
      url: urlRes,
      createdAt: item.createdAt,
      siteName: item.siteName
    };
  });
  const urls = await Promise.all(urlPromises);
  return NextResponse.json({urls}, {status: 200});
};
