const { Container } = require('typedi');
const AuthService = require('../../services/auth');

class AuthController {
  static async signUp(req, res, next) {
    const logger = Container.get('logger');
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const authServiceInstance = Container.get(AuthService);
      const { user, token } = await authServiceInstance.SignUp(req.body);
      return res.status(201).json({
        user,
        token,
      });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  static async signIn(req, res, next) {
    const logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const { email, password } = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user, token } = await authServiceInstance.SignIn(email, password);
      return res
        .json({
          user,
          token,
        })
        .status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = AuthController;
