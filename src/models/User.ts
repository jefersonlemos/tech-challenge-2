import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
    const user = this as IUser;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
