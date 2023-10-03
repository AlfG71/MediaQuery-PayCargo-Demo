// bin/seed.js

const mongoose = require('mongoose');
const Class = require('../models/Class');
require("dotenv").config()
const MONGO_URI = process.env.MONGODB_URI
console.log(process.env.MONGODB_URI);
const classes = [
    {
      title: "Cash Flow Statement Basics Explained",
      videoCreator: "Leila Gharani",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=hMBN6yTIDb0",
    },
    {
      title: "How to Create a Cash Flow Forecast (in under 20 minutes)",
      videoCreator: "Clara CFO Group",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=0BGanYasxn8",
    },
    {
      title: "How to Manage Your Cash Flow",
      videoCreator: "Dan Lok",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=Vn3RBKfPEt8",
    },
    {
      title: "Cash Flow vs. Profit",
      videoCreator: "LYFE Accounting",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=8RxYSUEnVXQ",
    },
    {
      title: "How To Deal With Cash Flow Problems",
      videoCreator: "Grow By Joe",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=b3cfvVMCG9E",
    },
    {
      title: "10 Cash Flow Drivers",
      videoCreator: "RareBrain",
      videoImg: "String",
      videoURL: "https://www.youtube.com/watch?v=TzVcUwXPVM4",
    }

]

mongoose
.connect(MONGO_URI)
.then(x => {
  console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the class collection

    return Class.create(classes)
    .then(classesFromDB => {
    console.log(`Created ${classesFromDB.length} classes`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating classes from the DB: ${err}`);
  });
})

//   mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })