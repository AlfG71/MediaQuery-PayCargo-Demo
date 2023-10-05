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
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696519628/mediaquery-project/Software_and_tools_rcauzv.png",
      videoURL: "https://www.youtube.com/watch?v=hMBN6yTIDb0"
    },
    {
      title: "How to Create a Cash Flow Forecast (in under 20 minutes)",
      videoCreator: "Clara CFO Group",
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696519647/mediaquery-project/Cash_Flow_igagww.png",
      videoURL: "https://www.youtube.com/watch?v=0BGanYasxn8"
    },
    {
      title: "How to Manage Your Cash Flow",
      videoCreator: "Dan Lok",
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696524702/mediaquery-project/Financial_Ethics_fvzfyr.png",
      videoURL: "https://www.youtube.com/watch?v=Vn3RBKfPEt8"
    },
    {
      title: "Cash Flow vs. Profit",
      videoCreator: "LYFE Accounting",
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696524802/mediaquery-project/blockchain_1_hxsmsi.png",
      videoURL: "https://www.youtube.com/watch?v=8RxYSUEnVXQ"
    },
    {
      title: "How To Deal With Cash Flow Problems",
      videoCreator: "Grow By Joe",
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696519717/mediaquery-project/Investment_er0n4v.png",
      videoURL: "https://www.youtube.com/watch?v=b3cfvVMCG9E"
    },
    {
      title: "10 Cash Flow Drivers",
      videoCreator: "RareBrain",
      videoImg: "https://res.cloudinary.com/deepjfoly/image/upload/v1696519511/mediaquery-project/Case_Studies_fkypzy.png",
      videoURL: "https://www.youtube.com/watch?v=TzVcUwXPVM4"
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