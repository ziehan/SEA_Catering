import { Schema, Document, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phoneNumber?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, "Please provide your full name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;
