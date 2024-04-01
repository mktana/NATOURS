const express = require('express');
const controller = require('../controllers/tourController');

const router = express.Router();

router.param('id', controller.checkID);

//Create a checkBody middleware
//Check if body contains the name and price property
// if not, send back 400 http status
// Add it to the post handler stack

router
  .route('/')
  .get(controller.getAllTours)
  .post(controller.checkBody, controller.createTour);

router
  .route('/:id')
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(controller.deleteTour);

module.exports = router;
