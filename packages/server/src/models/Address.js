const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema( // 스키마 생성
  {
    name: { type: String, required: true, unique: true },
    email: { type: String },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

addressSchema.statics.create = function (payload) {
  const address = new this(payload);
  return address.save();
};

addressSchema.statics.findAll = function () {
  return this.find({});
};

addressSchema.statics.findOneByAddrName = function (name) {
  return this.findOne({ name });
};

addressSchema.statics.updateByAddrName = function (name, payload) {
  return this.findOneAndUpdate({ name }, payload, { new: true });
};

addressSchema.statics.deleteByAddrName = function (name) {
  return this.remove({ name });
};

module.exports = mongoose.model('Address', addressSchema); // 모델 생성
