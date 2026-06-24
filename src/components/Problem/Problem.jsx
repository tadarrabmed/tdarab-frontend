import "./Problem.css";
import { motion } from "framer-motion";
export default function Problem() {
  const problems = [
    "تقرأ كثير لكن تنسى بسرعة",
    "لا تعرف كيف تراجع بشكل صحيح",
    "تضيع وقتك بدون نتيجة حقيقية",
  ];

  return (
    <section className="problem fade-in">
      <h2>هل هذا يحدث معك؟</h2>

      <div className="cards">
        {problems.map((p, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            key={i}
            className="card"
          >
            {p}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
