

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const SALT_ROUNDS = 10;
const ALLOWED_ROLES = ['user', 'business_owner'];

const AuthService = {
  register: async ({ name, email, password, role }) => {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      const error = new Error('Email is already registered.');
      error.status = 409;
      throw error;
    }

    const userRole = ALLOWED_ROLES.includes(role) ? role : 'user';

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ name, email, hashedPassword, role: userRole });

    const token = AuthService._generateToken(user);
    return { token, user };
  },

  login: async ({ email, password }) => {

    const user = await UserModel.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password.');
      error.status = 401;
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      error.status = 401;
      throw error;
    }
    const token = AuthService._generateToken(user);
    const { password: _pw, ...safeUser } = user;
    return { token, user: safeUser };
  },

  getMe: async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.status = 404;
      throw error;
    }
    return user;
  },
  _generateToken: (user) => {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

};

module.exports = AuthService;
