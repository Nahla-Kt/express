import mongoose from "mongoose";

export default async function connection(){
    const db = await mongoose.connect('mongodb+srv://nahlaktnahla_db_user:F7tS7vXPU0qmfKJZ@cluster0.5our2lg.mongodb.net/BACKENDEXPRESS')
    console.log("database created");
    

    return db
}