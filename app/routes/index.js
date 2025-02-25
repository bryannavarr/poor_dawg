
const router = require("express").Router();
const hackersRoutes = require("./hackers.routes");
const sponsorsRoutes = require("./sponsors.routes")
const clientRoutes = require("./client.routes");
const authenticate = require("../filters/authenticate");
const interactionRoutes = require("./interaction.routes");
const usersRoutes = require('./users.routes')
const vetsRoutes = require('./vets.routes')
const challengeRoutes = require("./challenge.routes");
const notificationsRoutes = require("./notifications.routes");
const dogsRoutes = require('./dogs.routes')
const breedsRoutes = require('./breeds.routes');
const rewardsRoutes = require('./rewards.routes');
const dogOwnersRoutes = require('./dogOwners.routes')

module.exports = router;

// check authentication for all requests
router.use(authenticate);

// API routes (group routing modules here - no empty lines between)
router.use('/api/dogs', dogsRoutes)
router.use('/api/rewards', rewardsRoutes)
router.use("/api/hackers", hackersRoutes);
router.use('/api/vets', vetsRoutes)
router.use("/api/interactions", interactionRoutes);
router.use('/api/users', usersRoutes)
router.use("/api/challenges", challengeRoutes);
router.use("/api/notifications/", notificationsRoutes);
router.use("/api/breeds", breedsRoutes);
router.use('/api/dogOwners', dogOwnersRoutes)
router.use("/api/sponsors", sponsorsRoutes)
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
