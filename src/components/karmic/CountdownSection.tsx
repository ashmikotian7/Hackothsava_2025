import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds =
    timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const isUrgent = totalSeconds < 3600; // Less than 1 hour
  const isWarning = totalSeconds < 7200; // Less than 2 hours

  const getColor = () => {
    if (isUrgent) return "from-red-500 to-orange-500";
    if (isWarning) return "from-orange-500 to-yellow-500";
    return "from-green-500 to-teal-500";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-mint/20 to-peach/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-rounded bg-white p-12 text-center relative overflow-hidden"
        >
          {/* Orbiting food icons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-30"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 150],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 150],
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              {["🍕", "🍔", "🍜", "🍰", "🥗", "🍱"][i]}
            </motion.div>
          ))}

          <motion.div
            animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Clock
              className={`w-16 h-16 mx-auto mb-6 ${
                isUrgent ? "text-red-500" : isWarning ? "text-orange-500" : "text-primary"
              }`}
            />
          </motion.div>

          <h2
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Confirm Before 9:00 PM! ⏰
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Help us plan better and reduce waste by confirming your meals on time
          </p>

          {/* Countdown timer */}
          <div className="flex justify-center gap-6 mb-8">
            {[
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getColor()} flex items-center justify-center shadow-lg`}
                >
                  <motion.span
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-white"
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.span>
                </div>
                <div className="text-sm font-medium text-muted-foreground mt-2">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Warning message */}
          {isUrgent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-red-600 font-semibold"
            >
              <AlertCircle className="w-5 h-5 animate-bounce-soft" />
              <span>Hurry! Less than 1 hour left!</span>
            </motion.div>
          )}

          {/* Progress bar */}
          <div className="mt-8 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getColor()}`}
              initial={{ width: "100%" }}
              animate={{
                width: `${(totalSeconds / (9 * 3600)) * 100}%`,
              }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
