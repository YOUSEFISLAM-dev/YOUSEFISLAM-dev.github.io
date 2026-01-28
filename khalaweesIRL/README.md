# خلاوييص؟ IRL

لعبة استغماية واقعية (Vanilla JS + Firebase) باللغة العربية (RTL).

## تشغيل محلي

1) شغّل سيرفر ملفات ثابتة داخل المجلد

- Python:

```bash
python -m http.server 8080
```

2) افتح:

http://localhost:8080/

## تفعيل Firebase

افتح ملف [firebase-config.js](file:///c:/Users/youse/Desktop/khalaweesIRL/firebase-config.js) واستبدل `null` بإعدادات مشروع Firebase:

```js
export const FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

متطلبات Firebase:

- Firebase Auth: فعّل Anonymous Sign-in
- Firestore: أنشئ قاعدة بيانات (Native mode)

### حل خطأ auth/configuration-not-found

لو ظهر:

`FirebaseError: auth/configuration-not-found`

ده معناه إن Authentication مش متفعل في مشروع Firebase أو Anonymous Sign-in مش متفعل.

- Firebase Console → Authentication → Get started
- Sign-in method → فعّل Anonymous
- Settings → Authorized domains → ضيف `localhost` و `127.0.0.1`

