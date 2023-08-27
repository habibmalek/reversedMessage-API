module.exports = (req, res, next) => {
    const message = req.body.message;
  
    if (!message) {
      return res.status(400).json({ error: 'Message field is required' });
    }
  
    if (message.length > 100) {
      return res.status(400).json({ error: 'Message length exceeds the limit' });
    }
  
    next();  // Move to the next middleware
};