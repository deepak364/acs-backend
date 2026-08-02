

const CampaignService = require('../services/campaign.service');

const CampaignController = {

  getAllApproved: async (req, res) => {
    try {
      const campaigns = await CampaignService.getAllApproved();
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  getPending: async (req, res) => {
    try {
      const campaigns = await CampaignService.getPending();
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  getMyCampaigns: async (req, res) => {
    try {
      const campaigns = await CampaignService.getMyCampaigns(req.user.id);
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const campaign = await CampaignService.create({
        title, description, category, userId: req.user.id
      });
      res.status(201).json(campaign);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  approve: async (req, res) => {
    try {
      const campaign = await CampaignService.approve(req.params.id);
      res.status(200).json(campaign);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  reject: async (req, res) => {
    try {
      const campaign = await CampaignService.reject(req.params.id);
      res.status(200).json(campaign);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  join: async (req, res) => {
    try {
      const result = await CampaignService.join(req.params.id, req.user.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

};

module.exports = CampaignController;
