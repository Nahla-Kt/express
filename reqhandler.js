import userSchema from './model/model.js'
import DataSchema from './model/user.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign} = pkg

// export async function addData(req,res){
//     console.log(req.body);
//     const Datas={...req.body}
//     await userSchema.create(Datas).then(()=>{
//         res.status(201).send({msg:"successfull"})
//     }).catch((error)=>{
//         res.status(401).send({erro:error})
//     })
    
// }

// export async function addData(req,res){
//     const {name,phone,image}=req.body
//     if(!(name&&phone&&image)){
//         return res.status(500).send({msg:"invalid input"})
//     }else{
//         userSchema.create({name,phone,image}).then(()=>{
//         res.status(201).send({msg:"successfull"})
//     }).catch((error)=>{
//         console.log(error);
        
//     })
//     }
// }




export async function addData(req,res){
    const {title,price,image}=req.body
    const user_id=req.user.UserID
    if(!(title&&price&&image)){
        return res.status(500).send({msg:"invalid input"})
    }else{
        userSchema.create({title,price,image,user_id}).then(()=>{
        res.status(201).send({msg:"successfull"})
    }).catch((error)=>{
        console.log(error);
        
    })
    }
}

export async function getData(req,res){
    const data =await userSchema.find()
    res.status(200).send(data)
}

// export async function getsingleData(req,res) {

//     try {
        

//         const {id}=req.params
//         const data =await userSchema.findOne({_id:id})
//         res.status(200).send(data)
//     } catch (error) {
//         res.status(500).send({error:error})
//     }
    
// }




export async function getsingleData(req,res) {


        const {id}=req.params
     userSchema.findOne({_id:id}).then((data)=>{
        res.status(200).send(data)
     }).catch ((error)=> {
        res.status(500).send({error:error})
    })
    
}

// export async function updateData(req,res){
//     const {id} =req.params
//     const {name,phone,image} = req.body
//     if(!(name&&phone&&image)){
//         return res.status(500).send({msg:"invalid input"})

//     }else{
//      userSchema.updateOne({_id:id},{$set:{name,phone,image}}).then(()=>{
//         res.status(200).send({msg:"success"})

//         }).catch((error)=>{
//             res.status(500).send({error:error})
//         })
//     }
// }


// export async function updateData(req,res){
//     const {id} =req.params
//     const {name,phone,image} = req.body

//     console.log("JWT user",req.user);
//     console.log("ID",req.user.UserID);
    
    
//     if(!(name&&phone&&image)){
//         return res.status(500).send({msg:"invalid input"})

//     }else{
//      userSchema.updateOne({_id:req.user.UserID},{$set:{name,phone,image}}).then(()=>{
//         res.status(200).send({msg:"success"})

//         }).catch((error)=>{
//             res.status(500).send({error:error})
//         })
//     }
// }


export async function updateData(req,res){
    const {id} =req.params
    const {name,email} = req.body

    console.log("JWT user",req.user);
    console.log("ID",req.user.UserID);
    
    
     DataSchema.updateOne({_id:req.user.UserID},{$set:{name,email}}).then(()=>{
        res.status(200).send({msg:"success"})

        }).catch((error)=>{
            res.status(500).send({error:error})
        })
    }


export async function deleteOne(req,res){
    const {id} =req.params
 userSchema.deleteOne({_id:id}).then(()=>{
    res.status(200).send({msg:"deleted"})
 }).catch((error)=>{
    res.status(500).send({error:error})
 })

}

export async function addUser(req,res){
const{name,email,pass,cpass}=req.body
if(!(name&&email&&pass&&cpass)){
    return res.status(500).send({msg:"invalid input"})
}else if(pass!=cpass){
    return res.status(500).send({msg:"password mismatch"})
}else{
    bcrypt.hash(pass,10).then((hpwd)=>{
        DataSchema.create({name,email,pass:hpwd}).then(()=>{
            res.status(201).send({msg:"successfully"})
        })
    }).catch((error)=>{
        console.log(error);
        
    })
}
}

export async function login(req,res) {

    const {email,pass} =req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"fields are empty"})
    const user =await DataSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"user not exist"})
    const success = await bcrypt.compare(pass,user.pass)

    if(success!==true)
        return res.status(500).send({msg:"incorrect password"})
    const token =await sign ({UserID:user._id},process.env.JWT_TOKEN,{expiresIn:"24h"})
    res.status(200).send({token})
    
}



export async function updateProduct(req,res){
    const {id} =req.params
    const {title,price,image} = req.body
    const userId =req.user.UserID
    
     userSchema.updateOne(
        {_id:id,user_id:userId},
        {$set:{title,price,image}}
     ).then(()=>{
        res.status(200).send({msg:"product update success"})
     }).catch((error)=>{
        res.status(500).send({error})

     })
}