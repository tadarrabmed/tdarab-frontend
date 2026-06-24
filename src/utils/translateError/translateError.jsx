export const translateError = (error) => {
  const status =
    error.response?.status || error.status || error.request?.status;
  const message = error.response?.data?.error;
  switch (status) {
    case 400:
      if (message === "Email already in use")
        return "هذا البريد الإلكتروني مسجل مسبقاً";
      return "تأكد من إدخال البيانات بشكل صحيح";
    case 401:
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    case 403:
      return "ليس لديك صلاحية للوصول (تحتاج لتفعيل اشتراك)";
    case 404:
      return "العنصر المطلوب غير موجود";
    case 429:
      return "محاولات كثيرة جداً! يرجى الانتظار 15 دقيقة";
    case 500:
      return "خطأ في السيرفر، سنقوم بإصلاحه قريباً";
    case 409:
      return "هذا البريد الإلكتروني مسجل مسبقاً";
    default:
      return "حدث خطأ غير متوقع، يرجى التحقق من الشبكة والمحاولة لاحقاً";
  }
};
