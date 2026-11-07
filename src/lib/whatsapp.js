import { contact } from '../content/course'

/** קישור וואטסאפ עם הודעה מוכנה. כל עוד לא הוזן מספר — מפנה לאזור ההרשמה. */
export function whatsappHref() {
  const number = contact.whatsappNumber.replace(/\D/g, '')
  if (!number) return '#register'
  return `https://wa.me/${number}?text=${encodeURIComponent(contact.whatsappMessage)}`
}

export const hasWhatsapp = () => contact.whatsappNumber.replace(/\D/g, '').length > 0
