import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthProvider";
export const useActivatePlan = () => {
  const { refreshUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCode("");
  };

  const activatePlan = async () => {
    if (!code.trim()) {
      toast.error("أدخل كود التفعيل");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await api.post("/activate", {
        code: code.trim(),
      });
      await refreshUser();

      toast.success("تم التفعيل بنجاح 🎉", {
        className: "toaster",
      });
      closeModal();
    } catch (err) {
      const error = err.response?.data?.error;
      switch (error) {
        case "Code already used":
          toast.error("الكود مستخدم مسبقاً", {
            className: "toaster",
          });
          break;
        case "Code has expired":
          toast.error("الكود منتهي الصلاحية", {
            className: "toaster",
          });
          break;
        case "Invalid code":
          toast.error("الكود غير صحيح", {
            className: "toaster",
          });
          break;
        case "Plan not found for this code":
          toast.error("لا توجد خطة لهذا الكود", {
            className: "toaster",
          });
          break;
        default:
          toast.error("حدث خطأ، حاول مرة أخرى", {
            className: "toaster",
          });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    showModal,
    code,
    setCode,
    loading,
    openModal,
    closeModal,
    activatePlan,
  };
};
