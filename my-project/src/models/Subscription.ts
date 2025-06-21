import { Schema, Document, model, models } from "mongoose";

interface IMealSelection {
  mealType: "Breakfast" | "Lunch" | "Dinner";
  mealId: number;
  mealTitle: string;
  mealDescription: string;
}

interface IDailySchedule {
  date: Date;
  meals: IMealSelection[];
  status: "active" | "completed" | "paused" | "cancelled";
}

export interface ISubscription extends Document {
  _id: string;
  fullName: string;
  phoneNumber: string;
  planName: string;
  totalPrice: number;
  userEmail: string;
  subscriptionDate: Date;
  schedule: IDailySchedule[];
  status: "active" | "paused" | "cancelled";
}

const SubscriptionSchema = new Schema<ISubscription>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  planName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  userEmail: {
    type: String,
    required: [true, "User email is required."],
    index: true,
  },
  subscriptionDate: { type: Date, default: Date.now },
  schedule: [
    {
      date: { type: Date, required: true },
      meals: [
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
      ],
      status: {
        type: String,
        enum: ["active", "completed", "paused", "cancelled"],
        default: "active",
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "paused", "cancelled"],
    default: "active",
  },
});

const SubscriptionModel =
  models.Subscription ||
  model<ISubscription>("Subscription", SubscriptionSchema);

export default SubscriptionModel;
