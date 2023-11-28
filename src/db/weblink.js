const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const weblinkSchema = new Schema({
url: { type: String, required: true },
depth: { type: Number },
keywords: [String]
});
// export
module.exports = mongoose.model('Weblink', weblinkSchema);