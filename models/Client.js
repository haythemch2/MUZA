const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

const clientSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user'
  },
  company: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  bankAccount: {
    type: String,
    trim: true
  },
  companyRegNumber: {
    type: String,
    trim: true
  },
  companyTaxNumber: {
    type: String,
    trim: true
  },
  companyTaxID: {
    type: String,
    trim: true
  },
  customField: [
    {
      fieldName: {
        type: String,
        trim: true
      },
      fieldValue: {
        type: String,
        trim: true
      }
    }
  ],
  address: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    required: false,
    default: '+33-000'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    default: 'N/A'
  },
  twitter: {
    type: String,
    default: 'N/A'
  },
  instagram: {
    type: String,
    default: 'N/A'
  },
  description: {
    type: String,
    default: 'N/A'
  },
  website: {
    type: String,
    trim: true
  },
  lat: {
    type: String,
    default: '48.856614'
  },
  lon: {
    type: String,
    default: '2.3522219'
  },
  url: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&usqp=CAU'
  },
  followers: [{ type: ObjectId, ref: 'Client' }],
  following: [{ type: ObjectId, ref: 'Client' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);