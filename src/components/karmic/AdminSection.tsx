import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface MealSection {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  snacks: MenuItem[];
}

interface WeeklyMenu {
  [key: string]: MealSection;
}

interface EmployeeOrder {
  itemName: string;
  count: number;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MEAL_TIMES = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅", time: "Morning" },
  { key: "lunch", label: "Lunch", emoji: "☀️", time: "Afternoon" },
  { key: "snacks", label: "Snacks", emoji: "🌇", time: "Evening" },
];

const safeId = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10));

const initialMenu: WeeklyMenu = DAYS.reduce((acc, day) => {
  acc[day] = {
    breakfast: [{ id: safeId(), name: "Idli Sambar", price: 40 }],
    lunch: [{ id: safeId(), name: "Paneer Butter Masala", price: 120 }],
    snacks: [{ id: safeId(), name: "Samosa", price: 25 }],
  };
  return acc;
}, {} as WeeklyMenu);

export default function DashboardSection() {
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>(initialMenu);
  const [showSparkle, setShowSparkle] = useState(false);
  const [chefReaction, setChefReaction] = useState("👨‍🍳");
  const [employeeOrders, setEmployeeOrders] = useState<EmployeeOrder[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedMenu = localStorage.getItem("weeklyMenu");
    if (savedMenu) {
      try { setWeeklyMenu(JSON.parse(savedMenu)); } catch {}
    }

    // Load employee orders summary
    const savedOrders = localStorage.getItem("employeeOrders");
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        const summary = aggregateOrders(orders);
        setEmployeeOrders(summary);
      } catch {}
    }
  }, []);

  // Save to localStorage whenever menu changes
  useEffect(() => {
    localStorage.setItem("weeklyMenu", JSON.stringify(weeklyMenu));
  }, [weeklyMenu]);

  const aggregateOrders = (orders: any[]): EmployeeOrder[] => {
    const getCutoff = (forDateStr: string) => {
      const target = new Date(forDateStr);
      if (isNaN(target.getTime())) return null;
      const cutoff = new Date(target);
      cutoff.setDate(target.getDate() - 1);
      cutoff.setHours(21, 0, 0, 0); // 9 PM local time previous day
      return cutoff;
    };

    const counts: { [key: string]: number } = {};
    for (const order of orders || []) {
      const itemName = order?.itemName || order?.item;
      if (!itemName) continue;

      const forDateStr: string | undefined = order?.forDate || order?.date;
      const canceled: boolean = Boolean(order?.canceled) || order?.status === "canceled";
      const canceledAtStr: string | undefined = order?.canceledAt || order?.updatedAt;

      // If cancelled and cancellation happened before or at the cutoff, skip counting it
      if (canceled && forDateStr && canceledAtStr) {
        const cutoff = getCutoff(forDateStr);
        const canceledAt = new Date(canceledAtStr);
        if (cutoff && !isNaN(canceledAt.getTime()) && canceledAt <= cutoff) {
          continue;
        }
      }

      const qty = Number(order?.qty);
      counts[itemName] = (counts[itemName] || 0) + (Number.isFinite(qty) && qty > 0 ? qty : 1);
    }

    return Object.entries(counts).map(([itemName, count]) => ({ itemName, count }));
  };

  const addItem = (day: string, mealType: string) => {
    setWeeklyMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: [
          ...prev[day][mealType as keyof MealSection],
          { id: safeId(), name: "New Item", price: 0 },
        ],
      },
    }));
    celebrateAction("✨");
  };

  const deleteItem = (day: string, mealType: string, itemId: string) => {
    setWeeklyMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType as keyof MealSection].filter((item) => item.id !== itemId),
      },
    }));
    celebrateAction("🗑️");
  };

  const updateItem = (
    day: string,
    mealType: string,
    itemId: string,
    field: "name" | "price",
    value: string | number
  ) => {
    setWeeklyMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType as keyof MealSection].map((item) =>
          item.id === itemId ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const celebrateAction = (emoji: string) => {
    setShowSparkle(true);
    setChefReaction(emoji);
    setTimeout(() => {
      setShowSparkle(false);
      setChefReaction("👨‍🍳");
    }, 1500);
  };

  // insights removed

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 sm:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2 relative">
          <motion.span
            className="text-6xl"
            animate={{
              scale: showSparkle ? [1, 1.3, 1] : 1,
              rotate: showSparkle ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {chefReaction}
          </motion.span>
          <AnimatePresence>
            {showSparkle && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute text-4xl"
              >
                ✨
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
          Chef Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">Plan your weekly menu with joy • Karmic Canteen 🍽️</p>
      </motion.div>

      {/* Weekly Insights removed */}

      {/* Weekly Menu Carousel */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Weekly Menu</h2>
        <div className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-6 px-4 min-w-max">
            {DAYS.map((day, dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayIndex * 0.1 }}
                className="snap-center"
              >
                <Card className="w-[340px] sm:w-[380px] bg-card border border-border shadow hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-primary rounded-t-xl">
                    <CardTitle className="text-primary-foreground text-center text-2xl">{day}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {MEAL_TIMES.map((meal) => (
                      <div key={meal.key} className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{meal.emoji}</span>
                          <div>
                            <h3 className="font-semibold text-foreground">{meal.label}</h3>
                            <p className="text-xs text-muted-foreground">{meal.time}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <AnimatePresence mode="popLayout">
                            {weeklyMenu[day][meal.key as keyof MealSection].map((item) => (
                              <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2 bg-secondary/30 rounded-lg p-2"
                              >
                                <Input
                                  value={item.name}
                                  onChange={(e) => updateItem(day, meal.key, item.id, "name", e.target.value)}
                                  className="flex-1 border-0 bg-transparent text-sm focus-visible:ring-1"
                                  placeholder="Item name"
                                />
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-muted-foreground">₹</span>
                                  <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => updateItem(day, meal.key, item.id, "price", Number(e.target.value))}
                                    className="w-20 border-0 bg-transparent text-sm focus-visible:ring-1"
                                    placeholder="0"
                                  />
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => deleteItem(day, meal.key, item.id)}
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addItem(day, meal.key)}
                            className="w-full border-dashed hover:bg-primary/10 hover:border-primary"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Orders Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-card border border-border shadow">
          <CardHeader className="bg-secondary rounded-t-xl">
            <CardTitle className="text-secondary-foreground text-center flex items-center justify-center gap-2">
              <Save className="h-6 w-6" />
              Employee Orders Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {employeeOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No orders yet. Orders will appear here once employees start ordering! 📝
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {employeeOrders.map((order, index) => (
                  <motion.div
                    key={order.itemName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-secondary/30 rounded-lg p-4 flex items-center justify-between"
                  >
                    <span className="font-medium text-foreground">{order.itemName}</span>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      {order.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
