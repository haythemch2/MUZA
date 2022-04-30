const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const couponSchema = new mongoose.Schema(
  {
    discount: {
      // 0.0 ... 1.0
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0.0 && v <= 1.0;
        },
        message: 'discount should be between 0.0 and 1.0.'
      }
    },
    expiresAt: {
      type: Date,
      required: true
    },
    usedIn: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'License' //relation betwen the order and the user
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('Coupon', couponSchema);
