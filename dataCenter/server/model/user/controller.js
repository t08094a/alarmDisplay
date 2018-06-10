const Controller = require('../../lib/controller');
const accountFacade = require('./facade');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


class UserController extends Controller {



  constructor() {
    super(accountFacade);

    passport.use(new LocalStrategy(
      function(username, password, done) {
        findOne({username: username}, function(err, user) {
          if(err) { return done(err); }
          if(!user) { return done(null, false); }
          if(!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        })
      }
    ));
    // passport.serializeUser(accountFacade.serializeUser());
    // passport.deserializeUser(accountFacade.deserializeUser());
  }

  // Returns Session if Logged-in
  getSession(req, res, next) {
    res.json(req.user);
  }

  // Logout
  logout(req, res, next) {
    req.logout();
    res.redirect('/login');
  }

  // local

  authenticateLocal(req, res, next) {
    passport.authenticate('local')(req, res, next);
  }

  authorizeLocal(req, res, next) {
    passport.authorize('local')(req, res, next);
  }

  callbackAuthLocal(req, res, next) {
    passport.authenticate('local', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzLocal(req, res, next) {
    passport.authorize('local', function(err, data) {
      if (err)
        return next(err);
      res.redirect('/profile')
    })(req, res, next);
  }
}

module.exports = new UserController(accountFacade);
