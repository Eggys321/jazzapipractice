require('dotenv/config');
const express = require("express");
const app = express();
const morgan = require("morgan");
const connect = require("./config/db");
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const port = process.env.PORT || 8686;

// custom middlewares
app.use(express.json());
app.use(morgan("dev"));

// Api's
app.use('/api',productRoute);
app.use('/api',userRoute);
app.use('/api',orderRoute)


// port and mongoDB connection
connect()
.then(() => {
    try {
        app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
});

// routes

app.get("/", (req, res) => {
  res.status(200).json({ msg: "app is running" });
});

app.use((req,res)=>{
    res.json({errMsg:'that route doesnt exist'})
})