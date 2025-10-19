// MongoDB initialization script
db.createUser({
  user: "obagateam",
  pwd: "password123",
  roles: [
    {
      role: "readWrite",
      db: "obagateam"
    }
  ]
});

// Create collections and initial data
db.createCollection("chatmessages");
db.createCollection("contacts");
db.createCollection("users");

// Add indexes for better performance
db.chatmessages.createIndex({ timestamp: -1 });
db.chatmessages.createIndex({ room: 1 });
db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ createdAt: -1 });

print("✅ MongoDB initialization completed for obagaTeam");