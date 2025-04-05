import mongoose from "mongoose";

// Schema definition
const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Use capital 'Email' as model name to avoid conflicts with cached wrong models
const emailModel = mongoose.models.Email || mongoose.model('Email', EmailSchema);

export default emailModel;
