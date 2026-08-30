export type ResponsiveImageAsset = {
  src: string
  webpSrcSet: string
  width: number
  height: number
}

function responsiveImage(
  name: string,
  width: number,
  height: number,
): ResponsiveImageAsset {
  const widths = [480, 960, 1600]
  const webpSrcSet = widths
    .map((candidate) => `/images/${name}-${candidate}.webp ${candidate}w`)
    .join(', ')

  return {
    src: `/images/${name}-1600.webp`,
    webpSrcSet,
    width,
    height,
  }
}

export const homeConsultationImage = responsiveImage(
  '01-home-clinical-conversation',
  1800,
  1173,
)

export const whyNourDocImage = responsiveImage(
  '02-why-nourdoc-local-clinician-web',
  2400,
  1600,
)

export const productWorkflowImage = responsiveImage(
  '03-product-clinical-workflow',
  1800,
  1196,
)

export const healthcareImpactImage = responsiveImage(
  '04-healthcare-impact-patient-care',
  1800,
  1200,
)

export const securityWorkflowImage = responsiveImage(
  '05-security-clinical-data-workflow',
  1800,
  1012,
)

export const partnersImage = responsiveImage(
  '06-partners-healthcare-collaboration',
  1800,
  1200,
)

export const aboutDoctorImage = responsiveImage(
  '07-about-nourdoc-local-doctor-web',
  1536,
  1024,
)

export const internationalConsultationImage = responsiveImage(
  'international-consultation',
  1693,
  929,
)

export const pakistaniConsultationImage = responsiveImage(
  'pakistani-consultation',
  1691,
  930,
)

export const moreTimeForCareImage = responsiveImage(
  '01_more-time-for-care',
  3840,
  2160,
)

export const clinicianControlImage = responsiveImage(
  '02_clinician-control',
  3840,
  2160,
)

export const patientExperienceImage = responsiveImage(
  '03_patient-experience',
  3840,
  2160,
)

export const evidenceAndTrustImage = responsiveImage(
  '04_evidence-and-trust',
  6720,
  4480,
)

export const humanMomentImage = responsiveImage(
  '05_about-human-moment',
  3000,
  2000,
)

export const productAmbientListeningImage = responsiveImage(
  '08_product-hero-ambient-listening',
  1600,
  1200,
)

export const clinicalAttentionImage = responsiveImage(
  '09_clinical-attention-human-conversation',
  1600,
  1200,
)

export const globalHealthcareReadinessImage = responsiveImage(
  '11_global-healthcare-readiness',
  1600,
  1200,
)
