import {Schema, models, model} from "mongoose";
import Url from "./linkSchema";
const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username required"]
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: [true, "Password already exist"]
  },
  image: {
    type: String
  },
  urls: [
    {
      objectId: {
        type: Schema.Types.ObjectId,
        ref: "Link"
      },
      createdAt: {
        type: Date,
        default: new Date()
      },
      siteName: {
        type: String
      }
    }
  ]
});

const user = models.User || model("User", UserSchema);

export default user;
