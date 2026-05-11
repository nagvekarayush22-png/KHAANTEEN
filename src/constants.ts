import { FoodItem } from "./types";

export const FOOD_CATEGORIES = [
  "Tea & Beverages",
  "Snacks & Light Bites",
  "Main Course",
  "Rice & Pulao",
  "Premium Dishes",
  "Extras"
];

export const MENU_ITEMS: FoodItem[] = [
  { id: "1", name: "Tea", price: 10, category: "Tea & Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1544787210-22dbdc1763f6?auto=format&fit=crop&w=800&q=80" },
  { id: "2", name: "Coffee", price: 20, category: "Tea & Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80" },
  { id: "3", name: "Samosa (2Pcs)", price: 30, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1601050690597-df056fb467ad?auto=format&fit=crop&w=800&q=80" },
  { id: "4", name: "Poha", price: 30, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "5", name: "Vada Pav", price: 20, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80" },
  { id: "6", name: "Cheese Vada Pav", price: 40, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80" },
  { id: "7", name: "Maggi", price: 40, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80" },
  { id: "8", name: "Cheese Maggi", price: 60, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80" },
  { id: "9", name: "Aloo Paratha", price: 60, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&w=800&q=80" },
  { id: "10", name: "Cheese Paratha", price: 80, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&w=800&q=80" },
  { id: "11", name: "Paneer Paratha", price: 80, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&w=800&q=80" },
  { id: "12", name: "Bread Butter", price: 40, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80" },
  { id: "13", name: "Veg Sandwich", price: 50, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },
  { id: "14", name: "Cheese Sandwich", price: 80, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },
  { id: "15", name: "Veg Cheese Sandwich", price: 80, category: "Snacks & Light Bites", isAvailable: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },
  { id: "16", name: "Masala Rice", price: 80, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "17", name: "Veg Fry Rice", price: 90, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80" },
  { id: "18", name: "Paneer Pulao", price: 100, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "19", name: "Cheese Pulao", price: 100, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "20", name: "Hakka Noodles", price: 90, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80" },
  { id: "21", name: "Mix Pulao", price: 100, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "22", name: "Fix Thali", price: 100, category: "Rice & Pulao", isAvailable: true, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80" },
  { id: "23", name: "Jeera Rice & Dal Fry", price: 80, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80" },
  { id: "24", name: "Jeera Aloo", price: 80, category: "Main Course", isAvailable: true, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80" },
  { id: "25", name: "Paneer Handi", price: 100, category: "Premium Dishes", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "26", name: "Paneer Butter Masala", price: 100, category: "Premium Dishes", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "27", name: "Paneer Bhurji", price: 100, category: "Premium Dishes", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "28", name: "Cheese Tadka", price: 100, category: "Premium Dishes", isAvailable: true, image: "https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" },
  { id: "29", name: "Extra Rice", price: 30, category: "Extras", isAvailable: true, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80" },
  { id: "30", name: "Roti", price: 5, category: "Extras", isAvailable: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80" },
];
