const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

exports.createTask = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const { title, description, assignee } = data;

  const task = {
    title,
    description,
    status: "pending",
    assignee,
    createdBy: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const taskRef = await admin.firestore().collection("tasks").add(task);
  return { message: "Task created successfully", id: taskRef.id };
});

exports.getTasks = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
    }
  
    const userId = context.auth.uid;
    const userRole = (await admin.auth().getUser(userId)).customClaims.role;
  
    let query = admin.firestore().collection("tasks");
    if (userRole !== "admin") {
      query = query.where("createdBy", "==", userId);
    }
  
    const tasksSnapshot = await query.get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    return { tasks };
  });

exports.dailySummary = functions.pubsub.schedule("every 24 hours").onRun(async () => {
    const snapshot = await admin.firestore().collection("tasks").get();
    const tasks = snapshot.docs.map(doc => doc.data());
  
    const summary = {
      totalTasks: tasks.length,
      completed: tasks.filter(t => t.status === "completed").length,
      pending: tasks.filter(t => t.status === "pending").length,
    };
  
    await admin.firestore().collection("summaries").add({
      ...summary,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  
    console.log("Daily Summary:", summary);
  });
  