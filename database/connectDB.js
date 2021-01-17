const mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
}