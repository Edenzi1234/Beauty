/**
 * תוכן דף הטיפול — הרמת ריסים.
 * כל הטקסטים נלקחו מההודעה של עדן. לעדכון מחיר, משך או קישור — עורכים רק כאן.
 */

import result1 from '../assets/images/lash-lift/result-01.webp'
import result2 from '../assets/images/lash-lift/result-02.webp'
import result3 from '../assets/images/lash-lift/result-03.webp'
import result4 from '../assets/images/lash-lift/result-04.webp'
import closeup from '../assets/images/lash-lift/closeup.webp'

export const bookingUrl = 'https://calmark.io/p/kJFOt'

export const location = 'פתח תקווה, אם המושבות החדשה'

export const hero = {
  title: ['הרמת', 'ריסים'],
  lead: 'טיפול שבו אני מרימה, מעגלת וצובעת את הריסים הטבעיות שלך.',
  image: result1,
  imageAlt: 'ריסים מורמים ומעוגלים אחרי טיפול הרמת ריסים',
}

export const about = {
  label: 'על הטיפול',
  title: 'הריסים הטבעיות שלך, במיטבן',
  image: closeup,
  imageAlt: 'תקריב של ריסים מורמות ומעוגלות אחרי הטיפול',
  steps: [
    { title: 'מרימה', body: 'הריסים הטבעיות שלך מורמות מהשורש.' },
    { title: 'מעגלת', body: 'הריסים מקבלות קימור יפה ומסודר.' },
    { title: 'צובעת', body: 'הריסים נצבעות ונראות כהות ומודגשות יותר.' },
  ],
  botox: {
    title: 'בוטוקס ייחודי לריסים',
    body: 'אני משתמשת בחומרים הכי איכותיים ובטוחים שיש, בשילוב בוטוקס ייחודי לריסים – שמזין, מחזק ומעניק בוסט של ויטמינים לריסים שלך.',
  },
}

export const details = {
  label: 'פרטי הטיפול',
  title: 'כל מה שצריך לדעת',
  facts: [
    { value: 'כשעה', label: 'משך הטיפול' },
    { value: '6–8 שבועות', label: 'מחזיק', note: 'תלוי בקצב הצמיחה שלך' },
    { value: '250 ₪', label: 'עלות הטיפול' },
  ],
}

export const results = {
  label: 'תוצאות',
  title: 'ריסים של לקוחות מהקליניקה',
  images: [
    { src: result1, alt: 'תוצאת הרמת ריסים של לקוחה' },
    { src: result2, alt: 'תוצאת הרמת ריסים של לקוחה' },
    { src: result3, alt: 'תוצאת הרמת ריסים של לקוחה' },
    { src: result4, alt: 'תוצאת הרמת ריסים של לקוחה' },
  ],
}
