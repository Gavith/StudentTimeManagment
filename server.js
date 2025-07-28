import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentdb');

const DaySchema = new mongoose.Schema({
  date: String,
  recording: Number,
  study: Number,
  computerScience: Number,
  wastedTime: Number,
  unnecessaryWorks: Number
});
const Day = mongoose.model('Day', DaySchema);

// Get all days
app.get('/api/days', async (req, res) => {
  const days = await Day.find();
  res.json(days);
});

// Add a day (for testing)
app.post('/api/days', async (req, res) => {
  const day = new Day(req.body);
  await day.save();
  res.json(day);
});

// To add sample data, use this function:
async function addSampleDays() {
  const days = [
    { date: 'July 1', recording: 2.5, study: 3, computerScience: 1.5, wastedTime: 2, unnecessaryWorks: 1 },
    { date: 'July 2', recording: 3, study: 2.5, computerScience: 2, wastedTime: 1.5, unnecessaryWorks: 0.5 },
    { date: 'July 3', recording: 1.5, study: 4, computerScience: 2.5, wastedTime: 1, unnecessaryWorks: 1 },
    { date: 'July 4', recording: 2, study: 3.5, computerScience: 1, wastedTime: 2.5, unnecessaryWorks: 0.5 },
    { date: 'July 5', recording: 3.5, study: 2, computerScience: 2, wastedTime: 1, unnecessaryWorks: 1.5 },
    { date: 'July 6', recording: 2, study: 3, computerScience: 3, wastedTime: 1.5, unnecessaryWorks: 1 },
    { date: 'July 7', recording: 2.5, study: 2.5, computerScience: 2, wastedTime: 2, unnecessaryWorks: 1 }
  ];
  await Day.insertMany(days);
  console.log('Sample 7 days added');
}
addSampleDays();

app.listen(4000, () => console.log('Server running on port 4000'));