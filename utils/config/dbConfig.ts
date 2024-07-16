import mongoose from "mongoose";

let isConnected = false; //track if db is connected or not

export const connectDB = async () => {
  if (isConnected) {
    console.log("DB already connected !!🟩");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.on("connected", () => {
      console.log("DB Connected successfully✅✅");
    });
    mongoose.connection.on("error", error => {
      console.log(`Error occured while connecting to DB:${error}❌`);
    });
  } catch (error: any) {
    console.log(`Error occured in connection:${error}☠️`);
  }
};
