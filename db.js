const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://cellfirstformm:cellfirstformm@cellcluster.5iot12f.mongodb.net/?retryWrites=true&w=majority&appName=cellcluster', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;