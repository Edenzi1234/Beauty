# EDEN BEAUTY CLUB – הגדרת הצבירה האוטומטית ב־Shopify Flow

המועדון בנוי על **יתרת קרדיט (Store credit) של Shopify**: היתרה נשמרת בחשבון הלקוחה,
מופיעה בקופה כאמצעי תשלום ונממשת בלחיצה – בלי קוד, וגם יחד עם קוד הנחה כמו ביוטי30.

שני תהליכים ב־Flow עושים את כל העבודה, בלי עדכון ידני:

| תהליך | מתי רץ | מה עושה |
| --- | --- | --- |
| 1. צבירת קאשבק | כשהזמנה שולמה | מחשב 3% ומוסיף ליתרה |
| 2. ביטול קאשבק בהחזר | כשנוצר החזר כספי | מוריד 3% מהסכום שהוחזר |

> ב־Shopify Admin: **Apps → Flow → Create workflow**. בכל תהליך – לשמור, ואז **Turn on**.

---

## תהליך 1 – צבירת קאשבק

**שם:** `EDEN CLUB – 3% קאשבק`

### 1. Trigger
`Order paid`

### 2. Condition
`Order / Customer` **exists** (יש לקוחה בהזמנה). אם לא – לא עושים כלום.

### 3. Action – Run code
**Input:**

```graphql
query {
  order {
    currentSubtotalPriceSet { shopMoney { amount } }
    transactions {
      gateway
      kind
      status
      amountSet { shopMoney { amount } }
    }
  }
}
```

**Output:**

```graphql
type Output {
  cashback: Decimal!
}
```

**Code:**

```js
export default function main(input) {
  // מחיר המוצרים אחרי הנחות, בלי משלוח
  const subtotal = parseFloat(input.order.currentSubtotalPriceSet.shopMoney.amount);
  // החלק ששולם מיתרת קרדיט קיימת – לא צובר
  const paidWithCredit = input.order.transactions
    .filter(t => t.gateway.includes('store_credit') && t.status === 'SUCCESS' && (t.kind === 'SALE' || t.kind === 'CAPTURE'))
    .reduce((sum, t) => sum + parseFloat(t.amountSet.shopMoney.amount), 0);
  const base = Math.max(0, subtotal - paidWithCredit);
  return { cashback: Math.round(base * 3) / 100 }; // 400 ₪ → 12.00
}
```

### 4. Condition
`Run code / cashback` **greater than** `0`

### 5. Action – Send Admin API request
**Mutation:** `storeCreditAccountCredit`

```liquid
{
  "id": "{{order.customer.id}}",
  "creditInput": {
    "creditAmount": { "amount": "{{runCode.cashback}}", "currencyCode": "ILS" },
    "notify": true
  }
}
```

(אם מופיעה ב־Flow פעולה מוכנה בשם דומה ל־"Issue store credit" – אפשר להשתמש בה במקום, עם אותו סכום.)

### 6. Action – Update order metafield
- Namespace: `eden` · Key: `cashback` · Type: `number_decimal`
- Value: `{{runCode.cashback}}`

השדה הזה מזין את "היסטוריית צבירה ומימוש" ואת "סה״כ צברת" בעמוד המועדון.

---

## תהליך 2 – ביטול קאשבק בהחזר כספי

**שם:** `EDEN CLUB – ביטול קאשבק בהחזר`

### 1. Trigger
`Refund created`

### 2. Condition
`Order / Customer` **exists** וגם `Order / Metafield eden.cashback` **exists**

### 3. Action – Run code
**Input:**

```graphql
query {
  refund {
    refundLineItems { subtotalSet { shopMoney { amount } } }
  }
  order {
    metafield(namespace: "eden", key: "cashback") { value }
    reversed: metafield(namespace: "eden", key: "cashback_reversed") { value }
  }
}
```

**Output:**

```graphql
type Output {
  reverse: Decimal!
  reversedTotal: Decimal!
}
```

**Code:**

```js
export default function main(input) {
  const refunded = input.refund.refundLineItems
    .reduce((sum, li) => sum + parseFloat(li.subtotalSet.shopMoney.amount), 0);
  const earned = parseFloat(input.order.metafield?.value || '0');
  const already = parseFloat(input.order.reversed?.value || '0');
  // לא מורידים יותר ממה שנצבר על ההזמנה
  const reverse = Math.min(Math.round(refunded * 3) / 100, Math.max(0, earned - already));
  return { reverse, reversedTotal: Math.round((already + reverse) * 100) / 100 };
}
```

### 4. Condition
`Run code / reverse` **greater than** `0`

### 5. Action – Send Admin API request
**Mutation:** `storeCreditAccountDebit`

```liquid
{
  "id": "{{order.customer.id}}",
  "debitInput": {
    "debitAmount": { "amount": "{{runCode.reverse}}", "currencyCode": "ILS" }
  }
}
```

אם הלקוחה כבר מימשה את היתרה, הפעולה תיכשל ותופיע ב־Flow כשגיאה – אז רק מחליטים ידנית אם לוותר.

### 6. Action – Update order metafield
- Namespace: `eden` · Key: `cashback_reversed` · Type: `number_decimal`
- Value: `{{runCode.reversedTotal}}`

---

## בדיקה לפני הפעלה לכולן

1. הזמנת בדיקה עם חשבון שלך (מוצר זול / מוצר בדיקה) ותשלום אמיתי או ידני מסומן כ"שולם".
2. ב־Flow → **Recent runs** – לוודא ששני השלבים ירוקים.
3. ב־Customers → הלקוחה → **Store credit** – לוודא שנוסף 3%.
4. להיכנס לאתר מחוברת → הקופה מציגה את היתרה כאמצעי תשלום.
5. החזר על ההזמנה → היתרה יורדת בהתאם.

