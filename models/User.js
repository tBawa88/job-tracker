import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    location: {
        type: String,
        location: 'Earth'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String
})

//defining a custom method on model instances (documents), to obtain current document without the password property
userSchema.methods.toJSON = function () {
    const currentUser = this.toObject();
    delete currentUser.password;
    return currentUser;
}

export default mongoose.model('User', userSchema);