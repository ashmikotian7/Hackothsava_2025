import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-peach/20 to-mint/20">
      <div className="relative">
        {/* Spinning plate */}
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {/* Plate base */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-muted shadow-[0_8px_30px_rgba(15,191,168,0.2)]" />
          
          {/* Plate rim */}
          <div className="absolute inset-2 rounded-full border-4 border-primary/20" />
          
          {/* Food items on plate */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🍱
          </motion.div>
        </motion.div>

        {/* Bouncing chef hat */}
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          👨‍🍳
        </motion.div>

        {/* Floating food icons */}
        {[
          { icon: "🥗", angle: 0, delay: 0 },
          { icon: "🍜", angle: 120, delay: 0.3 },
          { icon: "🧃", angle: 240, delay: 0.6 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
            animate={{
              x: [0, 70 * Math.cos((item.angle * Math.PI) / 180)],
              y: [0, 70 * Math.sin((item.angle * Math.PI) / 180)],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Sparkle effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-40 h-40 rounded-full bg-primary/10" />
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-1/3 text-foreground/70 font-['Nunito_Sans'] font-semibold text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Preparing your meals...
      </motion.p>
    </div>
  );
};

export default Loader;
