const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
});

adminSchema.statics.create = function (payload) {
  const address = new this(payload);
  return address.save();
};

adminSchema.statics.findAll = function () {
  return this.find({});
};

adminSchema.statics.findOneByAdminID = function (id) {
  return this.findOne({ id });
};

adminSchema.statics.updateByAdminID = function (id, payload) {
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

adminSchema.statics.deleteByAdminID = function (id) {
  return this.deleteOne({ id });
};

module.exports = mongoose.model('Admin', adminSchema);
