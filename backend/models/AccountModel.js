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

Account.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            console.log(err);
            return cb(err);
        }
        cb(null, isMatch);
    });
}
    export default mongoose.model('Account', Account);
