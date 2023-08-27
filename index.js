const express = require('express');  
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const validateMessage = require('./middlewares/validationMiddleware');
const reversedMessage = require('./controllers/messageController');
const app = express();  
const port = 3011;  

// logging middleware
app.use(loggingMiddleware);

// Enable JSON parsing middleware
app.use(express.json());  

// Validation middleware
app.use(loggingMiddleware);

// Endpoint definition with validation
app.post('/reverse', validateMessage, reversedMessage);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;