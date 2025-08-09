import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../model/user.model";
import dotenv from "dotenv";
import { profile } from "console";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // console.log("GOOGLE PROFILE:", profile);

        const user = await User.findOne({ googleId: profile.id });
        let isNewUser = false;

        let finalUser = user;

        if (!user) {
          finalUser = await User.create({
            googleId: profile.id,
            name: `${profile.name?.givenName || ""} ${
              profile.name?.familyName || ""
            }`.trim(),
            email: profile.emails?.[0]?.value || "",
            photo: profile.photos?.[0]?.value || "",
          });
          isNewUser = true;
        }

        return done(null, { ...finalUser!.toObject(), isNewUser });
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);
