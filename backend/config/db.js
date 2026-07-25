import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connecté `);
    } catch (error) {
        console.error(error.message);
        
    }
};

export default connectDB;