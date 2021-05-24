import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.matchPasword = async function(enteredPassword){
    //encrypting user's password using bcrypt
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model('User', userSchema);

export default user;