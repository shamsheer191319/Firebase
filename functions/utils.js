exports.checkAdmin = (context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
    }
  
    if (context.auth.token.role !== "admin") {
      throw new functions.https.HttpsError("permission-denied", "Only admins can access this functionality.");
    }
  };
  