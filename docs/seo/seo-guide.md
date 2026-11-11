# EDEN BEAUTY SHOP – SEO: מה בוצע ומה נשאר

## בוצע (נובמבר 2026)

| מה | איפה | מצב |
| --- | --- | --- |
| Favicon מרובע מהלוגו (B), 512×512 | Content → Files: `beautyshop-favicon-512.png` | הועלה |
| הצגת ה־Favicon (48/192 + apple-touch-icon), רק אם לא הוגדר Favicon בהגדרות התבנית | `snippets/meta-tags.liquid` בטיוטה "EDEN Club – סרטון + מועדון (טיוטה)" | בטיוטה – עולה עם פרסום התבנית |
| נתוני WebSite + Organization (שם: EDEN BEAUTY SHOP, שם חלופי: עדן ביוטי שופ), רק בדף הבית | אותו קובץ, אותה טיוטה | בטיוטה – עולה עם פרסום התבנית |
| כותרת ותיאור SEO ל־12 הקולקציות הראשיות | נתוני הקולקציות | פעיל באתר |
| 5 כתובות מוצר מתוקנות (untitled / ‎-copy) + הפניה מהכתובת הישנה | נתוני המוצרים + Redirects | פעיל באתר |
| הפניות מ־3 קולקציות ריקות כפולות לקולקציה הנכונה | Online Store → Navigation → URL Redirects | מוכן – נכנס לתוקף כשמסתירים את הקולקציות |

## נשאר לבצע ידנית (כ־10 דקות)

1. **שם החנות** – Settings → Store details → Store name: `EDEN BEAUTY SHOP`.
   (מופיע גם במיילים ללקוחות ובקופה.)
2. **כותרת ותיאור דף הבית** – Online Store → Preferences → Title and meta description:
   - Homepage title: `EDEN BEAUTY SHOP | מוצרים מקצועיים לציפורניים, ריסים וגבות`
   - Homepage meta description: `חנות אונליין למוצרי ביוטי מקצועיים. לקים, ג׳לים, ציוד לציפורניים, מוצרים להרמת ריסים ועיצוב גבות. מגוון מותגים ומשלוחים לכל הארץ.`
   - באותו מסך: Social sharing image – להעלות את הלוגו (תמונה שתופיע בשיתוף בוואטסאפ/פייסבוק).
3. **להסתיר 3 קולקציות ריקות** – Products → Collections → לכל אחת: "מוצרים עיצוב גבות", "מארזים/ סטים", "מוצרים להלחמת ריסים" (זו עם 0 מוצרים) → Sales channels → להסיר את Online Store.
4. **לפרסם את הטיוטה** "EDEN Club – סרטון + מועדון (טיוטה)" (Online Store → Themes → Publish).
   לפני הפרסום: ב־Customize → App embeds – להשאיר/לכבות את Smile לפי מה שהוחלט.

## Google Search Console

לא נמצא חיבור קיים (אין תגית אימות בתבנית ואין אפליקציית Google). לחיבור:

1. להיכנס ל־search.google.com/search-console עם חשבון Google של העסק.
2. Add property → **Domain** → `edenbeautyshop.co.il`.
3. גוגל ייתן רשומת TXT. להוסיף אותה אצל מי שמנהל את הדומיין:
   - אם הדומיין נקנה דרך Shopify: Settings → Domains → edenbeautyshop.co.il → DNS settings → Add custom record → TXT.
   - אחרת: בממשק של רשם הדומיין.
4. ללחוץ Verify (לפעמים לוקח עד יום).
5. Sitemaps → להגיש: `sitemap.xml` (הכתובת המלאה: https://edenbeautyshop.co.il/sitemap.xml).

## בקשה לסריקה מחדש (אחרי שהכל פורסם)

1. Search Console → URL Inspection → להדביק `https://edenbeautyshop.co.il/` → **Request indexing**.
2. לחזור על זה לכמה עמודים חשובים (קולקציות ראשיות).
3. Sitemaps → לוודא שהסטטוס "Success".
4. בדיקת הנתונים: search.google.com/test/rich-results → להדביק את כתובת האתר → אמורים להופיע WebSite ו־Organization.

שם האתר והאייקון מתעדכנים בתוצאות החיפוש בדרך כלל תוך כמה ימים עד כמה שבועות – זה תלוי בגוגל.

## לשלב הבא

- **תפריט ראשי**: "כלי עבודה לציפורניים", "בניית ציפורניים", "הרמת ריסים וגבות" מקשרים לעמוד חיפוש. צריך להחליט לאיזו קולקציה כל אחד מוביל (או ליצור קולקציה מאחדת).
- **מוצרים בלי תיאור**: רוב 689 המוצרים בלי תיאור ובלי תיאור SEO. מומלץ להתחיל ב־50 הנמכרים.
- **כפילות שם**: "סיליקונים דובי - מעוגל רחב" מופיע פעמיים – לבדוק אם זה אותו מוצר.
