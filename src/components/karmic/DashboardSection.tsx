import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, CheckCircle2, Clock, Plus, Minus, AlertCircle } from "lucide-react";

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

interface EmployeeChoice {
  forDate: string;
  mealType: string;
  itemId: string;
  itemName: string;
  time: string;
  qty: number;
}

export default function EmployeeDashboardSection() {
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>({});
  const [hasMealTomorrow, setHasMealTomorrow] = useState<boolean | null>(null);
  const [choices, setChoices] = useState<EmployeeChoice[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [remainingSecIST, setRemainingSecIST] = useState<number>(0);

  // Load chef's menu and user's choices
  useEffect(() => {
    const savedMenu = localStorage.getItem("weeklyMenu");
    const savedChoices = localStorage.getItem("employeeOrders");
    if (savedMenu) setWeeklyMenu(JSON.parse(savedMenu));
    if (savedChoices) setChoices(JSON.parse(savedChoices));
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "weeklyMenu" && e.newValue) {
        try { setWeeklyMenu(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === "employeeOrders" && e.newValue) {
        try { setChoices(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-GB");
  const dayKey = tomorrow.toLocaleDateString("en-US", { weekday: "long" });

  const cutoffTime = new Date();
  cutoffTime.setHours(21, 0, 0, 0); // 9 PM cutoff today

  const isAfterCutoff = new Date() > cutoffTime;

  // Save choices
  useEffect(() => {
    localStorage.setItem("employeeOrders", JSON.stringify(choices));
  }, [choices]);

  useEffect(() => {
    const toISTMs = (d: Date) => d.getTime() + d.getTimezoneOffset() * 60000 + (5 * 60 + 30) * 60000;
    const tick = () => {
      const now = new Date();
      const nowIST = new Date(toISTMs(now));
      const cutoffIST = new Date(nowIST);
      cutoffIST.setHours(21, 0, 0, 0);
      const diffMs = cutoffIST.getTime() - nowIST.getTime();
      setRemainingSecIST(Math.max(0, Math.floor(diffMs / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleMealDecision = (value: string) => {
    setHasMealTomorrow(value === "yes");
  };

  const handleAdjustQty = (mealType: string, itemId: string, itemName: string, delta: number) => {
    if (isAfterCutoff) return alert("⏰ Sorry! The cutoff time (9 PM) for tomorrow has passed.");
    setChoices((prev) => {
      const idx = prev.findIndex(
        (c) => c.forDate === tomorrowStr && c.mealType === mealType && c.itemId === itemId
      );
      const next = [...prev];
      if (idx === -1 && delta > 0) {
        next.push({ forDate: tomorrowStr, mealType, itemId, itemName, qty: delta, time: new Date().toISOString() });
      } else if (idx >= 0) {
        const newQty = (next[idx].qty || 0) + delta;
        if (newQty <= 0) {
          next.splice(idx, 1);
        } else {
          next[idx] = { ...next[idx], qty: newQty, time: new Date().toISOString() };
        }
      }
      return next;
    });
  };

  const deleteChoice = (mealType: string, itemId?: string) => {
    if (isAfterCutoff) return alert("⏰ You cannot delete choices after 9 PM.");
    setChoices((prev) =>
      prev.filter((c) => {
        if (c.forDate !== tomorrowStr) return true;
        if (c.mealType !== mealType) return true;
        if (itemId) return c.itemId !== itemId;
        return false;
      })
    );
  };

  const getChoicesForMeal = (mealType: string) =>
    choices.filter((c) => c.mealType === mealType && c.forDate === tomorrowStr);

  const getItemPrice = (mealType: string, itemId: string): number => {
    const items = (weeklyMenu[dayKey]?.[mealType as keyof MealSection] || []) as MenuItem[];
    const it = items.find((x) => x.id === itemId);
    return it ? Number(it.price) || 0 : 0;
  };

  const overallTotal = ["breakfast", "lunch", "snacks"].reduce((sum, mealType) => {
    const sel = getChoicesForMeal(mealType);
    return (
      sum +
      sel.reduce((s, c) => s + (Number(c.qty) || 0) * getItemPrice(mealType, c.itemId), 0)
    );
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-6 sm:p-10 pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
          Employee Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan your meals for <b>{tomorrow.toLocaleDateString("en-GB")}</b> 🍱
        </p>
        <div className="mt-2 text-sm flex justify-center items-center gap-2">
          <span className={`px-3 py-1 rounded-full border ${remainingSecIST === 0 ? "border-red-500 text-red-600" : remainingSecIST < 3600 ? "border-orange-500 text-orange-600" : "border-primary text-primary"}`}>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {remainingSecIST > 0 ? (
                <>
                  Time left to confirm (IST):
                  <b>
                    {String(Math.floor(remainingSecIST / 3600)).padStart(2, "0")}:
                    {String(Math.floor((remainingSecIST % 3600) / 60)).padStart(2, "0")}:
                    {String(remainingSecIST % 60).padStart(2, "0")}
                  </b>
                </>
              ) : (
                <b>Cutoff passed for today (IST)</b>
              )}
            </span>
          </span>
        </div>

        {/* Countdown blocks and progress */}
        <div className="mt-4">
          <div className="flex justify-center gap-4 mb-3">
            {[
              { label: "Hours", value: Math.floor(remainingSecIST / 3600) },
              { label: "Minutes", value: Math.floor((remainingSecIST % 3600) / 60) },
              { label: "Seconds", value: remainingSecIST % 60 },
            ].map((u, i) => (
              <motion.div key={u.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="text-center">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${remainingSecIST === 0 ? "from-red-500 to-orange-500" : remainingSecIST < 3600 ? "from-orange-500 to-yellow-500" : "from-primary to-primary/70"} flex items-center justify-center shadow`}>
                  <span className="text-3xl font-bold text-white">
                    {String(u.value).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">{u.label}</div>
              </motion.div>
            ))}
          </div>
          {remainingSecIST > 0 && remainingSecIST < 3600 && (
            <div className="flex items-center justify-center gap-2 text-orange-600 font-medium">
              <AlertCircle className="h-4 w-4" />
              <span>Hurry! Less than 1 hour left</span>
            </div>
          )}
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden max-w-xl mx-auto">
            <motion.div
              className={`h-full bg-gradient-to-r ${remainingSecIST === 0 ? "from-red-500 to-orange-500" : remainingSecIST < 3600 ? "from-orange-500 to-yellow-500" : "from-primary to-primary/70"}`}
              initial={{ width: "100%" }}
              animate={{ width: `${Math.min(100, Math.max(0, (remainingSecIST / (9 * 3600)) * 100))}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Step 1: Ask if employee will eat from canteen */}
      {hasMealTomorrow === null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-medium mb-4">Will you get your meal from the canteen tomorrow?</p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleMealDecision("yes")} className="bg-primary hover:bg-primary/90">
              Yes
            </Button>
            <Button onClick={() => handleMealDecision("no")} variant="outline">
              No
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Menu Selection */}
      {hasMealTomorrow && (
        <div className="mt-10 max-w-6xl mx-auto">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4">
            {["breakfast", "lunch", "snacks"].map((mealType) => {
              const selected = getChoicesForMeal(mealType);
              const items = (weeklyMenu[dayKey]?.[mealType as keyof MealSection] || []) as MenuItem[];
              return (
                <motion.div key={mealType} className="min-w-[340px] sm:min-w-[420px] snap-center">
                  <Card className="border border-border shadow bg-card">
                    <CardHeader className="bg-primary/10 rounded-t-xl">
                      <CardTitle className="capitalize flex justify-between items-center">
                        {mealType === "breakfast" ? "🌅 Breakfast" : mealType === "lunch" ? "☀️ Lunch" : "🌇 Snacks"}
                        {selected.length > 0 && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {selected.reduce((s, c) => s + (c.qty || 0), 0)}
                          </motion.span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      {items.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Menu not set by chef for this meal.</p>
                      ) : (
                        <div className="space-y-3">
                          {items.map((it) => {
                            const cur = selected.find((c) => c.itemId === it.id);
                            const qty = cur?.qty || 0;
                            return (
                              <motion.div key={it.id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/20 px-3 py-2">
                                <div>
                                  <div className="font-medium text-foreground">{it.name}</div>
                                  <div className="text-xs text-muted-foreground">₹{it.price}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="icon" className="h-10 w-10 md:h-8 md:w-8" onClick={() => handleAdjustQty(mealType, it.id, it.name, -1)} disabled={qty === 0 || isAfterCutoff}>
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <div className="w-8 text-center font-semibold">{qty}</div>
                                  <Button variant="outline" size="icon" className="h-10 w-10 md:h-8 md:w-8" onClick={() => handleAdjustQty(mealType, it.id, it.name, 1)} disabled={isAfterCutoff}>
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* If said No */}
      {hasMealTomorrow === false && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-12"
        >
          You’ve opted out for tomorrow’s meal 🍃  
          You can change your mind anytime before <b>9 PM</b>.
        </motion.p>
      )}
      {hasMealTomorrow && (
        (() => {
          const all = ["breakfast", "lunch", "snacks"].flatMap((m) =>
            getChoicesForMeal(m).map((c) => ({ ...c, price: getItemPrice(m, c.itemId), meal: m }))
          );
          const merged: Record<string, { name: string; qty: number; price: number; meal: string }> = {};
          for (const x of all) {
            const key = `${x.meal}-${x.itemId}`;
            if (!merged[key]) merged[key] = { name: x.itemName, qty: 0, price: x.price, meal: x.meal };
            merged[key].qty += Number(x.qty) || 0;
          }
          const list = Object.entries(merged);
          return (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl mt-8">
              <Card className="border border-border bg-card shadow">
                <CardHeader className="bg-primary/10 rounded-t-xl">
                  <CardTitle className="text-foreground flex items-center justify-between">
                    Your Selection for {tomorrow.toLocaleDateString("en-GB")} 
                    <span className="text-lg font-bold">₹{overallTotal}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {list.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No items selected yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {list.map(([key, v]) => (
                        <div key={key} className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2">
                          <div className="text-sm">
                            <span className="font-medium text-foreground">{(v.meal as string).toLowerCase()}:</span>{' '}
                            <span className="text-foreground">{v.name}</span>{' '}
                            <span className="text-muted-foreground">× {v.qty}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteChoice(v.meal as string, key.split("-").slice(1).join("-"))}
                              disabled={isAfterCutoff}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })()
      )}
    </div>
  );
}
