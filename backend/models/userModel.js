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

//middleware is applied here; password is encrypted before saving
userSchema.pre('save', async function (next){

    //checking if the password field is sent or modified to perform latter code
    //new salt/ecrytpion shouldn't be created if the profile is updated
    if(!this.isModified('password')){
        //if not modifiec, next is called and  the app moves on
        next();
    }
    //salt needed to hash the password aynchronously
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model('User', userSchema);

export default user;