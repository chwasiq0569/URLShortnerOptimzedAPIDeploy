import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:admin@cluster0.bekcudd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB