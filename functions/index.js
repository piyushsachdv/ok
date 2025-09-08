/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.deleteUnverifiedUsers = functions.pubsub
    .schedule("every 60 minutes") // runs every hour
    .onRun(async (context) => {
      const listUsersResult = await admin.auth().listUsers(1000);
      const now = Date.now();
      const cutoff = 2 * 60 * 1000; // 2 minutes in ms

      const deletions = listUsersResult.users
          .filter(
              (user) =>
                !user.emailVerified &&
                now - new Date(user.metadata.creationTime).getTime() > cutoff,
          )
          .map((user) => admin.auth().deleteUser(user.uid));

      await Promise.all(deletions);

      logger.log(
          "Unverified users deleted:",
          deletions.length,
      );
      return null;
    });
