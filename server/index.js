const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB Connected');
}).catch((err)=>{
    console.log(err);
});

const server = app.listen(process.env.PORT , () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});