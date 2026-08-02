

const express = require('express');
const BusinessController = require('../controllers/business.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validateBusiness } = require('../middleware/validate.middleware');

const router = express.Router();


router.get('/', BusinessController.getAll);


router.post('/', authMiddleware, validateBusiness, BusinessController.create);

module.exports = router;
