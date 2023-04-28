import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import config from '../config/config';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = config.token;

const options = {
  jwtFromRequest,
  secretOrKey
}

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    return done(null, jwtPayload);
  } catch (err) {
    return done(err);
  }
}));
