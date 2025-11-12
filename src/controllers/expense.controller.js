import Expense from "../models/expense.js";

const addExpense= async(req,res)=>{
    try {
        const{title,amount,category,date,note}=req.body;
        const expense=await Expense.create({title,amount,category,date,note,user:req.user._id})
        return res.status(201).json({message:"expenses were created"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getExpense=async(req,res)=>{
  try {
      const expenses= await Expense.find({user:req.user._id})
      res.status(200).json({message:"data fetched successfully",expenses})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

const updateExpense=async(req,res)=>{
   try {

     const {id}=req.params
     const expense=await Expense.findById(id)
     if(expense.user.toString()!==req.user._id.toString()){
        return res.status(401).json({message:"unauthorized user"})
     }
     const updateExpense= await Expense.findByIdAndUpdate(id,req.body,{new:true})
     res.status(201).json({message:"data is updated successfully",updateExpense})
   } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
   }
}

const deleteExpense=async(req,res)=>{
  try {
    await Expense.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"expense deleted successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}


const getTotalExpense= async(req,res)=>{
  try {
    const userId=req.user._id;
    const total= await Expense.aggregate([
      {$match:{user: userId}},
      {$group:{_id:null,totalAmount:{$sum:"$amount"}}},

    ])
    const totalAmount= total.length>0 ? total[0].totalAmount:0;
    res.status(200).json({message:"total calculated successfully",totalAmount})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}
export{addExpense,getExpense,updateExpense,deleteExpense,getTotalExpense}