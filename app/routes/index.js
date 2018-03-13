<<<<<<< HEAD
const router = require('express').Router()
const hackersRoutes = require('./hackers.routes')
const clientRoutes = require('./client.routes')
const authenticate = require('../filters/authenticate')
const usersRoutes = require('./users.routes')
=======
const router = require("express").Router();
const hackersRoutes = require("./hackers.routes");
const clientRoutes = require("./client.routes");
const authenticate = require("../filters/authenticate");
const interactionRoutes = require("./interaction.routes");
>>>>>>> origin/master

module.exports = router;

// check authentication for all requests
router.use(authenticate);

// API routes (group routing modules here - no empty lines between)
<<<<<<< HEAD
router.use('/api/hackers', hackersRoutes)
router.use('/api/users', usersRoutes)
=======
router.use("/api/hackers", hackersRoutes);
router.use("/api/interactions", interactionRoutes);
>>>>>>> origin/master
// router.use('/api/entities', entitiesRoutes)
// router.use('/api/examples', examplesRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router);

// register client routes
router.use(clientRoutes);

function useAPIErrorHandlers(router) {
  // Handle API 404
  router.use("/api/*", (req, res, next) => {
    res.sendStatus(404);
  });

  // Handle API 500
  router.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.sendStatus(500);
  });
}
