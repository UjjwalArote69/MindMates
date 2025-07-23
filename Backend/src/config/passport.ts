// backend/config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../models/user.model"; // Adjust the import based on your project structure

console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_SECRET_KEY);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let existingUser = await UserModel.findOne({ googleId: profile.id });

        if (!existingUser) {
          // If not, create a new user
          existingUser = await UserModel.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value || "",
            avatar: profile.photos?.[0].value || "",
          });
        }

        return done(null, existingUser);
      } catch (error) {
        return done(error as any);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id); // ✅ store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id); // ✅ get full user
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
