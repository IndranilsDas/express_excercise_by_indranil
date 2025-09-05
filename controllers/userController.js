import { Users } from "../models/users.js";
import {  validationResult } from "express-validator";

//import Users from '../models/users.js';


export const createUser = async (req , res)=>{
    try{
    console.log(req.body);
    
    const {name,email} = req.body

    const existingUser = await Users.findOne({where:{email}}); 

    if (existingUser){
        return res.status(400).json({ error: "Email already registered" });
    }
    const user = await Users.create({ name, email });
    res.status(201).json({ message: "User created", user });
   }catch (e){

    console.log(e);
    
   
    return res.status(500).json({message:'Server Error'})

   }

}

export const getAllUsers = async(req,res)=>{
  const users = await Users.findAll()
  console.log(users , "###################");
  
  res.json(users)
}

export const getUserbyID = async (req , res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    console.log(req.body);
    
    const {id} = req.params
    const user = await Users.findByPk(id);
    console.log(user,"USER");
    
    if (!user){
        return res.status(404).json({message:"User not found."})
    }

     res.render('userbyid',{user})
   }catch (e){

    console.log(e);
    
   
    return res.status(500).json({message:'Server Error'})

   }

}

export const updateUserbyID = async (req , res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    console.log(req.body);
    
    const {id} = req.params
    const {name , email} = req.body
    const user = await Users.findByPk(id);
    console.log(user,"USER");
    
    if (!user){
        return res.status(404).json({message:"User not found."})
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json(user)
   }catch (e){

    console.log(e);
    
   
    return res.status(500).json({message:'Server Error'})

   }

}

export const deleteByID = async(req, res)=>{
  try{
  const id = req.params.id

  if (!id) {res.send("Enter ID first")}
  
  const user = Users.destroy({where:{id:id}})

} catch (e){
  res.status(400).json({message:e})
}
  

}