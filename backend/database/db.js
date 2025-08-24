const mongoose = require("mongoose")
const URI = process.env.MONGO_DB_URI
const db = async () => {
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = db