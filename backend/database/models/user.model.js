const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = schema({
  email: {

    type: String,
    minlength: [8, "email trop court"]
    // required: [true, "Champ requis"],
  },
  password: { type: String, required: true },
});

// userSchema.statics.hashPassword = async (password) => {
//   try {
//     const salt = await bcrypt.genSalt(10); /*le 10 en cas de hack y vas le dcrypter le password*/
//     return bcrypt.hash(password, salt); /*salt le password cest aura 2 idem*/
//   } catch (e) {
//     throw e;
//   }
// };

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.local.password);
// };



module.exports = mongoose.model("user", userSchema);