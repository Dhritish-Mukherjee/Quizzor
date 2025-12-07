// adding required headers
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const authRouter = require('./routes/authRoutes');
const redisClient = require('./config/redis');
const errorHandler = require('./middleware/errorHandler');
const quizRouter = require('./routes/quizRoutes');
const adminRouter = require('./routes/adminRoutes')
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const path = require('path');
const app = express();

// database Connections
connectDB();

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis Connected Successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//cors
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

// routes
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/admin', adminRouter)
app.use('/api/leaderboard', leaderboardRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
})

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


// running server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});