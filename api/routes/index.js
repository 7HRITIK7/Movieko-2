const express = require('express');
const router = express.Router();

// Import controllers
const { exampleController } = require('../controllers');

// Define routes
router.get('/example', exampleController.getExample);
router.post('/example', exampleController.createExample);

// Add more routes as needed

module.exports = (app) => {
    app.use('/api', router);
};