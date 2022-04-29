const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.variables.env' });

const mongoose = require('mongoose');

const Admin = mongoose.model('Admin');

// for development & production don't use this file (you should remove it) , this is just demo login contoller
// use authController

exports.loginDemo = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    const admin = await Admin.findOne({ email: email });
    if (admin) {
      let valid = admin.validPassword(password);
      if (valid) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            id: admin._id
          },
          process.env.JWT_SECRET
        );
        res.json({
          success: true,
          result: {
            token,
            admin: admin
          },
          message: 'Successfully login admin'
        });
      } else {
        res
          .status(500)
          .json({ success: false, result: null, message: 'wrong password' });
      }
    } else {
      res
        .status(500)
        .json({ success: false, result: null, message: 'no admin found' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, result: null, message: err.message });
  }
};
