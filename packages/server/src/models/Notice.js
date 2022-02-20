const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
  type: { type: String, required: true, unique: true },
  infos: { type: Array, required: true },
});

noticeSchema.statics.create = function (payload) {
  const notice = new this(payload);
  return notice.save();
};

noticeSchema.statics.findAll = function () {
  return this.find({});
};

noticeSchema.statics.findOneByType = function (type) {
  return this.findOne({ type });
};

noticeSchema.statics.updateByType = function (type, payload) {
  return this.findOneAndUpdate({ type }, payload, { new: true });
};

noticeSchema.statics.deleteByType = function (type) {
  return this.deleteOne({ type });
};

module.exports = mongoose.model('Notice', noticeSchema);
