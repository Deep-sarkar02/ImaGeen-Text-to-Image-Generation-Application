// this is the ttransaction model


import mongoose from "mongoose";
// create the schema
const TransactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    credits: { type: Number, required: true },
    amount: { type: Number, required: true },
    date: { type: Number },
    payment: { type: Boolean, default: false }
});
const TransactionModel = mongoose.models.Transaction ||
    mongoose.model("Transaction", TransactionSchema);
// export the model
export default TransactionModel;