## Smile.io

Smile מותקנת והווידג'ט שלה פעיל באתר, אבל אף הטבה שלה לא מומשה עד היום.
כדי שלא יהיו שתי תוכניות שונות מול הלקוחות – לכבות ב־Smile את חוקי צבירת הנקודות
(או את ה־App embed של Smile בעורך התבנית), או להשאיר אותה רק להטבות שאינן קאשבק.

---

## חברות המועדון – הצטרפות, תגית וקבוצה (עודכן 12.11.2026)

**חברה = מי שהצטרפה בפועל בטופס המועדון באתר** (חלון EDEN BEAUTY CLUB) והכניסה מייל. לא כל הלקוחות, ולא מי שרק אישרה דיוור בעבר.

### איך זה עובד
1. הלקוחה מכניסה מייל בחלון ולוחצת "אני רוצה להצטרף למועדון".
2. Shopify (טופס `customer` של התבנית, עם בדיקת hCaptcha נגד בוטים) יוצר לקוחה – או מוצא את הקיימת לפי המייל – ומוסיף לה:
   - `EDEN_CLUB_MEMBER` – התגית היחידה שמגדירה חברות. שום דבר אחר בחנות לא מוסיף אותה.
   - `EDEN_CLUB_JOINED_2026-11-12` – תאריך ההצטרפות (לפי היום אצל הלקוחה).
   - אישור דיוור במייל (כתוב לה בטופס: "בהצטרפות את מאשרת לקבל מאיתנו מבצעים ועדכונים במייל").
3. החלון מציג "ברוכה הבאה" + כפתור להתחברות לחשבון עם אותו מייל.

### קבוצות (Customers → Segments)
| קבוצה | תנאי |
| --- | --- |
| **חברות מועדון EDEN** | `customer_tags CONTAINS 'EDEN_CLUB_MEMBER'` |
| **חברות מועדון EDEN – מאשרות דיוור** | אותה תגית + `email_subscription_status = 'SUBSCRIBED'` |

נכון ל־12.11: 0 חברות – אין רישום אמיתי לפני הטופס החדש (החלון הקודם רק הפנה להתחברות, ולא נוצרה מאז אף לקוחה).
התגית `EDEN Club` שהוספתי קודם לכל 206 הלקוחות הוסרה (רק התגית; שום נתון אחר לא נמחק או שונה).

### צבירה רק לחברות – שינוי מומלץ בתהליך 1
בתהליך `EDEN CLUB – 3% קאשבק`, ב־Condition, להוסיף:
`Order / Customer / Tags` **includes** `EDEN_CLUB_MEMBER`
כך רק חברות צוברות 3%, וכל יתרות ה־Store credit שייכות לחברות המועדון.

### תאריך הצטרפות ויתרה לכל חברה
- **תאריך:** התגית `EDEN_CLUB_JOINED_…` (מופיעה בכרטיס הלקוחה ובעמודת Tags בייצוא).
- **יתרה:** בכרטיס הלקוחה → Store credit.
- **דוח נצבר / מומש / יתרה:** Analytics → Reports → New exploration:

```
FROM store_credit_transactions
SHOW credited_store_credit_value, debited_store_credit_value, expired_store_credit_value,
  credited_store_credit_value + debited_store_credit_value + expired_store_credit_value AS balance
GROUP BY customer_name, customer_email
WITH TOTALS
SINCE 2026-01-01 UNTIL today
ORDER BY balance DESC
LIMIT 1000
```
(ShopifyQL לא יכול לסנן לפי תגית; עם התנאי שלמעלה ב־Flow – כל השורות הן של חברות.)

### ייצוא ומבצעים
- Customers → Segments → "חברות מועדון EDEN" → **Export** (CSV עם שם, מייל, טלפון, אישור דיוור, תגיות כולל תאריך הצטרפות).
- Marketing → Shopify Email → נמענים: "חברות מועדון EDEN – מאשרות דיוור".

### בדיקה 12.11 – למה הקבוצה ריקה
- בתבנית החיה ("EDEN Club Pop-up") הכפתור רק מפנה להתחברות לחשבון – **אין שם רישום**, ולכן שום הצטרפות לא נשמרה ב־Shopify.
- טופס ההצטרפות נמצא רק בטיוטה "EDEN Club – טופס הצטרפות".
- לא נמצאו הרשמות קודמות לטופס. התחברות ראשונה לחשבון אחרי עליית החלון: לקוחה אחת (12.11, 09:21) – אפשרית, לא מאומתת; לא סומנה.

### החלטה: בלי Shopify Forms – הטופס של החלון מחובר ישירות ל־Shopify
- הטופס שולח ישירות ל־Shopify (טופס `customer` של התבנית), מוגן ב־hCaptcha של Shopify. אין אפליקציה, אין שרת חיצוני, אין מפתחות.
- התגיות `EDEN_CLUB_MEMBER` + `EDEN_CLUB_JOINED_yyyy-mm-dd` נשלחות עם ההרשמה.
- ההרשמה מוגנת בבדיקת hCaptcha, ולכן אי אפשר לבדוק אותה אוטומטית – בודקים פעם אחת ידנית בתצוגה המקדימה:
  1. מייל **חדש** → לקוחה חדשה עם התגיות.
  2. מייל **שכבר קיים** בחנות → התגיות נוספות לכרטיס הקיים (בלי כפילות).
- בתבנית יש גם מקום לבלוק אפליקציה – בלי בלוק הוא לא פעיל.
