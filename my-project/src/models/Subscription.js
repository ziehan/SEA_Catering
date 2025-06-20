import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number."],
  },
  planName: {
    type: String,
    required: [true, "Please select a plan."],
    enum: ["Diet Plan", "Protein Plan", "Royal Plan"],
  },
  mealTypes: {
    type: [String],
    required: true,
  },
  deliveryDays: {
    type: [String],
    required: true,
  },
  allergies: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: [true, "User email is required."],
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
