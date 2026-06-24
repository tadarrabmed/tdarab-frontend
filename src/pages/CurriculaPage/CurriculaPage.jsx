import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./CurriculaPage.css";
import CurriculaCard from "../../components/CurriculsCard/CurriculaCard";
import Title from "../../components/Title/Title";
import { useAuth } from "../../context/AuthProvider";
import Button from "../../components/Button/Button";
import { useActivatePlan } from "../../context/UseActivatePlan";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
const CurriculaPage = () => {

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const {
    showModal,
    code,
    setCode,
    loading: activateLoading,
    openModal,
    closeModal,
    activatePlan,
  } = useActivatePlan();
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
    <section className="curricula-page flex-column container">
      <Title
        title="المناهج الدراسية"
        text="اختر السنة الدراسية وابدأ"
        textcolor="text-content"
      />
      <div className="curricula-div flex-center">
        {sections.map((section) => {
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
    </section>
  );
};

export default CurriculaPage;
