const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/feedbackdb');

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  userId: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
}));

app.use(cors());
app.use(express.json());

app.post('/api/feedback', async (req, res) => {
  await new Feedback(req.body).save();
  res.send({ success: true });
});

app.get('/api/feedback', async (req, res) => {
  res.send(await Feedback.find());
});

app.listen(5000, () => console.log('Server running on port 5000'));
