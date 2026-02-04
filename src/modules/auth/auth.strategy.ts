import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { authService } from "./auth.service";

const cookieExtractor = (req: Request): string | null => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["accessToken"];
  }

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  return token;
};

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username: string, password: string, done) => {
      try {
        const user = await authService.validateUser(username, password);

        if (!user) {
          return done(null, false, { message: "Invalid auth data" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    },
    async (payload: JwtPayload, done) => {
      try {
        const user = await authService.getUserById(payload.userId);

        if (!user) {
          return done(null, false);
        }

        if (payload.tokenVersion !== user.tokenVersion) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const passportLib = passport;

export { passportLib };
