# Firebase
# **Real-Time Task Management System**

This project implements a backend system for managing tasks using Firebase services. It features user authentication, task creation and management, role-based access control, and task notifications. Designed with scalability, security, and efficiency in mind.

---

## **Project Features**
- **User Authentication**: Register, login, and profile management with Firebase Authentication.
- **Role-Based Access Control**: Separate functionality for admins and users.
- **Task Management**: CRUD operations for tasks stored in Firestore.
- **Notifications**: Send task assignment notifications via Firebase Functions.
- **Daily Summary Reports**: Automated reports logged into Firestore.

---

## **Project Architecture**

### **Technologies Used**
- **Firebase**:
  - Firebase Authentication
  - Firestore Database
  - Firebase Functions
- **Cloud Deployment**:
  - Hosted on Firebase Hosting and Firebase Functions
- **Postman**:
  - API testing and integration.

### **Architecture Design**
1. **Authentication**:
   - Users sign up or log in using Firebase Authentication.
   - Each user has roles (`user`, `admin`) stored in their profile.

2. **Firestore Database**:
   - Tasks are stored with a clear structure to enable efficient querying and role-based access.
   - Schema:
     ```
     tasks/
       - id: Auto-generated ID
       - title: String
       - description: String
       - status: Enum (pending, in-progress, completed)
       - assignee: String (User ID reference)
       - createdAt: Timestamp
       - updatedAt: Timestamp
       - createdBy: String (Creator’s User ID)
     ```

3. **Serverless Functions**:
   - **Task Notification**: Triggers email notification when a task is assigned.
   - **Daily Summary**: Logs task statistics for the day.

4. **Security**:
   - Firebase Authentication secures API endpoints.
   - Custom role-based middleware ensures only authorized access.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v14 or later)
- Firebase CLI (`npm install -g firebase-tools`)
- Java Runtime Environment (for Firebase Emulator Suite)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/shamsheer191319/Firebase.git
   cd task-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Log in to Firebase CLI:
     ```bash
     firebase login
     ```
   - Initialize Firebase in the project:
     ```bash
     firebase init
     ```
     Choose:
     - **Functions**: Yes
     - **Firestore**: Yes
     - **Emulators**: Yes (optional for local testing)
   - Deploy default configurations:
     ```bash
     firebase deploy
     ```

4. Set environment variables:
   - Navigate to `functions/.env` and update:
     ```
     PROJECT_ID=your-firebase-project-id
     REGION=your-firebase-region 
     ```

---

## **Usage**

### **Run the Project Locally**
1. Start Firebase Emulators:
   ```bash
   firebase emulators:start
   ```

2. Test API endpoints using Postman or cURL.

### **Deploy to Firebase**
To deploy the project:
```bash
firebase deploy
```

---

## **Endpoints**

| **Endpoint**                   | **Method** | **Description**                 |
|--------------------------------|------------|---------------------------------|
| `/registerUser`                | POST       | Register a new user            |
| `/loginUser`                   | POST       | Log in an existing user        |
| `/createTask`                  | POST       | Create a new task              |
| `/getTasks`                    | GET        | Fetch user-specific tasks      |
| `/updateTaskStatus`            | POST       | Update the status of a task    |
| `/deleteTask`                  | DELETE     | Delete a task (Admin-only)     |
| `/dailySummary`                | GET        | Fetch daily task statistics    |

---

## **Decisions Made**

1. **Firebase Services**:
   - Chosen for its ease of use and scalability.
   - Authentication and Firestore integrate seamlessly with serverless functions.

2. **Firestore Structure**:
   - Optimized for quick queries and role-based data filtering.

3. **Role-Based Middleware**:
   - Custom logic implemented to enforce strict separation between admin and user functionalities.

4. **Serverless Functions**:
   - Used to reduce server management overhead.
   - Triggers and scheduling enable event-driven logic.

5. **Emulator Support**:
   - Firebase Emulators are used to test features locally before deployment.

---

## **Postman Collection**
A Postman collection is included in the repository (`TaskManagement.postman_collection.json`) for API testing.

---
