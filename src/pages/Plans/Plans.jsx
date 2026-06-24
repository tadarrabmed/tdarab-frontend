import React, { useState, useEffect } from "react";
import "./Plans.css";
import api from "../../api/axios";
import { useActivatePlan } from "../../context/UseActivatePlan";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showModal, code, setCode, loading: activateLoading, openModal, closeModal, activatePlan } = useActivatePlan();

  useEffect(() => {
    api
      .get("/plans")
      .then((res) => {
        setPlans(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("تعذّر تحميل الخطط، يرجى المحاولة لاحقاً.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="plans-page flex-column">
        <p className="plans-loading">جارٍ التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plans-page flex-column">
        <p className="plans-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="plans-page">
      <div className="plans-hero flex-column">
        <h1 className="plans-hero-title">الخطط والأسعار</h1>
        <p className="plans-hero-sub">
          اختر الخطة المناسبة لك وابدأ رحلتك في التعلم
        </p>
        <div className="plans-notice">
          <span className="plans-notice-icon">ℹ️</span>
          لتفعيل أي خطة يرجى التواصل مع الإدارة للحصول على كود التفعيل
        </div>
        <div className="plans-activate-cta">
          <span className="plans-activate-text">هل لديك كود تفعيل؟</span>
          <button className="plans-activate-btn" onClick={openModal}>
            فعّل خطتك الآن
          </button>
        </div>
      </div>

      <div className="plans-grid-page">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`plan-card-full fade-in ${plan.level === plans.length ? "featured" : ""}`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {plan.level === plans.length && (
              <span className="plan-badge-full">الأفضل</span>
            )}

            <div className="plan-card-header">
              <h2 className="plan-card-name">{plan.name}</h2>
              <p className="plan-card-price">
                {plan.price === 0 ? (
                  <span>مجاني</span>
                ) : (
                  <>
                    {plan.price}
                    <span className="plan-currency"> {plan.currency}</span>
                  </>
                )}
              </p>
            </div>

            <div className="plan-card-stats">
              <div className="plan-stat-item">
                <span className="plan-stat-value">
                  {plan.content?.questionsCount ?? "-"}
                </span>
                <span className="plan-stat-label">سؤال</span>
              </div>
              <div className="plan-stat-item">
                <span className="plan-stat-value">
                  {plan.content?.chaptersCount ?? "-"}
                </span>
                <span className="plan-stat-label">فصل</span>
              </div>
              <div className="plan-stat-item">
                <span className="plan-stat-value">
                  {plan.content?.subSectionsCount ?? "-"}
                </span>
                <span className="plan-stat-label">مادة</span>
              </div>
              <div className="plan-stat-item">
                <span className="plan-stat-value">
                  {plan.content?.sectionsCount ?? "-"}
                </span>
                <span className="plan-stat-label">سنة</span>
              </div>
            </div>

            {plan.content?.sections?.length > 0 &&
              (() => {
                const uniqueSections = [
                  ...new Map(
                    plan.content.sections.map((s) => [s.name, s]),
                  ).values(),
                ];
                const allSubSections = plan.content.sections.flatMap(
                  (s) => s.subSections || [],
                );
                const allChapters = allSubSections.flatMap(
                  (sub) => sub.chapters || [],
                );
                return (
                  <div className="plan-sections-details">
                    <details className="plan-detail-block">
                      <summary className="plan-sections-summary">
                        السنوات الدراسية ({uniqueSections.length})
                      </summary>
                      <div className="plan-sections-tags">
                        {uniqueSections.map((s) => (
                          <span key={s.id} className="plan-section-tag">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </details>

                    <details className="plan-detail-block">
                      <summary className="plan-sections-summary">
                        المواد ({allSubSections.length})
                      </summary>
                      <div className="plan-sections-tags">
                        {allSubSections.map((sub) => (
                          <span key={sub.id} className="plan-section-tag">
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </details>

                    <details className="plan-detail-block">
                      <summary className="plan-sections-summary">
                        الفصول ({allChapters.length})
                      </summary>
                      <div className="plan-sections-tags">
                        {allChapters.map((ch) => (
                          <span key={ch.id} className="plan-section-tag">
                            {ch.name}
                          </span>
                        ))}
                      </div>
                    </details>
                  </div>
                );
              })()}
          </div>
        ))}
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
    </div>
  );
}
