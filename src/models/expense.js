import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    category:{
        type:String,
        enum:["food","clothes","bills","entertainment","travel","others"],
        default:"others"
    },
    date:{
        type:Date,
        default:Date.now,
    },
    note:{
        type:String,
        default:""
    }
},{timestamps:true})

const Expense=mongoose.model("Expense",expenseSchema);
export default Expense;