import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/utils/config/dbConfig";
import Url from "@/models/linkSchema";
import {sha256} from "js-sha256";

export const POST = async (req: NextRequest, res: NextResponse) => {
  //fetch urlInfo from client side
  const {longUrl, siteName} = await req.json();
  const origin = req.nextUrl.origin;
  console.log(origin);
  //connect DB
  await connectDB();

  //check if longUrl already exist, if yes then throw error of uniqueness
  const isLongUrlExist = await Url.findOne({longUrl});
  if (isLongUrlExist) {
    return NextResponse.json(
      {msg: "Short url already exists for this URL"},
      {status: 400}
    );
  }

  //check if siteName already exists, if yes same case
  const isSiteName = await Url.findOne({siteName});
  if (isSiteName) {
    return NextResponse.json(
      {msg: "Site name already exists for this URL"},
      {status: 400}
    );
  }

  //hash the longUrl using nanoid to generate the shorter text
  const hash = sha256(longUrl)
    .slice(0, 4)
    .concat(sha256(longUrl).slice(12, 17))
    .concat(sha256(longUrl).slice(-2));

  //create a new Url object
  const newUrl = new Url({
    longUrl,
    shortUrl: hash,
    siteName
  });

  //store the url object in db
  await newUrl.save();

  //return the data with 201 res

  return NextResponse.json(
    {msg: "URL generated ✅", url: `${origin}/${hash}`},
    {status: 201}
  );
};
