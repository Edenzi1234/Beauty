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
