const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  label:{type:String,required:true,unique:true},
  value:{type:String,required:true,unique:true}
});

// brandSchema.virtual("id").get(function () {
//   return this._id;
// });
// brandSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//   },
// });

exports.Brand = mongoose.model("Brand", brandSchema);
