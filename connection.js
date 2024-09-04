const mongoose = require("mongoose");

async function connectMongoDb(url){
    return mongoose.connect(url).then(()=>console.log("MongoDB Connected")).catch((error) => console.log(error))
}

module.exports = {
    connectMongoDb
}