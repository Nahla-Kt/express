// import mongoose from "mongoose";

// const userSchema =new mongoose.Schema({
//     name:{type:String},
//     phone:{type:Number},
//     image:{type:String}
// })

// export default mongoose.models.datas||mongoose.model('datas',userSchema)


import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    image:{type:String},
    user_id:{type:String}
})

export default mongoose.models.datas||mongoose.model('datas',userSchema)