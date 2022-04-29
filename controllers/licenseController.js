const methods = require('./crudController');
const mongoose = require('mongoose');

const License = mongoose.model('License');
const Client = mongoose.model('Client');

const controller = methods.crudController('License');

controller.list = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;
  try {
    //  Query the database for a list of all results
    const resultsPromise = License.find()
      .skip(skip)
      .limit(limit)
      .sort({ created: 'desc' })
      .populate('user')
      .lean();

    const usersPromise = await Client.find().sort({ created: 'desc' }).lean();

    // Counting the total documents
    const countPromise = License.count();
    // Resolving both promises
    let [result, count, users] = await Promise.all([
      resultsPromise,
      countPromise,
      usersPromise
    ]);
    // Calculating total pages
    const pages = Math.ceil(count / limit);
    // Getting Pagination Object
    const pagination = { page, pages, count };
    let trimString = function (string, length) {
      return string.length > length
        ? string.substring(0, length) + '...'
        : string;
    };
    result = result.map((e) => ({
      ...e,
      user: e?.user?.name || 'UNKNOWN',
      users: [
        ...users.map((user) => ({
          _id: user._id,
          name: user?.name || 'UNKOWN'
        }))
      ]
    }));
    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: 'Successfully found all documents'
      });
    } else {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: 'Collection is Empty'
      });
    }
  } catch {
    return res
      .status(500)
      .json({ success: false, result: [], message: 'Oops there is an Error' });
  }
};

module.exports = controller;
