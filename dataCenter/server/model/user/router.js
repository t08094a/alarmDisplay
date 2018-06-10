const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

router.get('/register', function(req, res) {
    res.render('register', { });
});
router.post('/register', function(req, res) {
  controller.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      });
  });
});

router.route('/auth/session')
  .get(isLoggedIn, controller.getSession);
router.route('/auth/logout')
  .get(isLoggedIn, controller.logout);

// Local Routes
router.route('/auth/login')
  .get(controller.authenticateLocal);
router.route('/auth/callback')
  .get(controller.callbackAuthLocal);
router.route('/connect/login')
  .get(controller.authorizeLocal);
router.route('/connect/callback')
  .get(controller.callbackAuthzLocal);


module.exports = router;
