from pathlib import Path

from PIL import Image


OUTPUT_DIR = Path('public/images')
SLUGS = (
    '01-home-clinical-conversation',
    '02-why-nourdoc-local-clinician-web',
    '03-product-clinical-workflow',
    '04-healthcare-impact-patient-care',
    '05-security-clinical-data-workflow',
    '06-partners-healthcare-collaboration',
    '07-about-nourdoc-local-doctor-web',
    'international-consultation',
    'pakistani-consultation',
    '01_more-time-for-care',
    '02_clinician-control',
    '03_patient-experience',
    '04_evidence-and-trust',
    '05_about-human-moment',
    '08_product-hero-ambient-listening',
    '09_clinical-attention-human-conversation',
    '11_global-healthcare-readiness',
    '12_book-demo-hero-background',
)


for slug in SLUGS:
    source_path = Path('src/assets') / f'{slug}.jpg'
    if not source_path.exists():
        source_path = OUTPUT_DIR / f'{slug}-1600.webp'

    with Image.open(source_path) as source:
        source = source.convert('RGB')
        widths = (480, 960, 1600) if slug == '12_book-demo-hero-background' else (1600,)

        for requested_width in widths:
            width = min(requested_width, source.width)
            height = round(source.height * width / source.width)
            fallback = source if width == source.width else source.resize(
                (width, height),
                Image.Resampling.LANCZOS,
            )
            fallback.save(
                OUTPUT_DIR / f'{slug}-{requested_width}.jpg',
                'JPEG',
                quality=84,
                progressive=True,
                optimize=True,
            )
