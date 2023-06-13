const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
const {readdirSync}=require("fs");
require('dotenv').config();



//app
const app=express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));


//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors(
  {        
  origin: ["http://localhost:3000" , "https://spmart.onrender.com/"]

  }
));

//routes middleware

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r))); 

//port
const port=process.env.port || 8000;
app.listen(port,()=>console.log(`Server is running on the port ${port}`));

