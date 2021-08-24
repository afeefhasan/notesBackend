const express_ = require('express');
const app = express_();
const mongoose = require('mongoose');
// const rateLimit = require("express-rate-limit");
// const xss  = require("xss-clean");
const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
var cors = require('cors');
const bodyParser = require("body-parser")

const DB='mongodb+srv://afeef:afeef@1180@cluster0.islmg.mongodb.net/project?retryWrites=true&w=majority'
const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log("MongoDB is connected");
    } catch(error){
        console.log(error);

        process.exit(1);
    }
}
connectToDatabase();

// app.use(apiLimiter);//safety against DOS attack

app.use(cors());//to follow cors policy

// app.use(xss());//safety against XSS attack or Cross Site Scripting attacks

app.use(helmet());//safety against XSS attack

// app.use(mongoSanitize());//safety against NoSql Injections

app.use(express_.json({ extended: false }));

app.use(express_.static('.'));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api/notes", require('./routes/notes'));







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;



app.listen(port,() => console.log(`Server is up and running at ${port}`));