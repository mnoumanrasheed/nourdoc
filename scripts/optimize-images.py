from pathlib import Path
from PIL import Image


SOURCE_DIR = Path("src/assets")
OUTPUT_DIR = Path("public/images")
SOURCES = [
    "01-home-clinical-conversation.jpg",
    "02-why-nourdoc-local-clinician-web.jpg",
    "03-product-clinical-workflow.jpg",
    "04-healthcare-impact-patient-care.jpg",
    "05-security-clinical-data-workflow.jpg",
    "06-partners-healthcare-collaboration.jpg",
    "07-about-nourdoc-local-doctor-web.jpg",
    "international-consultation.jpg",
    "pakistani-consultation.jpg",
]


def target_widths(source_width: int) -> list[int]:
    widths = [width for width in (480, 768, 1200, 1600) if width <= source_width]
    if source_width >= 1920:
        widths.append(1920)
    elif source_width >= 1800:
        widths.append(1800)
    elif source_width < 1600:
        widths.append(source_width)
    return sorted(set(widths))


OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

for source_name in SOURCES:
    source_path = SOURCE_DIR / source_name
    slug = source_path.stem

    with Image.open(source_path) as source:
        source = source.convert("RGB")
        source_width, source_height = source.size

        for width in target_widths(source_width):
            height = round(source_height * width / source_width)
            resized = source if width == source_width else source.resize((width, height), Image.Resampling.LANCZOS)

            resized.save(
                OUTPUT_DIR / f"{slug}-{width}.webp",
                "WEBP",
                quality=76,
                method=6,
                optimize=True,
            )
            resized.save(
                OUTPUT_DIR / f"{slug}-{width}.avif",
                "AVIF",
                quality=48,
                speed=6,
            )
