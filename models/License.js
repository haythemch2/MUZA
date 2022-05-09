const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const licenseSchema = new mongoose.Schema(
  {
    user: {
      // used to notify when expired
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client' //relation betwen the order and the user
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Coupon' //relation betwen the order and the user
    },
    startsAt: {
      type: Date,
      required: true
    },
    endsAt: {
      type: Date,
      required: true
    },
    discount: {
      // 0.0 ... 1.0
      type: Number,
      required: true
    },
    plan: {
      type: String,
      enum: ['1month', '1year'],
      default: '1month'
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('License', licenseSchema);
