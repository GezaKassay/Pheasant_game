const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PheasantSchema = new Schema({
    word: {type: String, min: 3, max: 100, required: true }
});

// Virtual for bookinstance's URL
PheasantSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/${this._id}`;
  });

  // Export model
module.exports = mongoose.model("Pheasant", PheasantSchema);