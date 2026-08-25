export type ResponsiveImageAsset = {
  src: string
  avifSrcSet: string
  webpSrcSet: string
  width: number
  height: number
}

function responsiveImage(
  name: string,
  width: number,
  height: number,
  widths: number[],
): ResponsiveImageAsset {
  const srcSet = (format: 'avif' | 'webp') => widths
    .map((candidate) => `/images/${name}-${candidate}.${format} ${candidate}w`)
    .join(', ')

  const largest = widths.at(-1)!
  return {
    src: `/images/${name}-${largest}.webp`,
    avifSrcSet: srcSet('avif'),
    webpSrcSet: srcSet('webp'),
    width,
    height,
  }
}

export const homeConsultationImage = responsiveImage(
  '01-home-clinical-conversation',
  1800,
  1173,
  [480, 768, 1200, 1600, 1800],
)

export const whyNourDocImage = responsiveImage(
  '02-why-nourdoc-local-clinician-web',
  2400,
  1600,
  [480, 768, 1200, 1600, 1920],
)

export const productWorkflowImage = responsiveImage(
  '03-product-clinical-workflow',
  1800,
  1196,
  [480, 768, 1200, 1600, 1800],
)

export const healthcareImpactImage = responsiveImage(
  '04-healthcare-impact-patient-care',
  1800,
  1200,
  [480, 768, 1200, 1600, 1800],
)

export const securityWorkflowImage = responsiveImage(
  '05-security-clinical-data-workflow',
  1800,
  1012,
  [480, 768, 1200, 1600, 1800],
)

export const partnersImage = responsiveImage(
  '06-partners-healthcare-collaboration',
  1800,
  1200,
  [480, 768, 1200, 1600, 1800],
)

export const aboutDoctorImage = responsiveImage(
  '07-about-nourdoc-local-doctor-web',
  1536,
  1024,
  [480, 768, 1200, 1536],
)

export const internationalConsultationImage = responsiveImage(
  'international-consultation',
  1693,
  929,
  [480, 768, 1200, 1600],
)

export const pakistaniConsultationImage = responsiveImage(
  'pakistani-consultation',
  1691,
  930,
  [480, 768, 1200, 1600],
)
