import { motion, useScroll, useTransform } from "framer-motion";
import { Scan, FileSearch, AlertTriangle, CheckCircle2, Brain, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Scan,
    title: "OCR Scanning",
    description: "Advanced optical character recognition instantly digitizes handwritten and printed prescriptions with 99.9% accuracy.",
    color: "from-primary to-primary-glow",
    delay: 0,
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Deep learning algorithms analyze drug interactions, contraindications, and patient history in real-time.",
    color: "from-secondary to-primary",
    delay: 0.1,
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    description: "Identifies potential medication errors, allergies, and dangerous drug combinations before dispensing.",
    color: "from-accent to-destructive",
    delay: 0.2,
  },
  {
    icon: FileSearch,
    title: "Compliance Check",
    description: "Ensures prescriptions meet regulatory standards and detects fraudulent or altered documents.",
    color: "from-secondary to-accent",
    delay: 0.3,
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Sub-second processing time delivers validation results without workflow disruption.",
    color: "from-primary to-secondary",
    delay: 0.4,
  },
  {
    icon: CheckCircle2,
    title: "Safe Dispensing",
    description: "Verified prescriptions receive a digital safety seal for confident medication dispensing.",
    color: "from-[hsl(var(--medical-safe))] to-primary",
    delay: 0.5,
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Comprehensive Protection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            How It{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Protects
            </span>{" "}
            Patients
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Our multi-layered validation system catches errors that could harm
            patients, giving healthcare providers confidence and peace of mind.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Glass card */}
              <div className="glass rounded-2xl p-8 h-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-white/10 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                  
                  {/* Glowing effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to make prescriptions safer?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Request a Demo
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
