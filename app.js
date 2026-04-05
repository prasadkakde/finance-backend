import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import recordRoutes from './routes/record.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

import errorHandler from './utils/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Finance API Running 🚀");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.use(errorHandler);

export default app;