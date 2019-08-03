const { Inject, Service } = require('typedi');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { randomBytes } = require('crypto');

const { decorate, metadata, param } = require('./../core');
const config = require('../config');

class AuthService {
  constructor(userModel, logger) {
    this.userModel = userModel;
    this.logger = logger;
  }

  async SignUp(userInputDTO) {
    try {
      const salt = randomBytes(32);

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, {
        salt,
      });
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome email');

      const user = userRecord.toObject();

      return {
        user,
        token,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async SignIn(email, password) {
    const userRecord = await this.userModel.findOne({
      email,
    });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      const user = userRecord.toObject();
      return {
        user,
        token,
      };
    }
    throw new Error('Invalid Password');
  }

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}

module.exports = decorate(
  [
    Service(),
    param(0, Inject('userModel')),
    param(1, Inject('logger')),
    metadata('design:paramtypes', [Object, Object]),
  ],
  AuthService,
);
