

const BusinessService = require('../services/business.service');

const BusinessController = {

  getAll: async (req, res) => {
    try {
      const businesses = await BusinessService.getAll();
      res.status(200).json(businesses);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { biz_name, description, category, contact } = req.body;
      const business = await BusinessService.create({
        ownerId: req.user.id,
        userRole: req.user.role,
        biz_name, description, category, contact
      });
      res.status(201).json(business);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

};

module.exports = BusinessController;
