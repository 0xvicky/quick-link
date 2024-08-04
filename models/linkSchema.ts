import {Schema, models, model} from "mongoose";
import User from "./userSchema";

const LinkSchema = new Schema({
  longUrl: {
    type: String,
    unique: [true, "Short Link already generated"],
    required: [true, "Long Link Required"]
  },
  hash: {
    type: String
  },
  shortUrl: {
    type: String
  }
});

const url = models.Link || model("Link", LinkSchema);

export default url;
