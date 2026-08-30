from pathlib import Path
from PIL import Image


OUTPUT_DIR = Path("public/images")
TARGET_WIDTHS = (480, 960, 1600)
RESPONSIVE_SOURCES = [
    Path("src/assets/01-home-clinical-conversation.jpg"),
    Path("src/assets/02-why-nourdoc-local-clinician-web.jpg"),
    Path("src/assets/03-product-clinical-workflow.jpg"),
    Path("src/assets/04-healthcare-impact-patient-care.jpg"),
    Path("src/assets/05-security-clinical-data-workflow.jpg"),
    Path("src/assets/06-partners-healthcare-collaboration.jpg"),
    Path("src/assets/07-about-nourdoc-local-doctor-web.jpg"),
    Path("src/assets/international-consultation.jpg"),
    Path("src/assets/pakistani-consultation.jpg"),
    Path("public/images/08_product-hero-ambient-listening.jpg"),
    Path("public/images/09_clinical-attention-human-conversation.jpg"),
    Path("public/images/11_global-healthcare-readiness.jpg"),
    Path("public/images/12_book-demo-hero-background.jpg"),
]


def target_widths(source_width: int) -> list[int]:
    return [width for width in TARGET_WIDTHS if width <= source_width]


OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

for source_path in RESPONSIVE_SOURCES:
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
                quality=78 if width == 1600 else 74,
                method=6,
                optimize=True,
            )
