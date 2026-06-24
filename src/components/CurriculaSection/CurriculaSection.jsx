import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./CurriculaSection.css";
import CurriculaCard from "../CurriculsCard/CurriculaCard";
import Title from "../Title/Title";
import { useAuth } from "../../context/AuthProvider";
import Button from "../Button/Button";
import { useActivatePlan } from "../../context/UseActivatePlan";
import ActivateModal from "../ActivateModal/ActivateModal";
import { Link } from "react-router-dom";
const CurriculaSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const { showModal, code, setCode, loading: activateLoading, openModal, closeModal, activatePlan } = useActivatePlan();

  const fetchSections = async () => {
    try {
      setLoading(true);

      const response = await api.get("/sections");
      setSections(response.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      fetchSections();
    } else {
      setSections([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  if (loading || authLoading) {
    return <div className="loader">جاري تحميل المناهج...</div>;
  }

  return (
    <section className="curricula-section flex-column container">
      <Title
        title="المناهج الدراسية"
        text="اختر السنة الدراسية وابدأ"
        textcolor="text-content"
      />

      <div className="curricula-div ">
        {sections.slice(0,2).map((section) => {
          const isLocked = section.locked === true;
          return (
            <CurriculaCard
              key={section.id}
              id={section.id}
              order={section.order}
              name={section.name}
              requiredPlanLevel={section.requiredPlanLevel}
              subSections={section.subSections}
              locked={isLocked}
              onActivate={openModal}
            />
          );
        })}
      </div>
      {showModal && (
        <ActivateModal
          show={showModal}
          onClose={closeModal}
          code={code}
          setCode={setCode}
          loading={activateLoading}
          onActivate={activatePlan}
        />
      )}
      <Link to="/curriculapage">
      <Button
      text="عرض كل المناهج"
      classn="login-btn"
      
      
      /></Link>
    </section>
  );
};

export default CurriculaSection;
