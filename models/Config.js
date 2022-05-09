const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const configSchema = new mongoose.Schema(
  {
    "1month": {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    "1year": {
      type: mongoose.Schema.Types.Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('Config', configSchema, "config");
