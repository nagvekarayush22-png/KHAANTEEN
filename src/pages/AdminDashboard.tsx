import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
    LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, 
    Bell, Search, CheckCircle2, XCircle, Clock, MoreHorizontal,
    TrendingUp, DollarSign, Package, Monitor, Plus, Minus, Trash2, User,
    Filter, ArrowUpDown, LogOut
} from "lucide-react";
import { io } from "socket.io-client";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { BeachBackground } from "../components/BeachBackground";
import { cn } from "../lib/utils";
import { MENU_ITEMS, FOOD_CATEGORIES } from "../constants";
import { FoodItem } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const data = [
  { name: "8:00", sales: 120, orders: 45 },
  { name: "10:00", sales: 450, orders: 89 },
  { name: "12:00", sales: 890, orders: 156 },
  { name: "14:00", sales: 670, orders: 120 },
  { name: "16:00", sales: 340, orders: 78 },
  { name: "18:00", sales: 560, orders: 94 },
  { name: "20:00", sales: 230, orders: 50 },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [posCategory, setPosCategory] = useState("All");
  const [posCart, setPosCart] = useState<{item: FoodItem, quantity: number}[]>([]);
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Order History State
  const [orders, setOrders] = useState<any[]>([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    // Fetch initial orders
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    // Connect socket
    const socket = io();

    socket.on('orderUpdated', (updatedOrder) => {
      setOrders(prev => {
        const existingOrderIndex = prev.findIndex(o => o.id === updatedOrder.id);
        if (existingOrderIndex !== -1) {
          // Update existing
          const newOrders = [...prev];
          newOrders[existingOrderIndex] = updatedOrder;
          return newOrders;
        } else {
          // Add new
          return [...prev, updatedOrder];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.studentName?.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                           order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()));
    const matchesStatus = orderStatusFilter === "All" || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const addToPosCart = (item: FoodItem) => {
    setPosCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updatePosQty = (id: string, delta: number) => {
    setPosCart(prev => prev.map(i => {
      if (i.item.id === id) {
        return { ...i, quantity: Math.max(1, i.quantity + delta) };
      }
      return i;
    }));
  };

  const removeItem = (id: string) => {
    setPosCart(prev => prev.filter(i => i.item.id !== id));
  };

  const posTotal = posCart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  const handlePlaceOrder = () => {
    if (!studentId) {
      alert("Please enter Student/Faculty ID");
      return;
    }
    alert(`Order placed for ${studentId}! Total: ₹${posTotal}`);
    setPosCart([]);
    setStudentId("");
  };

  const stats = [
    { label: "Daily Revenue", value: "₹42,850", change: "+12.5%", icon: <DollarSign size={20} className="text-green-500" />, trend: "up" },
    { label: "Active Orders", value: "24", change: "+4", icon: <ShoppingBag size={20} className="text-blue-500" />, trend: "up" },
    { label: "Total Students", value: "1,450", change: "+2%", icon: <Users size={20} className="text-orange-500" />, trend: "up" },
    { label: "Stock Alerts", value: "8 Low", change: "-2", icon: <Package size={20} className="text-[#E31E24]" />, trend: "down" },
  ];

  return (
    <div className="relative min-h-screen pt-20 md:pt-32 pb-24 px-3 sm:px-6 flex flex-col xl:flex-row gap-6 lg:gap-8 bg-white">
      
      {/* Sidebar - Management Hub */}
      <div className="w-full xl:w-20 lg:w-64 flex flex-col gap-6 sticky top-20 md:top-32 h-fit z-40 bg-white/80 backdrop-blur-md pt-2 md:pt-0">
        <div className="bg-white border border-gray-100 rounded-2xl md:rounded-[32px] p-2 md:p-4 flex xl:flex-col gap-2 shadow-xl shadow-gray-100/50 overflow-x-auto xl:overflow-hidden no-scrollbar">
            <Link to="/" className="p-4 mb-2 hidden xl:flex items-center justify-center group hover:scale-110 transition-transform">
                <Logo showText={false} className="scale-75" />
            </Link>
            {[
                { id: "overview", icon: <LayoutDashboard size={20} />, label: "Overview" },
                { id: "pos", icon: <Monitor size={20} />, label: "POS" },
                { id: "orders", icon: <ShoppingBag size={20} />, label: "Orders" },
                { id: "users", icon: <Users size={20} />, label: "Users" },
                { id: "analytics", icon: <BarChart3 size={20} />, label: "Stats" },
                { id: "settings", icon: <Settings size={20} />, label: "Config" },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                        "flex items-center gap-3 md:gap-4 px-4 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all group whitespace-nowrap",
                        activeTab === item.id 
                            ? "bg-brand-orange text-white shadow-lg shadow-orange-500/20" 
                            : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                    )}
                >
                    {item.icon}
                    <span className="hidden lg:block xl:hidden min-[1400px]:block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </button>
            ))}
            <div className="xl:mt-auto pt-4 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="group flex items-center gap-3 md:gap-4 p-2 bg-gray-50 hover:bg-white rounded-[24px] transition-all shadow-sm hover:shadow-xl border border-transparent hover:border-gray-100 w-full"
                >
                    <div className="w-10 h-10 rounded-2xl bg-orange-100 border-2 border-white overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden lg:block xl:hidden min-[1400px]:block text-left overflow-hidden">
                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest truncate">Admin</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase truncate">Sign Out</p>
                    </div>
                    <LogOut size={14} className="hidden lg:block xl:hidden min-[1400px]:block ml-auto mr-2 text-gray-300 group-hover:text-brand-orange transition-colors" />
                </button>
            </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-8 hidden lg:block overflow-hidden relative shadow-xl shadow-gray-100/50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/50 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Critical Stock</h4>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black">
                    <span className="text-gray-900 uppercase">Milk Packets</span>
                    <span className="text-brand-orange">12% LEFT</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-brand-orange" />
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {activeTab === 'pos' ? (
            <div className="flex flex-col gap-8">
                {/* ... existing POS system view ... */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-black text-gray-900 leading-tight">POS<br /><span className="text-brand-orange">System.</span></h1>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Direct Terminal Ordering</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Items Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {["All", ...FOOD_CATEGORIES].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setPosCategory(cat)}
                                    className={cn(
                                        "px-4 py-2.5 sm:py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                                        posCategory === cat ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-100 text-gray-400 hover:text-gray-900"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {MENU_ITEMS.filter(item => posCategory === 'All' || item.category === posCategory).map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => addToPosCart(item)}
                                    className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 text-left hover:border-brand-orange/30 transition-all group shadow-sm hover:shadow-xl min-w-0"
                                >
                                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-all overflow-hidden border border-gray-100 shrink-0">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        </div>
                                        <Plus size={14} className="text-gray-200 group-hover:text-brand-orange" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 truncate">{item.category}</span>
                                        <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-1 truncate leading-tight">{item.name}</h4>
                                        <span className="text-brand-orange font-black text-[10px] sm:text-xs">₹{item.price}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cart Area */}
                    <div className="bg-white rounded-3xl sm:rounded-[40px] border border-gray-100 p-6 sm:p-8 shadow-2xl flex flex-col h-[500px] sm:h-[700px]">
                        <div className="flex items-center justify-between mb-6 sm:mb-8 shrink-0">
                            <h3 className="font-black text-gray-900 text-sm sm:text-base">Terminal Cart</h3>
                            <button onClick={() => setPosCart([])} className="text-[9px] sm:text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Clear</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2">
                            {posCart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mb-4">
                                        <ShoppingBag size={24} className="text-gray-200" />
                                    </div>
                                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest">Cart is empty</p>
                                </div>
                            ) : (
                                posCart.map(({item, quantity}) => (
                                    <div key={item.id} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-xs font-black text-gray-900">{item.name}</h5>
                                            <span className="text-[10px] font-black text-brand-orange">₹{item.price} x {quantity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updatePosQty(item.id, -1)} className="p-1 hover:bg-gray-50 rounded-lg text-gray-400"><Minus size={14} /></button>
                                            <span className="text-xs font-black text-gray-900 w-4 text-center">{quantity}</span>
                                            <button onClick={() => updatePosQty(item.id, 1)} className="p-1 hover:bg-gray-50 rounded-lg text-gray-400"><Plus size={14} /></button>
                                            <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-red-50 rounded-lg text-red-400 ml-2"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="space-y-4 pt-8 border-t border-gray-50">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input 
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    placeholder="Enter Student ID..." 
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-gray-900 focus:ring-2 ring-[#007AFF]/20" 
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Total Amount</span>
                                <span className="text-2xl font-display font-black text-gray-900">₹{posTotal}</span>
                            </div>

                            <button 
                                onClick={handlePlaceOrder}
                                disabled={posCart.length === 0}
                                className="w-full py-5 bg-[#007AFF] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                Confirm & Print Receipt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : activeTab === 'orders' ? (
            <div className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-black text-gray-900 leading-tight">Order<br /><span className="text-brand-orange">History.</span></h1>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Comprehensive Record of Sales</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input 
                                value={orderSearchQuery}
                                onChange={(e) => setOrderSearchQuery(e.target.value)}
                                className="bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm text-gray-900 font-bold focus:outline-none w-full shadow-sm" 
                                placeholder="Search by name or ID..." 
                            />
                        </div>
                        
                        <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
                            <div className="px-3 text-gray-300">
                                <Filter size={14} />
                            </div>
                            <div className="flex gap-1">
                                {['All', 'Completed', 'Processing', 'Cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setOrderStatusFilter(status)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            orderStatusFilter === status ? "bg-[#010816] text-white shadow-lg" : "text-gray-300 hover:text-gray-900"
                                        )}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    {[
                                        { label: 'Order ID', key: 'id' },
                                        { label: 'Student Name', key: 'studentName' },
                                        { label: 'Items', key: 'items' },
                                        { label: 'Total', key: 'total' },
                                        { label: 'Status', key: 'status' },
                                        { label: 'Date', key: 'date' },
                                    ].map((col) => (
                                        <th 
                                            key={col.key}
                                            onClick={() => handleSort(col.key)}
                                            className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-gray-900 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                {col.label}
                                                <ArrowUpDown size={12} className={cn(sortConfig?.key === col.key ? "text-[#007AFF]" : "text-gray-200")} />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6 font-black text-sm text-[#007AFF]">{order.id}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#007AFF]/5 flex items-center justify-center font-black text-[10px] text-[#007AFF] border border-[#007AFF]/10">
                                                        {order.studentName[0]}
                                                    </div>
                                                    <span className="text-sm font-black text-gray-900">{order.studentName}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-xs font-bold text-gray-400 max-w-[200px] truncate">{order.items}</td>
                                            <td className="px-8 py-6 text-sm font-black text-gray-900">₹{order.total}</td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider",
                                                    order.status === 'Completed' ? "bg-green-50 text-green-500" :
                                                    order.status === 'Processing' ? "bg-blue-50 text-blue-500" : "bg-red-50 text-[#E31E24]"
                                                )}>{order.status}</span>
                                            </td>
                                            <td className="px-8 py-6 text-xs font-bold text-gray-400">{order.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-gray-200">
                                                    <ShoppingBag size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">No orders found</p>
                                                    <p className="text-xs font-bold text-gray-400">Try adjusting your filters or search query</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <>
                {/* Existing Overview Content */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <Logo showText={false} className="scale-75" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <Logo className="hidden md:flex scale-125 origin-left" />
                                <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight">Admin</h1>
                            </div>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 px-2">Real-time Management Portal</p>
                        </div>
                    </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input className="bg-white border border-gray-100 rounded-2xl py-4 flex items-center justify-center pl-12 pr-6 text-sm text-gray-900 font-bold focus:outline-none w-full sm:w-80 shadow-sm" placeholder="Search orders, students..." />
                </div>
            </div>
        </div>        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[32px] border border-gray-50 group hover:border-[#E31E24]/30 transition-all shadow-xl shadow-gray-200/40"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
                        </div>
                        <span className={cn(
                            "text-[8px] sm:text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider",
                            stat.trend === "up" ? "bg-green-50 text-green-500" : "bg-red-50 text-[#E31E24]"
                        )}>{stat.change}</span>
                    </div>
                    <span className="block text-[8px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{stat.label}</span>
                    <span className="text-2xl sm:text-3xl font-display font-black text-gray-900">{stat.value}</span>
                </motion.div>
            ))}
        </div>

        {/* Charts & Orders */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                {/* Revenue Chart */}
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/40 min-h-[300px] sm:h-[400px]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                         <h3 className="font-black text-gray-900 flex items-center gap-2">
                             <TrendingUp size={18} className="text-[#007AFF]" />
                             Revenue Analytics
                         </h3>
                         <div className="flex gap-1 bg-gray-50 p-1 rounded-xl w-fit">
                             {['Day', 'Week', 'Month'].map(t => (
                                 <button key={t} className={cn(
                                     "text-[8px] sm:text-[10px] font-black px-3 sm:px-4 py-2 rounded-lg transition-all uppercase tracking-widest",
                                     t === 'Week' ? "bg-white text-gray-900 shadow-sm" : "text-gray-300 hover:text-gray-900"
                                 )}>{t}</button>
                             ))}
                         </div>
                    </div>
                    <div className="h-[200px] sm:h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                                <XAxis dataKey="name" stroke="#94A3B8" fontSize={8} axisLine={false} tickLine={false} fontWeight={900} />
                                <YAxis stroke="#94A3B8" fontSize={8} axisLine={false} tickLine={false} fontWeight={900} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#007AFF', fontWeight: 900, fontSize: '10px' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#007AFF" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white rounded-2xl sm:rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/40 overflow-hidden">
                    <div className="p-6 sm:p-8 pb-4 flex items-center justify-between">
                         <h3 className="font-black text-gray-900 text-sm sm:text-base">Real-time Orders</h3>
                         <button className="text-[9px] sm:text-[10px] font-black text-[#007AFF] uppercase tracking-widest hover:underline decoration-2">View All</button>
                    </div>
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest">Order ID</th>
                                    <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest">Student</th>
                                    <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest">Item</th>
                                    <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest">Status</th>
                                    <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    { id: '#9921', name: 'Ayush N.', item: 'Cheese Maggi', status: 'preparing' },
                                    { id: '#9920', name: 'Rohan S.', item: 'Masala Rice', status: 'pending' },
                                    { id: '#9919', name: 'Priya P.', item: 'Paneer Pulao', status: 'ready' },
                                ].map((order, i) => (
                                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 sm:px-8 py-4 sm:py-6 font-black text-xs sm:text-sm text-[#007AFF]">{order.id}</td>
                                        <td className="px-6 sm:px-8 py-4 sm:py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center font-black text-[9px] sm:text-[10px] text-[#007AFF] border border-blue-100 shrink-0">{order.name[0]}</div>
                                                <span className="text-xs sm:text-sm font-black text-gray-900 truncate max-w-[100px]">{order.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 sm:px-8 py-4 sm:py-6 text-xs font-bold text-gray-400 max-w-[120px] truncate">{order.item}</td>
                                        <td className="px-6 sm:px-8 py-4 sm:py-6">
                                            <span className={cn(
                                                "text-[8px] sm:text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider inline-block",
                                                order.status === 'preparing' ? "bg-blue-50 text-blue-500" :
                                                order.status === 'ready' ? "bg-green-50 text-green-500" : "bg-yellow-50 text-yellow-500"
                                            )}>{order.status}</span>
                                        </td>
                                        <td className="px-6 sm:px-8 py-4 sm:py-6">
                                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                                                <button 
                                                    onClick={() => alert(`Marked order ${order.id} as completed!`)}
                                                    className="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-colors"
                                                >
                                                    <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => alert(`Rejected order ${order.id}`)}
                                                    className="p-2 hover:bg-red-50 text-[#E31E24] rounded-lg transition-colors"
                                                >
                                                    <XCircle size={14} className="sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Mini Panels */}
            <div className="space-y-6 sm:space-y-8">
                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/40">
                    <h3 className="font-black text-gray-900 mb-6 sm:mb-8 flex items-center gap-2 text-sm sm:text-base">
                        <Clock size={16} className="text-orange-500 sm:w-5 sm:h-5" />
                        Peak Hours
                    </h3>
                    <div className="space-y-5 sm:space-y-6">
                        {[
                            { time: '12:00 PM', value: 85, color: 'bg-[#E31E24]' },
                            { time: '1:00 PM', value: 95, color: 'bg-[#E31E24]' },
                            { time: '9:00 AM', value: 65, color: 'bg-yellow-500' },
                            { time: '4:00 PM', value: 40, color: 'bg-green-500' },
                        ].map((peak, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[8px] sm:text-[10px] font-black">
                                    <span className="text-gray-300 uppercase">{peak.time}</span>
                                    <span className="text-gray-900">{peak.value}% LOAD</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${peak.value}%` }}
                                        className={cn("h-full rounded-full", peak.color)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#010816] p-6 sm:p-8 rounded-2xl sm:rounded-[40px] shadow-2xl relative overflow-hidden group">
                     <h3 className="font-black text-white mb-2 relative z-10 text-base sm:text-lg">AI Insights</h3>
                     <p className="text-gray-500 text-[10px] sm:text-xs mb-6 font-bold uppercase tracking-tight relative z-10">Trending meals today</p>
                     <div className="space-y-3 sm:space-y-4 relative z-10">
                         {[
                             { name: 'Samosa', count: 124, trend: '+18%' },
                             { name: 'Cold Coffee', count: 98, trend: '+5%' },
                             { name: 'Maggi', count: 85, trend: '+12%' },
                         ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5">
                                 <div className="min-w-0">
                                     <h5 className="text-xs sm:text-sm font-black text-white truncate">{item.name}</h5>
                                     <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-black">{item.count} Sold</span>
                                 </div>
                                 <span className="text-[9px] sm:text-[10px] font-black text-green-400 shrink-0 ml-2">{item.trend}</span>
                             </div>
                         ))}
                     </div>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                </div>
            </div>
        </div>
    </>
)}
</div>
    </div>
  );
};
