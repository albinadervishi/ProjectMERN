const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3, "Emri duhet te jete me i gjate se 3 "],
      required: [true, "This field is required"],
    },
    lastName: {
      type: String,
      required: [true, "This field is required"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    img: { type: String },
    phoneNumber: {
      type: Number,
      required: [true, "This field is required"],
    },
    address: {
      type: String,
      required: [true, "This field is required"],
    },
    admin: {
      type: Boolean,
      default: 'false'
  },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    console.log(this.password)
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
