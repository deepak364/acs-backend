

const BusinessModel = require('../models/business.model');

const BusinessService = {
  getAll: async () => {
    return await BusinessModel.findAll();
  },


  create: async ({ ownerId, biz_name, description, category, contact, userRole }) => {
    if (userRole !== 'business_owner' && userRole !== 'admin') {
      const error = new Error('Only business owners can post promotions.');
      error.status = 403;
      throw error;
    }
    return await BusinessModel.create({ ownerId, biz_name, description, category, contact });
  },

};

module.exports = BusinessService;
