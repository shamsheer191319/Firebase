const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.registerUser = functions.https.onCall(async (data, context) => {
  const { email, password, name, role } = data;

  if (!role || !["admin", "user"].includes(role)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid role provided.");
  }

  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name,
  });

  await admin.auth().setCustomUserClaims(userRecord.uid, { role });

  await admin.firestore().collection("users").doc(userRecord.uid).set({
    name,
    email,
    role,
    profilePicture: "",
  });

  return { message: "User registered successfully", uid: userRecord.uid };
});
