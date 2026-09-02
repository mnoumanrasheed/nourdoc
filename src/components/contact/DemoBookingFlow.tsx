import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  FileText,
  Hospital,
  Layers3,
  Network,
  Plug,
  ShieldCheck,
  Shapes,
  Stethoscope,
  UserRound,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
// @ts-expect-error The installed package does not include TypeScript declarations.
import ReCAPTCHA from 'react-google-recaptcha'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getContactEmailMeta, resolveContactIntent } from '../../utils/contactIntent'

type DemoData = {
  organisationType: string
  interests: string[]
  fullName: string
  email: string
  organisation: string
  phone: string
  role: string
  message: string
  preferredTiming: string
}

type DemoField = keyof DemoData | 'recaptcha'
type DemoErrors = Partial<Record<DemoField, string>>

type ContactResponse = {
  success?: boolean
  message?: string
  error?: string
}

type ReCaptchaHandle = {
  reset: () => void
}

type SelectOption = {
  label: string
  icon: LucideIcon
}

const organisationOptions: SelectOption[] = [
  { label: 'Hospital', icon: Hospital },
  { label: 'Clinic', icon: Stethoscope },
  { label: 'Healthcare Network', icon: Network },
  { label: 'Individual Physician', icon: UserRound },
  { label: 'Other', icon: Shapes },
]

const interestOptions: SelectOption[] = [
  { label: 'Ambient Clinical Documentation', icon: FileText },
  { label: 'Clinical Workflow', icon: Workflow },
  { label: 'EMR / HMIS Integration', icon: Plug },
  { label: 'Security & Compliance', icon: ShieldCheck },
  { label: 'Analytics & Insights', icon: BarChart3 },
  { label: 'Full NourDoc Platform', icon: Layers3 },
]

const timingOptions = ['Morning', 'Afternoon', 'Evening', 'Flexible']

const progressSteps = [
  ['01', 'Organisation'],
  ['02', 'Interests'],
  ['03', 'Details'],
  ['04', 'Submit'],
]

