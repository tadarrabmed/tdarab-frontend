import "./Title.css";
import { motion } from "framer-motion";
export default function Title({
  title,
  text,
  span,
  line,
  herotitle,
  textcolor,
}) {
  return (
    <>
      <h2 className="title-text">
        {" "}
        {title}
        <span id="logo-span">{span}</span>
      </h2>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="herotitle"
      >
        {herotitle}
      </motion.h1>

      <div className={`${line}`}></div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`${textcolor}`}
      >
        {text}
      </motion.p>
    </>
  );
}
