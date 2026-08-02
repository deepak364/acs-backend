

const CampaignModel = require('../models/campaign.model');

const CampaignService = {

  getAllApproved: async () => {
    return await CampaignModel.findAllApproved();
  },

  getPending: async () => {
    return await CampaignModel.findAllPending();
  },

  getMyCampaigns: async (userId) => {
    return await CampaignModel.findByUserId(userId);
  },


  create: async ({ title, description, category, userId }) => {
    const campaign = await CampaignModel.create({ title, description, category, userId });
    return campaign;
  },


  approve: async (campaignId) => {
    const campaign = await CampaignModel.updateStatus(campaignId, 'approved');
    if (!campaign) {
      const error = new Error('Campaign not found.');
      error.status = 404;
      throw error;
    }
    return campaign;
  },


  reject: async (campaignId) => {
    const campaign = await CampaignModel.updateStatus(campaignId, 'rejected');
    if (!campaign) {
      const error = new Error('Campaign not found.');
      error.status = 404;
      throw error;
    }
    return campaign;
  },

  join: async (campaignId, userId) => {
    await CampaignModel.addParticipant(campaignId, userId);
    return { message: 'Joined campaign successfully.' };
  },

};

module.exports = CampaignService;
