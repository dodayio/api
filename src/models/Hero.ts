import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export type AuthToken = {
  accessToken: string,
  kind: string
};
export interface Hero {
  did: string;
  nickname?: string;
  displayName: string;
  google: string;
  tokens: string[];
}

/**
 * Password hash middleware.
 */
// userSchema.pre("save", function save(next) {
//   const user = this;
//   if (!user.isModified("password")) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
//       if (err) { return next(err); }
//       user.password = hash;
//       next();
//     });
//   });
// });

// const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
//     cb(err, isMatch);
//   });
// };

export default Hero;
