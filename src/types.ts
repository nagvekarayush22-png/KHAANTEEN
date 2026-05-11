export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  rating?: number;
  isAvailable?: boolean;
}

export type OrderStatus = "pending" | "accepted" | "preparing" | "ready" | "completed" | "cancelled";

export interface Order {
  id: string;
  items: { foodId: string; quantity: number; name: string; price: number }[];
  total: number;
  status: OrderStatus;
  userType: "student" | "faculty";
  userId: string;
  createdAt: string;
  token?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty" | "admin";
  walletBalance?: number;
  rewardPoints?: number;
}
