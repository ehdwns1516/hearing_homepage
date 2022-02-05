const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailPageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  imageURLs: { type: Array, required: true },
});

detailPageSchema.statics.create = function (payload) {
  const detailPage = new this(payload);
  return detailPage.save();
};

detailPageSchema.statics.findAll = function () {
  return this.find({});
};

detailPageSchema.statics.findOneByPageName = function (name) {
  return this.findOne({ name });
};

detailPageSchema.statics.findOneByPageName = function (name) {
  return this.findOne({ name });
};

detailPageSchema.statics.updateByPageName = function (name, payload) {
  return this.findOneAndUpdate({ name }, payload, { new: true });
};

detailPageSchema.statics.deleteByPageName = function (name) {
  return this.deleteOne({ name });
};

module.exports = mongoose.model('DetailPage', detailPageSchema);
