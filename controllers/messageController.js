module.exports = (req, res) => {
    const message = req.body.message;
    const reversedMessage = message.split('').reverse().join('');
    res.json({ reversedMessage });  // Respond with reversed message
};