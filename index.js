import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
//import bcrypt from "bcryptjs";
//import { createError } from './error/err.js';
//import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { fetchalleleven } from './data/newdata.js';
import { fetchAllPlacePhotos } from './data/Data.js';
import { fetchNearbystays,getPlaceDetails } from './data/newdata.js';

import User from "./models/usermodel.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
app.use(cookieParser())
const apiKey = "AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw"
let client;
const connectDB = async () => {
  try {
    client=await mongoose.connect("mongodb+srv://bhanuylm75:bhanu@clusterwin.1hwtt.mongodb.net/booking?retryWrites=true&w=majority")
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure code
  }
};

app.post("/signup",async (req, res) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})

app.post("/login",async (req,res,next)=>{
  try{

    const user = await User.findOne({ email: req.body.email});
    if (!user) res.send(404, "User not found!")

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.send(400, "Wrong password or username!");

    const token = jwt.sign(
      { id: user._id, },
      "njewnejwenjj"
    );

    const { password,  ...otherDetails } = user._doc;
    //res.send(otherDetails)
    res.send({ token: token ,userid:user._id})


  }
  catch(err){
    next(err);
  }

})


const tripData = {
  destination: 'Hawaii',
  price: 1200,
  duration: '7 days',
  availableSeats: 25
};
app.get("/getalltrips" ,async (req, res)=>{
  try{
   const response=await fetchAllPlacePhotos()
   const db = mongoose.connection.db; // This gets the underlying native MongoDB connection
    const collection = db.collection('alltripsdata');

    const result = await collection.insertMany(response);
    res.send(response);
   //console.log(response)
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

app.post("/push/offbeat" ,async (req, res)=>{
  try{
   const response=await fetchalleleven()
   console.log(response)
   const db = mongoose.connection.db; // This gets the underlying native MongoDB connection
    const collection = db.collection('offbeatdata');

    const result = await collection.insertMany(response);
    res.send(response);
   //console.log(response)
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})
app.get("/gettrips", async (req, res) => {
  try {
    const db = mongoose.connection.db; // Access native MongoDB connection
    const collection = db.collection('alltripsdata'); // Access the 'alltrips' collection

    // Find all trips in the collection
    const trips = await collection.find({}).toArray();
    //console.log(trips)

    // Respond with the list of trips
    res.status(200).json({
      trips,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



app.get("/test", async (req,res)=>{
  const params = {
    access_key: 'c4ed18fced545727b9351e431035771e'
  }
  const response=await axios.get('https://api.aviationstack.com/v1/flights', {params})
  //console.log(response.data)
  res.send(res)
})
// Start the server


// api for getting the stays  according to your location

app.get("/api/getstaysaround",async (req,res)=>{
  const { lat, lng } = req.query;
  console.log(lat,lng)
  try{
    const response=await fetchNearbystays(lat,lng)
    console.log(response)
    res.send(response)

  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }


})


//api to get anyplacedetails by id

app.get("/api/getplacedetails",async (req,res)=>{
  const { id } = req.query;
  try{
    const response=await getPlaceDetails(id)
    //console.log(response)
    res.send(response)

  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }


})

// things to do sectiosn api call

app.get("/api/thingstodo",async (req,res)=>{
  const { lat,lng,query} = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lng}&key=${apiKey}`;
  try{
    const response=await axios.get(url)
    //console.log(response?.data)
    res.send(response?.data)

  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }


})


//api for search results hotels

app.get('/api/gethotels', async (req, res) => {
  const { searchValue, nextPageToken } = req.query;
  console.log(searchValue,nextPageToken)
  
  if (!searchValue) {
    return res.status(400).json({ error: 'Search value is required' });
  }
  const radius = 5000; // 5 km search radius
  const type = 'lodging';
  const query = `best hotels in ${searchValue}`;

  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&radius=${radius}&type=${type}&key=${apiKey}`;
  
  if (nextPageToken) {
    url += `&pagetoken=${nextPageToken}`;
  }

  try {
    const response = await axios.get(url);
    //console.log(response)
    res.json(response.data); // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});



