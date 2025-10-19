const mongoose = require("mongoose")

const handleConnectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connect Successfully")
    } catch (err) {
        console.log(`MongoDB Connection Error : ${err.message}`)
    }
}

module.exports = handleConnectMongo;