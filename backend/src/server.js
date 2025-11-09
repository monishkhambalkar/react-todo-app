const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const folderRoutes = require('./routes/folderRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('api/folders', folderRoutes);
app.use('api/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, ()=> console.log(`SERVER IS RUNNING ON ${PORT}`));
