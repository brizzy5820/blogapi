const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./src/config/database')
const dotenv = require('dotenv');
const productRoutes = require('./Route/productRoute');
const product= require('./src/model/productModel');
const userRoute = require('./Route/userRoute')
dotenv.config();
connectDB();
app.use(express.json());
// Allow requests ONLY from your specific frontend URL
const corsOptions = {
  origin: ['http://127.0.0.1:5500'], 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT || 5500;
const host = '127.0.0.1';
//  ROutes
app.use("/api/products",productRoutes);
app.use("/api/auth", userRoute);
// app.use(cors());

const server = app.listen(port,host,()=>{
    console.log(`server running on ${host}:${port}`);
})