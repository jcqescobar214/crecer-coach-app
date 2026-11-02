import os
import shutil
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

os.makedirs('public/elogia', exist_ok=True)
brain_dir = 'C:/Users/jcqes/.gemini/antigravity/brain/f931adf0-ae7b-40d8-8e7e-23a34f97ee90'

# 1. Step 2 Illustration: elogia_illustration_elige
elige_src = os.path.join(brain_dir, 'elogia_illustration_elige_1793641561539.jpg')
if os.path.exists(elige_src):
    img_elige = Image.open(elige_src).convert('RGB')
    img_elige.save('public/elogia/illustration_elige.png', 'PNG', quality=95)
    print("Saved public/elogia/illustration_elige.png")

# 2. Step 2 Thumbnails:
# thumb_opt_a: Reproach / impatience (crop mother pointing from habla_claro)
if os.path.exists('public/habla_claro/thumb_opt_a.png'):
    thumb_a = Image.open('public/habla_claro/thumb_opt_a.png').convert('RGB')
    thumb_a = thumb_a.resize((240, 240), Image.Resampling.LANCZOS)
    thumb_a.save('public/elogia/thumb_opt_a.png', 'PNG')
    print("Saved public/elogia/thumb_opt_a.png")

# thumb_opt_b: Joyful mother looking at child / brushes (crop from illustration_elige)
if os.path.exists(elige_src):
    img_elige = Image.open(elige_src).convert('RGB')
    # Mother's smiling face and upper body is roughly at left: x: 180 to 520, y: 150 to 500
    w, h = img_elige.size
    crop_b = img_elige.crop((int(w * 0.15), int(h * 0.12), int(w * 0.42), int(h * 0.55)))
    crop_b = crop_b.resize((240, 240), Image.Resampling.LANCZOS)
    crop_b.save('public/elogia/thumb_opt_b.png', 'PNG')
    print("Saved public/elogia/thumb_opt_b.png")

# thumb_opt_c: Hesitant / overwhelmed child (crop from habla_claro thumb_opt_c)
if os.path.exists('public/habla_claro/thumb_opt_c.png'):
    thumb_c = Image.open('public/habla_claro/thumb_opt_c.png').convert('RGB')
    thumb_c = thumb_c.resize((240, 240), Image.Resampling.LANCZOS)
    thumb_c.save('public/elogia/thumb_opt_c.png', 'PNG')
    print("Saved public/elogia/thumb_opt_c.png")

# 3. Step 3 Demo Panels:
# demo_panel_1: Sharing pencils / colors drawing
panel1_src = os.path.join(brain_dir, 'test_quota_1793641509681.jpg')
if os.path.exists(panel1_src):
    p1 = Image.open(panel1_src).convert('RGB')
    # Resize to widescreen 1264x720 or 1024x576
    p1_wide = p1.crop((0, int(p1.height * 0.05), p1.width, int(p1.height * 0.85)))
    p1_wide = p1_wide.resize((1264, 720), Image.Resampling.LANCZOS)
    p1_wide.save('public/elogia/demo_panel_1.png', 'PNG')
    print("Saved public/elogia/demo_panel_1.png")

# demo_panel_2: High five celebration for putting things in place
intro_src = 'public/elogia/illustration_intro.png'
if os.path.exists(intro_src):
    p2 = Image.open(intro_src).convert('RGB')
    # Crop central area with the high-five
    w, h = p2.size
    p2_crop = p2.crop((int(w * 0.25), int(h * 0.15), int(w * 0.88), int(h * 0.90)))
    p2_crop = p2_crop.resize((1264, 720), Image.Resampling.LANCZOS)
    p2_crop.save('public/elogia/demo_panel_2.png', 'PNG')
    print("Saved public/elogia/demo_panel_2.png")

# 4. Step 4 Practice Situation Banners:
# 4.1 Mesa: Eating soup with spoon
if os.path.exists('public/habla_claro/practica_mesa.png'):
    mesa = Image.open('public/habla_claro/practica_mesa.png').convert('RGB')
    # Warm amber glow enhancement
    enhancer = ImageEnhance.Color(mesa)
    mesa_warm = enhancer.enhance(1.05)
    mesa_warm.save('public/elogia/practica_mesa.png', 'PNG')
    print("Saved public/elogia/practica_mesa.png")

# 4.2 Calma: Blocks and self control
if os.path.exists('public/habla_claro/practica_juguetes.png'):
    calma = Image.open('public/habla_claro/practica_juguetes.png').convert('RGB')
    calma.save('public/elogia/practica_calma.png', 'PNG')
    print("Saved public/elogia/practica_calma.png")

# 4.3 Ropa: Putting shoes / clothes away
# Let's crop from illustration_intro or illustration_mira where shelves and storage basket are visible
if os.path.exists('public/elogia/illustration_intro.png'):
    intro_img = Image.open('public/elogia/illustration_intro.png').convert('RGB')
    # Left side shows bookcase with toys and neatly placed shoes/basket
    w, h = intro_img.size
    ropa_crop = intro_img.crop((int(w * 0.10), int(h * 0.15), int(w * 0.85), int(h * 0.85)))
    ropa_crop = ropa_crop.resize((1264, 720), Image.Resampling.LANCZOS)
    ropa_crop.save('public/elogia/practica_ropa.png', 'PNG')
    print("Saved public/elogia/practica_ropa.png")

# 4.4 Tarea: Homework desk
if os.path.exists(panel1_src):
    tarea_img = Image.open(panel1_src).convert('RGB')
    tarea_crop = tarea_img.crop((int(tarea_img.width * 0.1), int(tarea_img.height * 0.1), int(tarea_img.width * 0.9), int(tarea_img.height * 0.9)))
    tarea_crop = tarea_crop.resize((1264, 720), Image.Resampling.LANCZOS)
    tarea_crop.save('public/elogia/practica_tarea.png', 'PNG')
    print("Saved public/elogia/practica_tarea.png")

# 5. Tab Icons (tarea, ropa, calma, mesa)
def create_tab_icon(title, symbol, color_hex, out_path):
    # Create 180x160 clean tab icon in CrecerCoach aesthetic
    size = (180, 160)
    img = Image.new('RGBA', size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded container
    draw.rounded_rectangle([(4, 4), (size[0]-4, size[1]-4)], radius=24, fill=(254, 252, 232, 255), outline=(253, 224, 71, 255), width=3)
    
    # Inner soft circle
    circle_box = [(45, 20), (135, 110)]
    draw.ellipse(circle_box, fill=(254, 240, 138, 200))
    
    # We can save as PNG
    img.save(out_path, 'PNG')

create_tab_icon('Tarea', '📚', '#EAB308', 'public/elogia/tab_tarea.png')
create_tab_icon('Ropa', '👟', '#EAB308', 'public/elogia/tab_ropa.png')
create_tab_icon('Calma', '🧘', '#EAB308', 'public/elogia/tab_calma.png')
create_tab_icon('Mesa', '🥣', '#EAB308', 'public/elogia/tab_mesa.png')
print("Created tab icons")
