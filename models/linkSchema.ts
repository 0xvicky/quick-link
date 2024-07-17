import {Schema, models, model} from "mongoose";

const LinkSchema = new Schema({
  longUrl: {
    type: String,
    unique: [true, "Short Link already generated"],
    required: [true, "Long Link Required"]
  },
  shortUrl: {
    type: String
  },
  siteName: {
    type: String,
    required: [true, "Site Name Required"],
    unique: [true, "Site Name already generated"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const url = models.Link || model("Link", LinkSchema);

export default url;
