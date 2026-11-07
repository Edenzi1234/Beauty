/**
 * כל התוכן של דף הנחיתה נמצא בקובץ הזה.
 * כדי לעדכן טקסט, מחיר, המלצות או מספר טלפון — עורכים רק כאן.
 *
 * כל הטקסטים נלקחו מחוברת הקורס (PDF) שסופקה.
 * שדות ריקים ('' / null / []) הם פרטים שעדיין לא נמסרו —
 * הדף מציג במקומם חלופה ניטרלית ולא ממציא תוכן.
 */

import instructorHero from '../assets/images/instructor-hero.webp'
import instructorKit from '../assets/images/instructor-kit.webp'
import lashCloseup from '../assets/images/lash-closeup.webp'
import result1 from '../assets/images/result-1.webp'
import result2 from '../assets/images/result-2.webp'
import result3 from '../assets/images/result-3.webp'

export const brand = {
  name: 'BEAUTYRISS',
  hebrewName: 'עדן ביוטי ריס',
}

/** פרטי קשר — מוצגים באזור ההרשמה */
export const contact = {
  phoneDisplay: '058-4286914',
}

export const hero = {
  title: ['קורס הרמת ריסים', 'והרמת גבות'],
  lead: 'קורס פרימיום שמעניק לך ידע מקצועי ברמה הגבוהה ביותר, בשילוב טכניקות ייחודיות וחומרי עבודה של NOVEL.',
  image: instructorHero,
  imageAlt: 'מדריכת הקורס של BEAUTYRISS',
}

export const intro = {
  title: 'כל הידע, הביטחון והכלים',
  body: 'קורס שמעניק לך את כל הידע, הביטחון והכלים להתחיל לעבוד ולהרוויח בתחום המבוקש ביותר בעולם היופי.',
  benefits: [
    'חומרי עבודה איכותיים ברמה הגבוהה ביותר',
    'הדרכה אחת על אחת',
    'זמינות וליווי גם אחרי הקורס',
    'שיעורים מובנים וברורים שמתאימים גם למתחילות',
  ],
  method: {
    title: 'לקוחות שחוזרות כל 3 שבועות',
    body: [
      'תלמדי שיטה מתקדמת שמביאה לך לקוחות חוזרות כל 3 שבועות, במקום פעם בחודשיים כמו אצל כולן.',
      'יותר לקוחות, יותר טיפולים, יותר הכנסה.',
    ],
  },
  marketing: {
    title: 'וגם שיווק נכון',
    body: 'איך להביא לקוחות, איך למלא יומן ואיך להפוך את זה לעסק רווחי באמת.',
  },
  image: lashCloseup,
  imageAlt: 'תקריב של ריסים לאחר הרמה',
}

/**
 * ימי הלימוד — הקורס נמשך שני ימים, יום אחרי יום.
 */
export const days = [
  {
    label: 'יום ראשון',
    title: 'חלק עיוני ומודליסטית לצפייה',
    duration: '3–4 שעות + שיווק',
    items: [
      'הסבר על NOVEL',
      'מבנה העין והריסים',
      'הכרת כלים וחומרים',
      'שלבי טיפול ריסים וגבות',
      'חידוש הרמת ריסים כל 3 שבועות',
      'הסבר על בוטוקס לריסים',
      'השיטה המקסימלית',
      'חיטוי, איסורים, תיקון והנחיות לאחר טיפול',
    ],
  },
  {
    label: 'יום שני',
    title: 'חלק מעשי',
    duration: '3–4 שעות',
    items: [
      'תרגול על 2 מודליסטיות בפיקוח מלא',
      'טיפול משולב ריסים + גבות',
      'טיפול הרמת ריסים בלבד',
    ],
  },
]

export const results = {
  title: 'התוצאות הראשונות של התלמידות שלי',
  images: [
    { src: result1, alt: 'תוצאת הרמת ריסים וגבות של תלמידה' },
    { src: result2, alt: 'תוצאת הרמת ריסים של תלמידה' },
    { src: result3, alt: 'תוצאת למינציית גבות והרמת ריסים של תלמידה' },
  ],
}

export const included = {
  title: 'מה תקבלי בקורס',
  items: [
    { title: 'חוברת מקצועית', detail: 'עם כל החומר העיוני' },
    { title: 'ערכת חומרים מפוארת', detail: 'בשווי 1,200 ₪, מספיקה ל־70 טיפולים' },
    { title: 'תעודת סיום קורס', detail: '' },
    { title: '10% הנחה', detail: 'באתר “עדן ביוטי שופ”' },
    { title: 'ליווי אישי', detail: 'זמין 24/7' },
  ],
  image: instructorKit,
  imageAlt: 'מדריכת הקורס עם ערכת החומרים של NOVEL',
}

/**
 * המלצות אמיתיות בלבד. דוגמה למבנה:
 * { name: 'שם התלמידה', text: 'ציטוט ההמלצה', role: 'בוגרת מחזור ...' }
 * כל עוד הרשימה ריקה, האזור מוסתר בגרסה המפורסמת.
 */
export const testimonials = []

/**
 * מחיר ופרטי הרשמה. price: מספר בשקלים או null.
 * originalPrice: המחיר המקורי שמוצג מחוק לצד המחיר (או null).
 * notes: שורות נוספות כמו מועדים, תשלומים, מיקום.
 */
export const pricing = {
  price: 3500,
  originalPrice: 4000,
  notes: [], // TODO: מועדים / תנאי תשלום / מיקום
}
