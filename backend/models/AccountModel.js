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
        }
    }]
});




Account.pre("save", function (next) {
    const account = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(12, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(account.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    account.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})


export default mongoose.model('Account', Account);
