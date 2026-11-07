# BEAUTYRISS — דף נחיתה לקורס הרמת ריסים ולמינציית גבות

React + Vite, Tailwind CSS v4, GSAP + ScrollTrigger. עברית מלאה ו־RTL.

## הרצה

```bash
npm install
npm run dev      # תצוגה מקדימה מקומית: http://localhost:5173
npm run build    # בנייה לפרסום (תיקיית dist)
npm run preview  # בדיקת הגרסה הבנויה
```

## עדכון תוכן

כל הטקסטים, התמונות, המחיר, ההמלצות ומספר הוואטסאפ נמצאים בקובץ אחד:
`src/content/course.js`.

פרטים שעדיין חסרים (מסומנים ב־TODO):

| שדה | מה קורה כל עוד הוא ריק |
| --- | --- |
| `pricing.price` / `pricing.notes` | מוצג משפט שמפנה לוואטסאפ לפרטי מחיר |
| `testimonials` | אזור ההמלצות מוסתר בגרסה המפורסמת |

במצב פיתוח (`npm run dev`) מופיעות מסגרות מקווקוות ורודות שמסמנות כל פרט חסר. הן לא מופיעות בגרסה הבנויה.

## מבנה

```
src/
  content/course.js      ← כל התוכן
  components/            ← סקשן לכל חלק בדף
  lib/gsap.js            ← רישום GSAP/ScrollTrigger
  lib/whatsapp.js        ← בניית קישור וואטסאפ
  assets/images/         ← תמונות (WebP)
  styles.css             ← טוקנים של צבע וטיפוגרפיה
```

אנימציות מכבדות את הגדרת "הפחתת תנועה" של המכשיר.
