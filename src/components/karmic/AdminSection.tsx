import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MenuItem {
  id: number | string;
  name: string;
  price: number;
  session?: string;
  day?: string;
}

interface MealSection {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  snacks: MenuItem[];
}

interface WeeklyMenu {
  [key: string]: MealSection;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MEAL_TIMES = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅", session: "morning" },
  { key: "lunch", label: "Lunch", emoji: "☀️", session: "afternoon" },
  { key: "snacks", label: "Snacks", emoji: "🌇", session: "evening" },
];

const safeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

export default function AdminDashboard() {
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>({});
  const [loading, setLoading] = useState(true);
  const [chefReaction, setChefReaction] = useState("👨‍🍳");
  const [showSparkle, setShowSparkle] = useState(false);

  // Fetch menu from backend
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/dashboard/list/");
      const data = await res.json();

      if (Array.isArray(data)) {
        const structured: WeeklyMenu = DAYS.reduce((acc, day) => {
          acc[day] = { breakfast: [], lunch: [], snacks: [] };
          return acc;
        }, {} as WeeklyMenu);

        data.forEach((item) => {
          const mealKey =
            item.session === "morning"
              ? "breakfast"
              : item.session === "afternoon"
              ? "lunch"
              : "snacks";

          if (structured[item.day]) {
            structured[item.day][mealKey].push({
              id: item.id,
              name: item.name,
              price: parseFloat(item.price),
              day: item.day,
              session: item.session,
            });
          }
        });

        setWeeklyMenu(structured);
      } else {
        setWeeklyMenu({});
      }
    } catch (err) {
      console.error("Fetch menu error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Celebrate small action
  const celebrateAction = (emoji: string) => {
    setShowSparkle(true);
    setChefReaction(emoji);
    setTimeout(() => {
      setShowSparkle(false);
      setChefReaction("👨‍🍳");
    }, 1200);
  };

  // Add item → POST
  const addItem = async (day: string, mealType: string) => {
    const meal = MEAL_TIMES.find((m) => m.key === mealType);
    if (!meal) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/dashboard/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          session: meal.session,
          name: "New Item",
          price: "0.00",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        await fetchMenu(); // refresh menu
        celebrateAction("✨");
      } else {
        console.error("Add item failed:", data);
      }
    } catch (err) {
      console.error("Add item error:", err);
    }
  };

  // Delete item → DELETE
  const deleteItem = async (itemId: number | string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/dashboard/delete/${itemId}/`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        await fetchMenu();
        celebrateAction("🗑️");
      } else {
        console.error("Delete failed:", data);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update item → PUT
  const updateItem = async (
    day: string,
    mealType: string,
    item: MenuItem,
    field: "name" | "price",
    value: string | number
  ) => {
    const meal = MEAL_TIMES.find((m) => m.key === mealType);
    if (!meal) return;

    const updatedItem = { ...item, [field]: value };

    setWeeklyMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType as keyof MealSection].map((i) =>
          i.id === item.id ? { ...i, [field]: value } : i
        ),
      },
    }));

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/dashboard/edit/${item.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: field === "name" ? value : item.name,
            price: field === "price" ? Number(value) : item.price,
            session: meal.session,
            day,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) console.error("Update failed:", data);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

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
        <p className="text-muted-foreground text-lg">
          Plan your weekly menu • Karmic Canteen 🍽️
        </p>
      </motion.div>

      {/* Menu */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading menu...</p>
      ) : (
        <div className="overflow-x-auto pb-4 snap-x snap-mandatory">
          <div className="flex gap-6 px-4 min-w-max">
            {DAYS.map((day, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="snap-center"
              >
                <Card className="w-[340px] sm:w-[380px] bg-card border shadow hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary rounded-t-xl">
                    <CardTitle className="text-primary-foreground text-center text-2xl">
                      {day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {MEAL_TIMES.map((meal) => (
                      <div key={meal.key} className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{meal.emoji}</span>
                          <div>
                            <h3 className="font-semibold">{meal.label}</h3>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <AnimatePresence mode="popLayout">
                            {weeklyMenu[day]?.[meal.key]?.map((item) => (
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
                                  onChange={(e) =>
                                    updateItem(day, meal.key, item, "name", e.target.value)
                                  }
                                  className="flex-1 border-0 bg-transparent text-sm focus-visible:ring-1"
                                />
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-muted-foreground">₹</span>
                                  <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) =>
                                      updateItem(day, meal.key, item, "price", Number(e.target.value))
                                    }
                                    className="w-20 border-0 bg-transparent text-sm focus-visible:ring-1"
                                  />
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => deleteItem(item.id)}
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
                            <Plus className="h-4 w-4 mr-2" /> Add Item
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
      )}
    </div>
  );
}
