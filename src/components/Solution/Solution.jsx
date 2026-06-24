import "./Solution.css";
import { motion } from "framer-motion";
export default function Solution() {
  const items = [
    "تعلم عبر الأسئلة التفاعلية",
    "مراجعة سريعة وذكية",
    "تركيز على الامتحانات الفعلية",
  ];

  return (
    <section className="solution fade-in">
      <h2>الحل مع تدرب</h2>

      <div className="cards">
        {items.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            key={i}
            className="card"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
