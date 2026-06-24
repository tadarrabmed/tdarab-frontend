import React from "react";
import "./PlanSection.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import api from "../../api/axios";
import { motion } from "framer-motion";
export default function PlanSection() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api
      .get("/plans")
      .then((res) => setPlans(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="plans-section ">
      <h2 className="plans-title">💎 الخطط المتاحة</h2>

      <div className="plans-grid flex-center">
        {plans.map((plan) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            key={plan.id}
            className={`plan-card  ${plan.level === 4 ? "featured" : ""}`}
          >
            {plan.level === 4 && <span className="plan-badge">الأفضل</span>}

            <h3 className="plan-name">{plan.name}</h3>

            <p className="plan-price">
              {plan.price} {plan.currency}
            </p>

            <p className="plan-level">المستوى: {plan.level}</p>
          </motion.div>
        ))}
      </div>

      <div className="plans-section-footer">
        <Link to="/plans">
          <Button text="عرض تفاصيل الخطط" classn="login-btn" />
        </Link>
      </div>
    </div>
  );
}
