

const express = require('express');
const CampaignController = require('../controllers/campaign.controller');
const { authMiddleware, adminOnly } = require('../middleware/auth.middleware');
const { validateCampaign } = require('../middleware/validate.middleware');

const router = express.Router();


router.get('/', CampaignController.getAllApproved);


router.get('/pending', authMiddleware, adminOnly, CampaignController.getPending);


router.get('/my', authMiddleware, CampaignController.getMyCampaigns);

router.post('/', authMiddleware, validateCampaign, CampaignController.create);


router.patch('/:id/approve', authMiddleware, adminOnly, CampaignController.approve);

router.patch('/:id/reject', authMiddleware, adminOnly, CampaignController.reject);

router.post('/:id/join', authMiddleware, CampaignController.join);

module.exports = router;
