import mongoose from "mongoose";

const db = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/stockManagement`);
        console.log("Database connected successfully", connectionInstance.connection.host);
    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1);
    }
}

export default db;