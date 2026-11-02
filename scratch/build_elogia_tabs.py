import os
from PIL import Image, ImageDraw, ImageOps, ImageFilter, ImageEnhance

os.makedirs('public/elogia', exist_ok=True)

def create_rich_tab_icon(icon_type, out_path):
    # Size 200x200 RGBA
    img = Image.new('RGBA', (200, 200), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Soft warm rounded container
    draw.rounded_rectangle([(8, 8), (192, 192)], radius=36, fill=(255, 251, 235, 255), outline=(254, 215, 170, 255), width=3)
    
    # Soft background circle
    draw.ellipse([(35, 30), (165, 160)], fill=(254, 240, 138, 160))
    
    if icon_type == 'tarea':
        # Open notebook / book with colorful pages and pencil
        # Book pages
        draw.polygon([(45, 135), (95, 145), (95, 65), (45, 55)], fill=(255, 255, 255, 255), outline=(203, 213, 225, 255))
        draw.polygon([(155, 135), (105, 145), (105, 65), (155, 55)], fill=(255, 255, 255, 255), outline=(203, 213, 225, 255))
        # Book spine
        draw.rectangle([(95, 65), (105, 145)], fill=(59, 130, 246, 255))
        # Lines on left page
        for y in range(75, 130, 12):
            draw.line([(55, y), (88, y+3)], fill=(148, 163, 184, 255), width=2)
        # Lines on right page
        for y in range(75, 130, 12):
            draw.line([(112, y+3), (145, y)], fill=(148, 163, 184, 255), width=2)
        # Golden star sticker on right page
        draw.polygon([(135, 80), (138, 87), (145, 87), (139, 92), (142, 98), (135, 94), (128, 98), (131, 92), (125, 87), (132, 87)], fill=(245, 158, 11, 255))
        # Pencil across bottom
        draw.polygon([(60, 150), (140, 150), (145, 145), (140, 140), (60, 140)], fill=(234, 179, 8, 255))
        draw.polygon([(50, 145), (60, 150), (60, 140)], fill=(253, 224, 71, 255))
        draw.point((48, 145), fill=(15, 23, 42, 255))

    elif icon_type == 'ropa':
        # Neat pair of colorful sneakers / shoes
        # Shoe 1
        draw.rounded_rectangle([(45, 95), (105, 135)], radius=14, fill=(59, 130, 246, 255), outline=(37, 99, 235, 255), width=2)
        draw.ellipse([(85, 105), (125, 135)], fill=(59, 130, 246, 255))
        draw.rounded_rectangle([(45, 125), (125, 138)], radius=6, fill=(255, 255, 255, 255), outline=(203, 213, 225, 255), width=2)
        # Shoe 1 laces
        draw.line([(70, 100), (85, 105)], fill=(255, 255, 255, 255), width=3)
        draw.line([(70, 110), (85, 115)], fill=(255, 255, 255, 255), width=3)

        # Shoe 2 (offset slightly)
        draw.rounded_rectangle([(95, 65), (155, 105)], radius=14, fill=(249, 115, 22, 255), outline=(234, 88, 12, 255), width=2)
        draw.ellipse([(135, 75), (175, 105)], fill=(249, 115, 22, 255))
        draw.rounded_rectangle([(95, 95), (175, 108)], radius=6, fill=(255, 255, 255, 255), outline=(203, 213, 225, 255), width=2)
        # Shoe 2 laces
        draw.line([(120, 70), (135, 75)], fill=(255, 255, 255, 255), width=3)
        draw.line([(120, 80), (135, 85)], fill=(255, 255, 255, 255), width=3)

    elif icon_type == 'calma':
        # Calming alphabet blocks & breathing sparkle
        # Block 1 (bottom left, red)
        draw.rounded_rectangle([(45, 95), (95, 145)], radius=8, fill=(239, 68, 68, 255), outline=(220, 38, 38, 255), width=2)
        # Block 2 (bottom right, blue)
        draw.rounded_rectangle([(105, 95), (155, 145)], radius=8, fill=(59, 130, 246, 255), outline=(37, 99, 235, 255), width=2)
        # Block 3 (top center, green)
        draw.rounded_rectangle([(75, 45), (125, 95)], radius=8, fill=(16, 185, 129, 255), outline=(5, 150, 105, 255), width=2)
        # Letters A, B, C
        draw.line([(95, 58), (105, 82)], fill=(255, 255, 255, 255), width=3)
        draw.line([(105, 58), (95, 82)], fill=(255, 255, 255, 255), width=3)
        # Gentle calm sparkle at top
        draw.polygon([(100, 22), (103, 30), (111, 33), (103, 36), (100, 44), (97, 36), (89, 33), (97, 30)], fill=(245, 158, 11, 255))

    elif icon_type == 'mesa':
        # Colorful soup bowl with spoon
        # Bowl
        draw.chord([(45, 60), (155, 150)], 0, 180, fill=(245, 158, 11, 255), outline=(217, 119, 6, 255), width=3)
        # Inner soup surface
        draw.ellipse([(48, 85), (152, 110)], fill=(254, 215, 170, 255))
        # Veggie garnish in soup
        draw.ellipse([(70, 93), (80, 102)], fill=(16, 185, 129, 255))
        draw.ellipse([(95, 90), (103, 98)], fill=(239, 68, 68, 255))
        draw.ellipse([(118, 94), (128, 102)], fill=(234, 179, 8, 255))
        # Bowl base
        draw.rectangle([(80, 148), (120, 156)], fill=(217, 119, 6, 255))
        # Spoon
        draw.ellipse([(130, 45), (155, 75)], fill=(203, 213, 225, 255), outline=(148, 163, 184, 255), width=2)
        draw.polygon([(140, 68), (155, 130), (160, 128), (145, 66)], fill=(148, 163, 184, 255))

    img.save(out_path, 'PNG')
    print(f"Created {out_path}")

create_rich_tab_icon('tarea', 'public/elogia/tab_tarea.png')
create_rich_tab_icon('ropa', 'public/elogia/tab_ropa.png')
create_rich_tab_icon('calma', 'public/elogia/tab_calma.png')
create_rich_tab_icon('mesa', 'public/elogia/tab_mesa.png')
