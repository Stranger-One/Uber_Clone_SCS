import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [6, "Email must be at least 6 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.method('generateAuthToken', function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
});

userSchema.method('comparePassword', async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
});

userSchema.static('hashPassword', async function (password) {
    return await bcrypt.hash(password, 10);
});

const User = mongoose.model('User', userSchema);
export default User;