import mongoose from "mongoose";

const mealSelectionSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
    mealId: { type: Number, required: true },
    mealTitle: { type: String, required: true },
    mealDescription: { type: String, required: true },
  },
  { _id: false }
);

const dailyScheduleSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    meals: [mealSelectionSchema],
    status: {
      type: String,
      enum: ["active", "completed", "paused", "cancelled"],
      default: "active",
    },
  },
  { _id: false }
);

const SubscriptionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  planName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  userEmail: { type: String, required: [true, "User email is required."] },
  subscriptionDate: { type: Date, default: Date.now },
  schedule: [dailyScheduleSchema],
  status: {
    type: String,
    enum: ["active", "paused", "cancelled"],
    default: "active",
  },
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
