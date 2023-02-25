import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Account = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    partners: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: true
        },
        image: {
            type: String,
            required: false
        }
    }]
});

export async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt)
}

Account.pre("save", function (next) {
    const account = this

    if (this.isModified("password") || this.isNew) {
        try {
            account.password = encryptPassword(account.password);
            return next()
        } catch (err) {
            return next(err)
        }
    } else {
        return next()
    }
})

Account.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model('Account', Account);
