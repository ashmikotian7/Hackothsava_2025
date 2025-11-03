import { motion } from "framer-motion";
import { ChefHat, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-peach/30 to-mint/40">
      {/* Floating food icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {["🍅", "🥄", "🍃", "🥕", "🌽", "🥗", "🍞", "🥤"][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border-2 border-primary/30 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
              <span className="text-sm font-semibold text-primary">
                Smart Canteen Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Smart Meals, Zero Waste,{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Big Smiles 💚
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-primary/20 shadow-lg"
            >
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: "Nunito Sans, sans-serif" }}
              >
                Hi! I'm <strong className="text-primary">Karmi 👨‍🍳</strong> — your
                friendly canteen chef. Let's make sure no food goes to waste!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-2xl px-8">
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-2xl px-8">
                <Link to="/signup">Create account</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Mascot Chef "Karmi" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] hidden lg:flex items-center justify-center"
          >
            {/* Main chef character */}
            <motion.div
              className="relative w-80 h-80"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Chef body - rounded cute shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-80 bg-gradient-to-b from-white to-gray-50 rounded-full shadow-2xl relative overflow-hidden border-4 border-primary/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Apron */}
                  <div className="absolute inset-x-0 top-20 h-48 bg-gradient-to-b from-primary to-primary-glow rounded-t-[100px]" />
                  
                  {/* Chef hat */}
                  <motion.div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-primary/30"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChefHat className="w-16 h-16 text-primary" />
                  </motion.div>

                  {/* Face elements */}
                  <div className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    {/* Eyes */}
                    <div className="flex gap-8">
                      <motion.div
                        className="w-4 h-4 bg-foreground rounded-full"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <motion.div
                        className="w-4 h-4 bg-foreground rounded-full"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                    {/* Smile */}
                    <div className="w-16 h-8 border-b-4 border-primary rounded-full" />
                  </div>

                  {/* Tablet in hand */}
                  <motion.div
                    className="absolute bottom-8 right-4 w-24 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl flex items-center justify-center border-2 border-gray-700"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                  
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 text-yellow-400"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="text-muted-foreground text-sm font-medium">Scroll to explore</div>
      </motion.div>
    </section>
  );
};

export default Hero;
