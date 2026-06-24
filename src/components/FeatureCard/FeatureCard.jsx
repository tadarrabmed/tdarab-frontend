import React from "react";
import "./FeatureCard.css";
import { motion } from "framer-motion";
export default function FeatureCard({ img, text }) {
  return (
    <motion.div
      className="feature"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <span>{img}</span>
      <p>{text}</p>
    </motion.div>
  );
}
