import passport from "passport";
import request from "request";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import passportGoogle from "passport-google-oauth";
import { v1 as neo4j } from "neo4j-driver";
import _ from "lodash";
import cuid from "cuid";
import { singleNodeFromResponse } from "../util/graph";
import { createHero, findHero } from "../queries/heroes";

// import { User, UserType } from '../models/User';
import { Hero } from "../models/Hero";
import { Request, Response, NextFunction } from "express";
import { Driver } from "neo4j-driver/types/v1";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "doday")
);

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser<any, any>((hero, done) => {
  done(undefined, hero.did);
});

passport.deserializeUser((did, done) => {
  const session = driver.session();
  const tx = session.beginTransaction();
  console.log(did, "did");

  tx.run(
    `
      MATCH (h: Hero { did: $did })
      RETURN h
    `,
    { did }
  )
    .then(res => {
      const hero = singleNodeFromResponse(res);
      console.log(hero, "hero");
      done(undefined, hero);
    })
    .catch(e => done(e));
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  // User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
  //   if (err) { return done(err); }
  //   if (!user) {
  //     return done(undefined, false, { message: `Email ${email} not found.` });
  //   }
  //   user.comparePassword(password, (err: Error, isMatch: boolean) => {
  //     if (err) { return done(err); }
  //     if (isMatch) {
  //       return done(undefined, user);
  //     }
  //     return done(undefined, false, { message: "Invalid email or password." });
  //   });
  // });
}));


/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ["name", "email", "link", "locale", "timezone"],
  passReqToCallback: true
}, (req: any, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    // User.findOne({ facebook: profile.id }, (err, existingUser) => {
    //   if (err) { return done(err); }
    //   if (existingUser) {
    //     req.flash("errors", { msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account." });
    //     done(err);
    //   } else {
    //     User.findById(req.user.id, (err, user: any) => {
    //       if (err) { return done(err); }
    //       user.facebook = profile.id;
    //       user.tokens.push({ kind: "facebook", accessToken });
    //       user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
    //       user.profile.gender = user.profile.gender || profile._json.gender;
    //       user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
    //       user.save((err: Error) => {
    //         req.flash("info", { msg: "Facebook account has been linked." });
    //         done(err, user);
    //       });
    //     });
    //   }
    // });
  } else {
    // User.findOne({ facebook: profile.id }, (err, existingUser) => {
    //   if (err) { return done(err); }
    //   if (existingUser) {
    //     return done(undefined, existingUser);
    //   }
    //   User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
    //     if (err) { return done(err); }
    //     if (existingEmailUser) {
    //       req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
    //       done(err);
    //     } else {
    //       const user: any = new User();
    //       user.email = profile._json.email;
    //       user.facebook = profile.id;
    //       user.tokens.push({ kind: "facebook", accessToken });
    //       user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
    //       user.profile.gender = profile._json.gender;
    //       user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
    //       user.profile.location = (profile._json.location) ? profile._json.location.name : "";
    //       user.save((err: Error) => {
    //         done(err, user);
    //       });
    //     }
    //   });
    // });
  }
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    // User.findOne({ facebook: profile.id }, (err, existingUser) => {
    //   if (err) { return done(err); }
    //   if (existingUser) {
    //     req.flash("errors", { msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account." });
    //     done(err);
    //   } else {
    //     User.findById(req.user.id, (err, user: any) => {
    //       if (err) { return done(err); }
    //       user.facebook = profile.id;
    //       user.tokens.push({ kind: "facebook", accessToken });
    //       user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
    //       user.profile.gender = user.profile.gender || profile._json.gender;
    //       user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
    //       user.save((err: Error) => {
    //         req.flash("info", { msg: "Facebook account has been linked." });
    //         done(err, user);
    //       });
    //     });
    //   }
    // });
  } else {
    const session = driver.session();
    session.writeTransaction(tx => findHero(tx, { google: profile.id }))
      .then(res => {
        if (res.records.length) {
          // Hero with this google ID already exist => return this Hero
          return done(undefined, singleNodeFromResponse(res));
        } else {
          // Create new Hero node
          const hero: Hero = {
            did: cuid(),
            displayName: profile.displayName,
            tokens: [accessToken],
            google: profile.id
          };
          const resultPromise = session.writeTransaction(tx => createHero(tx, hero));

          resultPromise
            .then(res => {
              session.close();
              done(undefined, singleNodeFromResponse(res));
            })
            .catch(e => {
              done(e);
            });
        }
        // Run another query with the tx variable...
      })
      .catch(e => {
        console.error(e);
        session.close();
        done(e);
      });
    // User.findOne({ facebook: profile.id }, (err, existingUser) => {
    //   if (err) { return done(err); }
    //   if (existingUser) {
    //     return done(undefined, existingUser);
    //   }
    //   User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
    //     if (err) { return done(err); }
    //     if (existingEmailUser) {
    //       req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
    //       done(err);
    //     } else {
    //       const user: any = new User();
    //       user.email = profile._json.email;
    //       user.facebook = profile.id;
    //       user.tokens.push({ kind: "facebook", accessToken });
    //       user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
    //       user.profile.gender = profile._json.gender;
    //       user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
    //       user.profile.location = (profile._json.location) ? profile._json.location.name : "";
    //       user.save((err: Error) => {
    //         done(err, user);
    //       });
    //     }
    //   });
    // });
  }
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
