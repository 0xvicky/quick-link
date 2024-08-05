import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/utils/config/dbConfig";
import Url from "@/models/linkSchema";
import {sha256} from "js-sha256";
import {getToken} from "next-auth/jwt";
import User from "@/models/userSchema";
import {userUrl} from "@/types";

export const POST = async (req: NextRequest, res: NextResponse) => {
  //fetch urlInfo from client side
  const {longUrl, siteName} = await req.json();
  const origin = req.nextUrl.origin;

  const jwtToken = await getToken({req});
  //connect DB
  await connectDB();

  //fetch userData from jwt token
  const user = await User.findOne({_id: jwtToken});
  console.log(user);

  //fetching urlInfo if exist
  const urlInfo = await Url.findOne({longUrl});

  //initialising newUrl and update its value dynamically according to the if-else
  let newUrl;

  if (urlInfo) {
    //if urlInfo exist then see if same user try to shorten again then throw error, if url already shortened but it is different user then set the newUrl value from urlInfo and push into the user's url array
    console.log("url info exist bro");

    const urlExist = user?.urls.some(
      (url: userUrl) => url.objectId.toString() === urlInfo._id.toString()
    );
    if (urlExist) {
      return NextResponse.json({msg: "You already shortened this link"}, {status: 400});
    }

    newUrl = urlInfo; //newUrl value set from urlInfo
  } else {
    //if longUrl never gets shortened then we'll hash and store in DB.
    //hash the longUrl using nanoid to generate the shorter text
    const hash = sha256(longUrl)
      .slice(0, 4)
      .concat(sha256(longUrl).slice(12, 17))
      .concat(sha256(longUrl).slice(-2));

    //create a new Url object
    newUrl = new Url({
      longUrl,
      hash,
      shortUrl: `${origin}/${hash}`
    });
    // console.log(newUrl);

    //store the url object in db
    await newUrl.save();
  }

  //push the object id into the user DB
  user.urls = [
    ...user.urls,
    {objectId: newUrl._id, createdAt: new Date(), siteName: siteName}
  ];
  await user.save();
  //return the data with 201 res

  // console.log(user);

  return NextResponse.json({url: newUrl}, {status: 201});
};
