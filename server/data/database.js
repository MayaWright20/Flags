
import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const {connection } = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Flags",
        });

        console.log(`Server connected to databse ${connection.host}`);

    }catch(error){
        console.log("Error occured", error);

        process.exit(1);
    }
}