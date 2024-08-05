import {connectDB} from "@/utils/config/dbConfig";
import User from "@/models/userSchema";
import {hash} from "bcrypt";
import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const {username, email, password, confirmPassword, image} = await req.json();
  await connectDB();
  // console.log("bakcend");
  console.log(req.headers);

  try {
    //checks if user exist or not
    const isUser = await User.findOne({email});
    if (isUser) {
      // console.log("User already exists");
      return NextResponse.json({msg: "User already exists"}, {status: 404});
    }
    //checks if password and confirmPassword is same or not

    if (password !== confirmPassword) {
      // console.log("Password didn't match");
      return NextResponse.json({msg: "Wrong Password"}, {status: 400});
    }
    //hash the password
    const encPass = await hash(password, 10);
    //create a user instance in DB
    const newUser = new User({
      username,
      email,
      password: encPass,
      image,
      urls: []
    });

    //save the user
    await newUser.save();
    // console.log(newUser);
    newUser.password = undefined;
    //send the user information to client
    return NextResponse.json({msg: "User saved"}, {status: 201});
  } catch (error) {
    return NextResponse.json({msg: `Error occured while signUp:${error}`}, {status: 500});
  }
};
