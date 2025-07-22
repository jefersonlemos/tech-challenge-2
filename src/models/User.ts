import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: "student" | "teacher";
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  id: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
});

UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) { return next(); }
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  }
  catch (error) {
    next(error as Error);
  }
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
