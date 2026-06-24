import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loader-box">
        <div className="spinner"></div>
        <h2 className="logo">TDARAB</h2>
        <p className="loading-text">جاري تحميل المنصة...</p>
      </div>
    </div>
  );
};

export default Loading;
