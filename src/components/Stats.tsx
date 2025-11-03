import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Users, Shield, TrendingUp } from "lucide-react";
import { useRef } from "react";

const stats = [
  {
    icon: Shield,
    value: "2M+",
    label: "Prescriptions Validated",
    description: "Protecting millions of patients daily",
    color: "from-primary to-primary-glow",
  },
  {
    icon: Activity,
    value: "99.9%",
    label: "Accuracy Rate",
    description: "Industry-leading precision",
    color: "from-secondary to-primary",
  },
  {
    icon: Users,
    value: "500+",
    label: "Healthcare Partners",
    description: "Hospitals and pharmacies trust us",
    color: "from-accent to-secondary",
  },
  {
    icon: TrendingUp,
    value: "87%",
    label: "Error Reduction",
    description: "Fewer medication mistakes",
    color: "from-[hsl(var(--medical-safe))] to-primary",
  },
];

const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Healthcare Leaders
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Making a measurable impact on patient safety
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-8 text-center h-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-white/10 relative overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon with pulsing animation */}
                <motion.div
                  className="relative mx-auto mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto relative`}>
                    <stat.icon className="w-10 h-10 text-white" />
                    
                    {/* Glowing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.color} blur-xl opacity-50`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Value with counter animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-5xl font-bold mb-2 bg-gradient-to-br bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                  }}
                >
                  {stat.value}
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>

                {/* Bottom glow line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating heartbeat indicator */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-[hsl(var(--medical-safe))]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            System Active • Real-time Monitoring
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
