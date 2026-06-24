import React, { useEffect,useState } from "react";
import { createPortal } from "react-dom";
import "./ActivateModal.css";
export default function ActivateModal({
  show,
  onClose,
  code,
  setCode,
  loading,
  onActivate,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <h3>تفعيل الاشتراك</h3>
        <input
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="كود التفعيل"
          disabled={loading}
        />

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>
            إلغاء
          </button>

          <button onClick={onActivate} disabled={loading}>
            {loading ? "جاري..." : "تفعيل"}
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
}