const initialData: DemoData = {
  organisationType: '',
  interests: [],
  fullName: '',
  email: '',
  organisation: '',
  phone: '',
  role: '',
  message: '',
  preferredTiming: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getInitialStep(searchParams: URLSearchParams) {
  const requestedStep = Number(searchParams.get('step') ?? 1)
  return Number.isInteger(requestedStep) && requestedStep >= 1 && requestedStep <= 4
    ? requestedStep
    : 1
}

export function DemoBookingFlow() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const intent = resolveContactIntent(searchParams.get('intent'))
  const [step, setStep] = useState(() => getInitialStep(searchParams))
  const [highestStep, setHighestStep] = useState(() => getInitialStep(searchParams))
  const [data, setData] = useState<DemoData>(initialData)
  const [errors, setErrors] = useState<DemoErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const recaptchaRef = useRef<ReCaptchaHandle | null>(null)
  const submittingRef = useRef(false)
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const configuredSchedulingUrl = String(import.meta.env.VITE_DEMO_SCHEDULING_URL ?? '').trim()
  const schedulingUrl = /^https?:\/\//i.test(configuredSchedulingUrl) ? configuredSchedulingUrl : null

  useEffect(() => {
    const syncStepFromHistory = () => {
      const historyParams = new URLSearchParams(window.location.search)
      const historyStep = Number(historyParams.get('step') ?? 1)
      const validStep = Number.isInteger(historyStep) && historyStep >= 1 && historyStep <= 4
        ? historyStep
        : 1
      setStep(Math.min(validStep, highestStep))
    }

    window.addEventListener('popstate', syncStepFromHistory)
    return () => window.removeEventListener('popstate', syncStepFromHistory)
  }, [highestStep])

  useEffect(() => {
    if (submitted) successRef.current?.focus({ preventScroll: true })
    else headingRef.current?.focus({ preventScroll: true })
  }, [step, submitted])

  const updateField = (field: keyof DemoData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const selectOrganisation = (organisationType: string) => {
    setData((current) => ({ ...current, organisationType }))
    setErrors((current) => ({ ...current, organisationType: undefined }))
  }

  const toggleInterest = (interest: string) => {
    setData((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
    setErrors((current) => ({ ...current, interests: undefined }))
  }

  const selectTiming = (preferredTiming: string) => {
    setData((current) => ({ ...current, preferredTiming }))
    setErrors((current) => ({ ...current, preferredTiming: undefined }))
  }

  const validateStep = (currentStep: number) => {
    const nextErrors: DemoErrors = {}

    if (currentStep === 1 && !data.organisationType) {
      nextErrors.organisationType = 'Select the organisation type that best describes you.'
    }

    if (currentStep === 2 && data.interests.length === 0) {
      nextErrors.interests = 'Select at least one area you would like to explore.'
    }

    if (currentStep === 3) {
      if (!data.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
      if (!data.email.trim()) nextErrors.email = 'Enter your work email.'
      else if (!emailPattern.test(data.email.trim())) nextErrors.email = 'Enter a valid work email address.'
      if (!data.organisation.trim()) nextErrors.organisation = 'Enter your organisation.'
    }

    if (currentStep === 4 && !data.preferredTiming) {
      nextErrors.preferredTiming = 'Select a preferred demo timing.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('.demo-booking-panel [aria-invalid="true"]')?.focus()
      })
      return false
    }

    return true
  }

  const moveToStep = (nextStep: number, replace = false) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('intent', 'demo')
    if (nextStep === 1) nextParams.delete('step')
    else nextParams.set('step', String(nextStep))
    setSearchParams(nextParams, { replace })
    setStep(nextStep)
    setErrors({})
  }

  const continueFlow = () => {
    if (!validateStep(step) || step >= 4) return
    const nextStep = step + 1
    setHighestStep((current) => Math.max(current, nextStep))
    moveToStep(nextStep)
  }

  const goBack = () => {
    if (step <= 1) return
    navigate(-1)
  }

  const submitDemoRequest = async () => {
    if (submittingRef.current || !validateStep(4)) return

    if (!recaptchaToken) {
      setErrors((current) => ({ ...current, recaptcha: 'Please verify that you are not a robot.' }))
      return
    }

    submittingRef.current = true
    setIsSubmitting(true)
    setSubmitError(null)

    const requirements = data.message.trim()
    const emailMeta = getContactEmailMeta(intent, data.organisation)
    const structuredMessage = [
      `Organisation type: ${data.organisationType}`,
      `Demo interests: ${data.interests.join(', ')}`,
      `Phone / WhatsApp: ${data.phone.trim() || 'Not provided'}`,
      `Role / Job Title: ${data.role.trim() || 'Not provided'}`,
      `Preferred demo timing: ${data.preferredTiming}`,
      `Requirements: ${requirements || 'Not provided'}`,
    ].join('\n')

    const payload = {
      name: data.fullName.trim(),
      email: data.email.trim(),
      organization: data.organisation.trim(),
      intent,
      interest: 'Book a Demo',
      message: structuredMessage,
      recaptchaToken,
      emailSubject: emailMeta.subject,
      emailHeading: emailMeta.heading,
      submissionType: emailMeta.submissionType,
      replyTo: data.email.trim(),
      organisationType: data.organisationType,
      demoInterests: data.interests,
      phone: data.phone.trim(),
      role: data.role.trim(),
      preferredDemoTiming: data.preferredTiming,
      requirements,
    }

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let result: ContactResponse = {}
      try {
        result = await response.json() as ContactResponse
      } catch {
        // The response status below provides a safe fallback for invalid JSON.
      }

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.error
          || result.message
          || 'We could not send your demo request. Please try again.',
        )
      }

      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
      setSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'A network error occurred. Please try again.',
      )
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  const submitCurrentStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < 4) continueFlow()
    else void submitDemoRequest()
  }

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="section demo-booking-section" aria-labelledby="demo-booking-title">
      <div className="container demo-booking-shell">
        <motion.div
          className="demo-transition-bridge"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={reducedMotion ? undefined : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="demo-transition-line"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleX: 0, opacity: 0.3 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={reducedMotion ? undefined : { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="demo-transition-copy">
            <span className="demo-transition-dot" aria-hidden="true" />
            <p>A better conversation starts with the right context.</p>
          </div>
          <motion.span
            className="demo-transition-line"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleX: 0, opacity: 0.3 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={reducedMotion ? undefined : { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <div className="demo-progress" aria-label={`Demo request progress: step ${step} of 4`}>
          {progressSteps.map(([number, label], index) => {
            const position = index + 1
            return (
              <div
                className={`demo-progress-item ${position === step ? 'is-current' : ''} ${position < step ? 'is-complete' : ''}`}
                key={number}
                aria-current={position === step ? 'step' : undefined}
              >
                <span>{position < step ? <Check aria-hidden="true" /> : number}</span>
                <strong>{label}</strong>
              </div>
            )
          })}
        </div>

        <div className="demo-booking-layout">
          <aside className="demo-booking-context">
            <span className="eyebrow">A more relevant conversation</span>
            <h2 id="demo-booking-title">
              <span>Let&apos;s see if NourDoc</span>
              <span>is the right fit for</span>
              <span>your team.</span>
            </h2>
            <p>
              Share a few details so our founders can understand your workflow
              and respond with real relevance.
            </p>
            <div className="demo-context-rule" aria-hidden="true">
              <span>Built around your workflow</span>
            </div>
            <div className="demo-context-highlights" aria-label="Demo request highlights">
              <span>
                <CalendarClock aria-hidden="true" />
                Guided request
              </span>
              <span>
                <Workflow aria-hidden="true" />
                Clinical workflow fit
              </span>
              <span>
                <ShieldCheck aria-hidden="true" />
                Privacy-minded intake
              </span>
            </div>
            <div className="demo-context-note">
              <CalendarClock aria-hidden="true" />
              <div>
                <strong>Takes around 2 minutes.</strong>
                <span>Please do not include patient-identifiable information.</span>
              </div>
            </div>
          </aside>

          <div className="demo-booking-panel">
            {submitted ? (
              <motion.div
                className="demo-success"
                ref={successRef}
                role="status"
                tabIndex={-1}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
              >
                <span className="eyebrow">Demo request received</span>
                <span className="demo-success-mark" aria-hidden="true"><Check /></span>
                <h2>Thank you. We’ll take it from here.</h2>
                <p>
                  Our team will review your requirements and contact you to arrange
                  the most relevant NourDoc demonstration.
                </p>
                <div className="demo-success-actions">
                  <Link to="/" className="button button-primary">
                    Return to NourDoc
                    <ArrowRight />
                  </Link>
                  {schedulingUrl && (
                    <a className="button button-secondary" href={schedulingUrl}>
                      Choose a meeting time
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <form className="demo-booking-form" noValidate onSubmit={submitCurrentStep}>
                <div className="demo-panel-header">
                  <div>
                    <span className="demo-panel-kicker">Book a Demo</span>
                    <div className="demo-step-position">Step {step} of 4</div>
                  </div>
                  <div className="demo-panel-meta" aria-label="Demo flow summary">
                    <span>Focused intake</span>
                    <span>4 short steps</span>
                  </div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    className="demo-step demo-step-frame"
                    initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                    transition={transition}
                  >
                    {step === 1 && (
                      <>
                        <h2 ref={headingRef} tabIndex={-1}>Tell us about your organisation</h2>
                        <p className="demo-step-intro">Choose the option that best reflects your care environment.</p>
                        <fieldset className="demo-option-fieldset">
                          <legend className="sr-only">Organisation type</legend>
                          <div className="demo-option-grid demo-organisation-grid">
                            {organisationOptions.map(({ label, icon: Icon }) => {
                              const selected = data.organisationType === label
                              return (
                                <button
                                  key={label}
                                  type="button"
                                  className={`demo-option-card ${selected ? 'is-selected' : ''}`}
                                  aria-pressed={selected}
                                  aria-invalid={Boolean(errors.organisationType)}
                                  aria-describedby={errors.organisationType ? 'organisation-type-error' : undefined}
                                  onClick={() => selectOrganisation(label)}
                                >
                                  <Icon aria-hidden="true" />
                                  <span>{label}</span>
                                  <i aria-hidden="true">{selected && <Check />}</i>
                                </button>
                              )
                            })}
                          </div>
                          {errors.organisationType && (
                            <p id="organisation-type-error" className="demo-field-error" role="alert">
                              {errors.organisationType}
                            </p>
                          )}
                        </fieldset>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 ref={headingRef} tabIndex={-1}>What would you like to explore?</h2>
                        <p className="demo-step-intro">Select every area that would make the demonstration useful.</p>
                        <fieldset className="demo-option-fieldset">
                          <legend className="sr-only">Demo interests</legend>
                          <div className="demo-option-grid demo-interest-grid">
                            {interestOptions.map(({ label, icon: Icon }) => {
                              const selected = data.interests.includes(label)
                              return (
                                <button
                                  key={label}
                                  type="button"
                                  className={`demo-option-card ${selected ? 'is-selected' : ''}`}
                                  aria-pressed={selected}
                                  aria-invalid={Boolean(errors.interests)}
                                  aria-describedby={errors.interests ? 'demo-interests-error' : undefined}
                                  onClick={() => toggleInterest(label)}
                                >
                                  <Icon aria-hidden="true" />
                                  <span>{label}</span>
                                  <i aria-hidden="true">{selected && <Check />}</i>
                                </button>
                              )
                            })}
                          </div>
                          {errors.interests && (
                            <p id="demo-interests-error" className="demo-field-error" role="alert">
                              {errors.interests}
                            </p>
                          )}
                        </fieldset>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h2 ref={headingRef} tabIndex={-1}>Tell us where to reach you</h2>
                        <p className="demo-step-intro">We’ll use these details only to arrange your NourDoc demonstration.</p>
                        <div className="demo-details-grid">
                          <label>
                            Full Name
                            <input
                              value={data.fullName}
                              onChange={updateField('fullName')}
                              autoComplete="name"
                              aria-invalid={Boolean(errors.fullName)}
                              aria-describedby={errors.fullName ? 'demo-name-error' : undefined}
                              required
                            />
                            {errors.fullName && <span id="demo-name-error" className="demo-field-error" role="alert">{errors.fullName}</span>}
                          </label>
                          <label>
                            Work Email
                            <input
                              value={data.email}
                              onChange={updateField('email')}
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? 'demo-email-error' : undefined}
                              required
                            />
                            {errors.email && <span id="demo-email-error" className="demo-field-error" role="alert">{errors.email}</span>}
                          </label>
                          <label>
                            Organisation
                            <input
                              value={data.organisation}
                              onChange={updateField('organisation')}
                              autoComplete="organization"
                              aria-invalid={Boolean(errors.organisation)}
                              aria-describedby={errors.organisation ? 'demo-organisation-error' : undefined}
                              required
                            />
                            {errors.organisation && <span id="demo-organisation-error" className="demo-field-error" role="alert">{errors.organisation}</span>}
                          </label>
                          <label>
                            Phone / WhatsApp <span>(optional)</span>
                            <input
                              value={data.phone}
                              onChange={updateField('phone')}
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                            />
                          </label>
                          <label className="demo-details-full">
                            Role / Job Title <span>(optional)</span>
                            <input
                              value={data.role}
                              onChange={updateField('role')}
                              autoComplete="organization-title"
                            />
                          </label>
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h2 ref={headingRef} tabIndex={-1}>Anything we should know before the demo?</h2>
                        <p className="demo-step-intro">A little context helps us prepare the most relevant conversation.</p>
                        <label className="demo-message-field">
                          Short message / requirements <span>(optional)</span>
                          <textarea
                            value={data.message}
                            onChange={updateField('message')}
                            rows={4}
                            placeholder="Tell us about your workflow, priorities or integration environment."
                          />
                        </label>
                        <fieldset className="demo-option-fieldset demo-timing-fieldset">
                          <legend>Preferred demo timing</legend>
                          <div className="demo-timing-grid">
                            {timingOptions.map((timing) => {
                              const selected = data.preferredTiming === timing
                              return (
                                <button
                                  key={timing}
                                  type="button"
                                  className={`demo-timing-option ${selected ? 'is-selected' : ''}`}
                                  aria-pressed={selected}
                                  aria-invalid={Boolean(errors.preferredTiming)}
                                  aria-describedby={errors.preferredTiming ? 'demo-timing-error' : undefined}
                                  onClick={() => selectTiming(timing)}
                                >
                                  {timing}
                                  {selected && <Check aria-hidden="true" />}
                                </button>
                              )
                            })}
                          </div>
                          {errors.preferredTiming && (
                            <p id="demo-timing-error" className="demo-field-error" role="alert">
                              {errors.preferredTiming}
                            </p>
                          )}
                        </fieldset>

                        <div className="recaptcha-field demo-recaptcha-field">
                          <div className="recaptcha-frame">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={recaptchaSiteKey}
                              onChange={(token: string | null) => {
                                setRecaptchaToken(token)
                                if (token) setErrors((current) => ({ ...current, recaptcha: undefined }))
                              }}
                              onExpired={() => setRecaptchaToken(null)}
                              onErrored={() => setRecaptchaToken(null)}
                            />
                          </div>
                          {errors.recaptcha && (
                            <p className="demo-field-error" role="alert">{errors.recaptcha}</p>
                          )}
                        </div>
                        {submitError && <p className="demo-submit-error" role="alert">{submitError}</p>}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="demo-actions">
                  {step > 1 ? (
                    <button className="button demo-back-button" type="button" onClick={goBack} disabled={isSubmitting}>
                      <ArrowLeft />
                      Back
                    </button>
                  ) : <span />}
                  {step < 4 ? (
                    <button className="button button-primary" type="submit">
                      Continue
                      <ArrowRight />
                    </button>
                  ) : (
                    <button
                      className="button button-primary"
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? 'Sending request…' : 'Request Demo'}
                      <ArrowRight />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
