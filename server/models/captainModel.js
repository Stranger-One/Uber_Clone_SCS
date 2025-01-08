import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        type:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },

    },
    location: {
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
})

captainSchema.method('generateAuthToken', function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
});

captainSchema.method('comparePassword', async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
});

captainSchema.static('hashPassword', async function (password) {
    return await bcrypt.hash(password, 10);
});

const Captain = mongoose.model('Captain', captainSchema);
export default Captain;
