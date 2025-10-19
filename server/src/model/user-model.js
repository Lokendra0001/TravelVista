const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/736x/93/e8/d0/93e8d0313894ff752ef1c6970116bad6.jpg"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    const hashedPwd = await bcrypt.hash(this.password, 10);
    this.password = hashedPwd;
    next();
});

userSchema.methods.verifyPwd = async function (userPwd) {
    return await bcrypt.compare(userPwd, this.password);
}

const userModel = model("user", userSchema);

module.exports = userModel;