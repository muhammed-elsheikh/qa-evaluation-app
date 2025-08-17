// Mock data for the Salesforce Lightning-inspired dashboard

export const kpiData = [
  {
    id: 1,
    title: "Total Profit",
    value: "$142,420",
    delta: { value: "+12.5%", direction: "up" },
    icon: "DollarSign"
  },
  {
    id: 2,
    title: "Total Orders",
    value: "8,249",
    delta: { value: "+3.2%", direction: "up" },
    icon: "ShoppingCart"
  },
  {
    id: 3,
    title: "Impressions",
    value: "1.2M",
    delta: { value: "-2.1%", direction: "down" },
    icon: "Eye"
  },
  {
    id: 4,
    title: "Conversion Rate",
    value: "4.8%",
    delta: { value: "+1.3%", direction: "up" },
    icon: "TrendingUp"
  }
];

export const chartData = [
  { period: "Jan", profit: 45000, orders: 1200, impressions: 98000 },
  { period: "Feb", profit: 52000, orders: 1450, impressions: 105000 },
  { period: "Mar", profit: 48000, orders: 1380, impressions: 112000 },
  { period: "Apr", profit: 61000, orders: 1680, impressions: 108000 },
  { period: "May", profit: 55000, orders: 1520, impressions: 118000 },
  { period: "Jun", profit: 67000, orders: 1890, impressions: 125000 },
  { period: "Jul", profit: 71000, orders: 2100, impressions: 132000 },
  { period: "Aug", profit: 69000, orders: 1980, impressions: 128000 },
  { period: "Sep", profit: 74000, orders: 2200, impressions: 135000 },
  { period: "Oct", profit: 78000, orders: 2350, impressions: 142000 },
  { period: "Nov", profit: 82000, orders: 2480, impressions: 148000 },
  { period: "Dec", profit: 85000, orders: 2650, impressions: 155000 }
];

export const donutData = {
  label: "Sales Goal",
  current: 78420,
  target: 100000,
  percent: 78,
  subtext: "Q4 2024 Progress"
};

export const topItemsData = [
  {
    id: 1,
    name: "Premium Subscription",
    meta: "Sold: 1,245",
    delta: { value: "+15%", direction: "up" },
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Basic Plan",
    meta: "Sold: 892",
    delta: { value: "+8%", direction: "up" },
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Enterprise License",
    meta: "Sold: 156",
    delta: { value: "-3%", direction: "down" },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Addon Package",
    meta: "Sold: 324",
    delta: { value: "+22%", direction: "up" },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Training Module",
    meta: "Sold: 78",
    delta: { value: "+5%", direction: "up" },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face"
  }
];

export const sidebarNavigation = [
  {
    group: "Main",
    items: [
      { id: "dashboard-ecommerce", label: "Dashboard › Ecommerce", icon: "BarChart3", active: true, path: "/dashboard" },
      { id: "project", label: "Project", icon: "FolderOpen", active: false, path: "/project" },
      { id: "marketing", label: "Marketing", icon: "Megaphone", active: false, path: "/marketing" },
      { id: "analytics", label: "Analytics", icon: "LineChart", active: false, path: "/analytics" }
    ]
  },
  {
    group: "Concepts",
    items: [
      { id: "ai", label: "AI", icon: "Brain", active: false, path: "/ai" },
      { id: "projects", label: "Projects", icon: "Briefcase", active: false, path: "/projects" },
      { id: "customers", label: "Customers", icon: "Users", active: false, path: "/customers" },
      { id: "products", label: "Products", icon: "Package", active: false, path: "/products" }
    ]
  },
  {
    group: "Operations",
    items: [
      { id: "orders", label: "Orders", icon: "ShoppingBag", active: false, path: "/orders" },
      { id: "account", label: "Account", icon: "User", active: false, path: "/account" },
      { id: "help", label: "Help Center", icon: "HelpCircle", active: false, path: "/help" }
    ]
  },
  {
    group: "Tools",
    items: [
      { id: "calendar", label: "Calendar", icon: "Calendar", active: false, path: "/calendar" },
      { id: "files", label: "Files", icon: "FileText", active: false, path: "/files" },
      { id: "mail", label: "Mail", icon: "Mail", active: false, path: "/mail" }
    ]
  }
];

export const timeframeOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" }
];

export const userProfile = {
  name: "John Smith",
  email: "john.smith@company.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  role: "Admin"
};

// Loading states for components
export const loadingStates = {
  kpi: Array(4).fill(null).map((_, i) => ({
    id: i + 1,
    title: "",
    value: "",
    delta: { value: "", direction: "up" },
    icon: "Loader"
  })),
  
  chart: [],
  
  items: Array(5).fill(null).map((_, i) => ({
    id: i + 1,
    name: "",
    meta: "",
    delta: { value: "", direction: "up" },
    avatar: ""
  }))
};
