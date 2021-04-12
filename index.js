let express = require('express');
let mongoose = require("mongoose");
const {Users} = require('./models/user')
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
require('dotenv').config();

mongoose.connect(`mongodb+srv://Sandeep:Sandeep99@cluster0.7qa74.mongodb.net/test`,{useNewUrlParser: true,useUnifiedTopology: true})
.then((data)=>{console.log("successfully connected to db")})
.catch((err)=>{console.log("error connecting to db",err)})

mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

let app =express();
const userRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/Profiles');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/profile',profileRoute);


if(process.env.NODE_ENV === 'production'){
 
  app.use(express.static(path.join(__dirname,'/client/build')));
  
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  })
 
} 
else{
  app.get("/", (req,res)=>{
    res.send("Api running");
  })
}
console.log(`App is ${process.env.PORT}`);
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
    console.log(`App is ${process.env.NODE_ENV}`);
})
/* server.listen(8080,()=>{
    console.log("server is listening ro port 8k");
}); */