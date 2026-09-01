export type ContactIntent = 'contact' | 'demo' | 'trial' | 'support' | 'partnership'

type ContactEmailMeta = {
  heading: string
  subject: string
  submissionType: string
}

const intentMap: Record<string, ContactIntent> = {
  demo: 'demo',
  trial: 'trial',
  support: 'support',
  partner: 'partnership',
  partnership: 'partnership',
}

export function resolveContactIntent(rawIntent: string | null | undefined): ContactIntent {
  if (!rawIntent) return 'contact'

  return intentMap[rawIntent.trim().toLowerCase()] ?? 'contact'
}

export function getContactEmailMeta(
  intent: ContactIntent,
  organization?: string | null,
): ContactEmailMeta {
  const trimmedOrganization = organization?.trim()

  switch (intent) {
    case 'demo':
      return {
        submissionType: 'Book a Demo',
        heading: 'New NourDoc Book a Demo Request',
        subject: trimmedOrganization
          ? `NourDoc — Book a Demo Request | ${trimmedOrganization}`
          : 'NourDoc — Book a Demo Request',
      }
    case 'trial':
      return {
        submissionType: 'Trial Request',
        heading: 'New NourDoc Trial Request',
        subject: 'NourDoc — Trial Request',
      }
    case 'support':
      return {
        submissionType: 'Support Request',
        heading: 'New NourDoc Support Request',
        subject: 'NourDoc — Support Request',
      }
    case 'partnership':
      return {
        submissionType: 'Partnership Inquiry',
        heading: 'New NourDoc Partnership Inquiry',
        subject: 'NourDoc — Partnership Inquiry',
      }
    default:
      return {
        submissionType: 'Contact Inquiry',
        heading: 'New NourDoc Contact Inquiry',
        subject: 'NourDoc — Contact Inquiry',
      }
  }
}

export function getDefaultInterestForIntent(intent: ContactIntent): string {
  switch (intent) {
    case 'demo':
      return 'Book a Demo'
    case 'trial':
      return 'Free Trial'
    case 'support':
      return 'Support'
    case 'partnership':
      return 'Partnership'
    default:
      return ''
  }
}
