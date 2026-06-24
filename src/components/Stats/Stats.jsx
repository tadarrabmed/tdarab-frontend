import "./Stats.css";
import { motion } from "framer-motion";
export default function Stats() {
  const stats = [
    { number: "10,000+", label: "سؤال" },
    { number: "2,000+", label: "طالب" },
    { number: "92%", label: "تحسن" },
  ];

  return (
    <section className="stats fade-in">
      {stats.map((s, i) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          key={i}
          className="stat"
        >
          <h3>{s.number}</h3>
          <p>{s.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
