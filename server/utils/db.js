const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Connected to database ${connection.connections[0].name}`);
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectToDb;