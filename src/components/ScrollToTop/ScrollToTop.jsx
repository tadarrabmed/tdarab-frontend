import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // يراقب المسار الحالي للموقع
  const { pathname } = useLocation();

  useEffect(() => {
    // عند تغيير المسار، يتم نقل التمرير إلى أعلى يسار الصفحة
    window.scrollTo(0, 0);
  }, [pathname]); // يشتغل الـ useEffect كل ما يتغير الـ pathname

  return null; // المكون لا يرندر أي شيء في الواجهة
};

export default ScrollToTop;