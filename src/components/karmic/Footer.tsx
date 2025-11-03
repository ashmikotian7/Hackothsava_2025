import { motion } from "framer-motion";
import { Github, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-t-2 border-primary/10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo animation */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            👨‍🍳
          </motion.div>

          {/* Brand name */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Karmic Canteen
          </motion.h3>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground text-center max-w-md">
            Smart meals, zero waste, and a sustainable future for everyone
          </p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {[
              { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
              { icon: Github, href: "#", color: "hover:text-gray-900" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -5 }}
                className={`w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-primary transition-colors ${social.color}`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </motion.div>
            <span>by Team Karmic</span>
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 Karmic Canteen. All rights reserved.
          </p>

          {/* Floating food animation */}
          <motion.div
            className="text-4xl opacity-50"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
