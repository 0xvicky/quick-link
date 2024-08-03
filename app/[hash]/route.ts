import {NextResponse, NextRequest} from "next/server";
import {connectDB} from "@/utils/config/dbConfig";
import Url from "@/models/linkSchema";

// Route handler
export async function GET(req: Request, {params}: {params: {hash: string}}) {
  console.log(params);
  const {hash} = params; // Extract the dynamic parameter
  // console.log(req);
  // console.log(params);
  // console.log(hash);
  await connectDB();

  try {
    // Find if shortUrl, exists or not, if not then throw an error
    const urlInfo = await Url.findOne({hash: hash});
    // Perform the redirection or return the long URL
    console.log(urlInfo);
    if (!urlInfo) {
      return NextResponse.json({msg: "Short Url not found"}, {status: 404});
    }
    return NextResponse.redirect(urlInfo.longUrl, 302);
  } catch (error) {
    return NextResponse.json({message: `Error: `}, {status: 500});
  }
}
