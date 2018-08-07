const passport = require('passport')
const {User,Admin} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)
passport.use(
   new LocalStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.jwtSecret
    },
    async function (jwtPayload, done) {
     try {
          const admin = await Admin.findOne({
            where: {
              id: jwtPayload.id
            }
          })
          if (!admin) {
            return done(new Error(), false)
          }
          return done(null, admin)
        } catch (err) {
          return done(new Error(), false)
        }
    }
));
module.exports = null
