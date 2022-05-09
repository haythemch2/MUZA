const methods = require("./crudController");

const mongoose = require("mongoose");
const Post = mongoose.model("Post")
let controller = methods.crudController("Post");


controller.list = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = page * limit - limit;
    try {
        //  Query the database for a list of all results
        const resultsPromise = Post.find()
            .skip(skip)
            .limit(limit)
            .sort({ created: "desc" })
            .populate("postedBy")
            .lean();
        // Counting the total documents
        const countPromise = Post.count();
        // Resolving both promises
        let [result, count] = await Promise.all([resultsPromise, countPromise]);
        // Calculating total pages
        const pages = Math.ceil(count / limit);
        // Getting Pagination Object
        const pagination = { page, pages, count };
        let trimString = function (string, length) {
            return string.length > length ?
                string.substring(0, length) + '...' :
                string;
        }
        result = result.map(e => ({
            ...e,
            postedBy: e?.postedBy?.name || "UNKNOWN",
            body : trimString(e.body ,70 )
        }))
        if (count > 0) {
            return res.status(200).json({
                success: true,
                result,
                pagination,
                message: "Successfully found all documents",
            });
        } else {
            return res.status(203).json({
                success: false,
                result: [],
                pagination,
                message: "Collection is Empty",
            });
        }
    } catch {
        return res
            .status(500)
            .json({ success: false, result: [], message: "Oops there is an Error" });
    }
};

module.exports = controller;
