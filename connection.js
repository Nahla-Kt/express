import mongoose from "mongoose";

export default async function connection(){
    const db = await mongoose.connect('mongodb://mongodb+srv://nahlaktnahla_db_user:F7tS7vXPU0qmfKJZ@cluster0.qlerth9.mongodb.net/BACKENDEXPRESS')
    console.log("database created");
    

    return db
}