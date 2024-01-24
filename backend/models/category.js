import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  label:{type:String,required:true,unique:true},
  value:{type:String,required:true,unique:true}
});

// categorySchema.virtual("id").get(function () {
//   return this._id;
// });
// categorySchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//   },
// });
const Category=mongoose.model("Category", categorySchema);
export default Category
