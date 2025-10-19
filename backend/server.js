import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with robust error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/obagateam';

const connectDB = async () => {
  try {
    console.log(`🔗 Attempting to connect to MongoDB: ${MONGODB_URI.replace(/:[^:]*@/, ':****@')}`);
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
    });
    
    console.log('✅ MongoDB Connected successfully');
    
    // Handle MongoDB connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Application will continue without database connection');
  }
};

// Health check endpoint - always works even without DB
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let dbMessage = 'unknown';
  
  switch(dbStatus) {
    case 0: dbMessage = 'disconnected'; break;
    case 1: dbMessage = 'connected'; break;
    case 2: dbMessage = 'connecting'; break;
    case 3: dbMessage = 'disconnecting'; break;
  }
  
  res.json({ 
    status: 'OK', 
    message: 'obagaTeam Backend API is running',
    timestamp: new Date().toISOString(),
    database: dbMessage,
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'obagaTeam Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: ['REST API', 'WebSocket Chat', 'MongoDB Storage'],
    endpoints: {
      health: '/api/health',
      info: '/api/info',
      contact: '/api/contact (POST)',
      websocket: 'ws://localhost:3001'
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company, service } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // If MongoDB is connected, save to database
    if (mongoose.connection.readyState === 1) {
      // You can add MongoDB saving logic here later
      console.log('📧 Contact form submission (would save to DB):', { name, email, company, service });
    } else {
      console.log('📧 Contact form submission (DB not available):', { name, email, company, service });
    }

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        company,
        service,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// Socket.io setup with robust error handling
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Store active connections for debugging
const activeConnections = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  const connectionId = socket.id;
  const userAgent = socket.handshake.headers['user-agent'] || 'unknown';
  
  console.log('🔗 User connected:', connectionId);
  activeConnections.set(connectionId, {
    connectedAt: new Date(),
    userAgent: userAgent
  });

  // Send welcome message
  socket.emit('chat message', {
    id: Date.now(),
    text: 'Welcome to obagaTeam Support! How can we help you today?',
    sender: 'system',
    timestamp: new Date().toLocaleTimeString()
  });

  // Handle incoming chat messages
  socket.on('chat message', async (data) => {
    try {
      const { text, sender = 'user' } = data;
      
      if (!text || text.trim().length === 0) {
        return;
      }

      const messageText = text.trim();
      console.log('💬 Message received from', connectionId + ':', messageText);

      // Save message to MongoDB if connected
      if (mongoose.connection.readyState === 1) {
        // You can add MongoDB message saving here later
        console.log('💾 Message would be saved to database');
      }

      // Auto-reply logic
      setTimeout(() => {
        const responses = [
          "Thanks for your message! Our support team will get back to you shortly.",
          "We've received your message and will respond soon.",
          "Thank you for contacting obagaTeam support! How can we assist you?",
          "Your message has been received. Our team typically responds within 1-2 hours.",
          "Hello! Thanks for reaching out. We're here to help with your technology needs."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        socket.emit('chat message', {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'admin',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds

    } catch (error) {
      console.error('Error handling chat message:', error);
      socket.emit('error', { 
        message: 'Failed to process your message. Please try again.' 
      });
    }
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.broadcast.emit('user typing', {
      isTyping: data.isTyping,
      userId: connectionId
    });
  });

  // Handle connection info request
  socket.on('get_connection_info', () => {
    socket.emit('connection_info', {
      connectionId: connectionId,
      activeConnections: activeConnections.size,
      serverTime: new Date().toISOString()
    });
  });

  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log('🔌 User disconnected:', connectionId, 'Reason:', reason);
    activeConnections.delete(connectionId);
    
    // Broadcast user left (for admin purposes)
    socket.broadcast.emit('user_left', {
      userId: connectionId,
      activeConnections: activeConnections.size,
      timestamp: new Date().toISOString()
    });
  });

  // Handle connection errors
  socket.on('error', (error) => {
    console.error('Socket error for', connectionId + ':', error);
  });
});

// API endpoint to get server statistics
app.get('/api/stats', (req, res) => {
  res.json({
    activeConnections: activeConnections.size,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/info',
      'GET /api/stats',
      'POST /api/contact'
    ]
  });
});

// Root endpoint - provide information
app.get('/', (req, res) => {
  res.json({ 
    message: 'obagaTeam Backend API Server',
    description: 'This is the backend API server for obagaTeam website',
    services: {
      api: 'REST API endpoints available at /api/*',
      websocket: 'Real-time chat via WebSocket',
      database: 'MongoDB for data persistence'
    },
    frontend: 'Frontend is served separately on port 80',
    documentation: 'Check /api/info for available endpoints'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  // Don't exit the process, just log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown handler
const gracefulShutdown = () => {
  console.log('🛑 Received shutdown signal, closing server gracefully...');
  
  // Close server
  server.close(() => {
    console.log('✅ HTTP server closed');
    
    // Close MongoDB connection
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close(false, () => {
        console.log('✅ MongoDB connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.log('⚠️ Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server function with port conflict handling
const startServer = async () => {
  try {
    // Connect to MongoDB (non-blocking)
    connectDB();
    
    server.listen(PORT, () => {
      console.log('🎉 =================================');
      console.log('🚀 obagaTeam Backend Server Started!');
      console.log('🎉 =================================');
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 MongoDB: ${MONGODB_URI.replace(/:[^:]*@/, ':****@')}`);
      console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📊 Server Info: http://localhost:${PORT}/api/info`);
      console.log(`📈 Statistics: http://localhost:${PORT}/api/stats`);
      console.log('====================================');
    });

    // Handle server errors (like port already in use)
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use`);
        console.log('💡 Try these solutions:');
        console.log('   1. Stop any other services using port', PORT);
        console.log('   2. Use a different port by setting PORT environment variable');
        console.log('   3. Run: sudo lsof -i :' + PORT, 'to see what\'s using the port');
        process.exit(1);
      } else {
        console.error('❌ Server error:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();