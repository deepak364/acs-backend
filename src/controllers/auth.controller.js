
const AuthService = require('../services/auth.service');

const AuthController = {

  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const result = await AuthService.register({ name, email, password, role });
      res.status(201).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await AuthService.getMe(req.user.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

};

module.exports = AuthController;
