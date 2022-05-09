const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const AuthSessionSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Client'
    },
    eventType: {
      type: String,
      required: true,
      enum: ['login', 'logout'],
    }
  },
  {
    timestamps: true
  }
);
mongoose.model('AuthSession', AuthSessionSchema);
