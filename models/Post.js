const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "https://flyclipart.com/thumb2/music-logo-png-74180.png",
  },
  url: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "Client",
  },
});

mongoose.model("Post", postSchema);
