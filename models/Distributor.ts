import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
  companyName: String,
  contactPerson: String,
  email: String,
  phone: String,
  address: String,
  message: String,
}, { timestamps: true });

export default mongoose.models.Distributor || mongoose.model("Distributor", distributorSchema);
