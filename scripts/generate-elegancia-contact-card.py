from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

BASE_DIR = Path(__file__).resolve().parents[1]
INPUT_IMAGE = BASE_DIR / "public" / "images" / "elegancia" / "brand-logo-elegancia.png"
OUTPUT_IMAGE = BASE_DIR / "public" / "images" / "elegancia" / "brand-contact-premium.webp"

INSTAGRAM_HANDLE = "@masilva_arcs"
ADDRESS_LINE = "R. Pereira Passos, 31 - COHAB B"
CITY_LINE = "Gravatai - RS, 94040-230"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/seguibl.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]

    for candidate in candidates:
        font_path = Path(candidate)
        if font_path.exists():
            return ImageFont.truetype(str(font_path), size=size)

    return ImageFont.load_default()


def draw_glow_text(draw: ImageDraw.ImageDraw, position: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int]) -> None:
    x, y = position
    glow_color = (12, 5, 2)
    for dx, dy in [(-2, 0), (2, 0), (0, -2), (0, 2), (-1, -1), (1, 1)]:
        draw.text((x + dx, y + dy), text, font=font, fill=glow_color)
    draw.text((x, y), text, font=font, fill=fill)


def main() -> None:
    if not INPUT_IMAGE.exists():
        raise FileNotFoundError(f"Base image not found: {INPUT_IMAGE}")

    base = Image.open(INPUT_IMAGE).convert("RGB")
    width, height = base.size

    # Slightly dim the original logo composition to make contact data stand out.
    base = ImageEnhance.Brightness(base).enhance(0.88)

    footer_height = int(height * 0.32)
    footer_top = height - footer_height

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)

    for i in range(footer_height):
        alpha = int(60 + (185 * (i / max(1, footer_height - 1))))
        overlay_draw.rectangle([(0, footer_top + i), (width, footer_top + i + 1)], fill=(8, 3, 2, alpha))

    accent_y = footer_top + 12
    overlay_draw.rounded_rectangle(
        [(40, accent_y), (width - 40, accent_y + 8)],
        radius=4,
        fill=(214, 178, 94, 230),
    )

    card = Image.alpha_composite(base.convert("RGBA"), overlay)
    card = card.filter(ImageFilter.GaussianBlur(radius=0.15))
    draw = ImageDraw.Draw(card)

    title_font = load_font(54, bold=True)
    line_font = load_font(40, bold=True)
    subtle_font = load_font(34, bold=False)

    title_y = footer_top + 34
    draw_glow_text(draw, (55, title_y), "ENDERECO PREMIUM", title_font, (237, 199, 114))

    pin_x = 58
    pin_y = title_y + 80
    draw.ellipse([(pin_x, pin_y), (pin_x + 28, pin_y + 28)], fill=(214, 178, 94))
    draw.ellipse([(pin_x + 8, pin_y + 8), (pin_x + 20, pin_y + 20)], fill=(56, 23, 14))

    draw_glow_text(draw, (100, title_y + 72), ADDRESS_LINE, line_font, (247, 227, 180))
    draw_glow_text(draw, (100, title_y + 122), CITY_LINE, subtle_font, (225, 196, 139))

    ig_block_w = 390
    ig_block_h = 106
    ig_x = width - ig_block_w - 58
    ig_y = footer_top + 98

    draw.rounded_rectangle(
        [(ig_x, ig_y), (ig_x + ig_block_w, ig_y + ig_block_h)],
        radius=22,
        fill=(31, 12, 8),
        outline=(214, 178, 94),
        width=3,
    )

    icon_x = ig_x + 24
    icon_y = ig_y + 24
    draw.rounded_rectangle(
        [(icon_x, icon_y), (icon_x + 58, icon_y + 58)],
        radius=14,
        fill=(214, 178, 94),
    )
    draw.text((icon_x + 14, icon_y + 12), "IG", font=load_font(28, bold=True), fill=(34, 13, 8))

    handle_font = load_font(34, bold=True)
    draw_glow_text(draw, (icon_x + 76, ig_y + 33), INSTAGRAM_HANDLE, handle_font, (249, 231, 190))

    OUTPUT_IMAGE.parent.mkdir(parents=True, exist_ok=True)
    card.convert("RGB").save(OUTPUT_IMAGE, format="WEBP", quality=94, method=6)

    print(f"Generated: {OUTPUT_IMAGE}")


if __name__ == "__main__":
    main()
