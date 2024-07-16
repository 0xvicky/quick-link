import {Schema, models, model} from "mongoose";

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
  }
});

const user = models.User || model("User", UserSchema);

export default user;
