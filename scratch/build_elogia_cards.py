import os
from PIL import Image, ImageOps, ImageEnhance, ImageDraw, ImageFilter

os.makedirs('public/elogia', exist_ok=True)

def process_card(src_path, crop_box, out_path, is_negative=False):
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found")
        return
    
    im = Image.open(src_path).convert('RGB')
    w, h = im.size
    
    # Absolute crop
    box = (
        int(w * crop_box[0]),
        int(h * crop_box[1]),
        int(w * crop_box[2]),
        int(h * crop_box[3])
    )
    cropped = im.crop(box)
    
    # Fit into 600x480
    fitted = ImageOps.fit(cropped, (600, 480), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    
    if is_negative:
        # Subtle desaturation / cool tint for "Evita" cards
        enhancer = ImageEnhance.Color(fitted)
        fitted = enhancer.enhance(0.9)
    else:
        # Warm, vibrant color for "Puedes decir o hacer" cards
        enhancer = ImageEnhance.Color(fitted)
        fitted = enhancer.enhance(1.05)
        
    fitted.save(out_path, 'PNG', quality=95)
    print(f"Created {out_path}")

# ==========================================
# 5. PUEDES DECIR O HACER (4 tarjetas)
# ==========================================

# 1. card_accion_exacta: child hands with paintbrushes in jar
# From illustration_elige.png: table is center-bottom, brushes jar is in the middle
process_card('public/elogia/illustration_elige.png', (0.42, 0.38, 0.88, 0.90), 'public/elogia/card_accion_exacta.png')

# 2. card_en_caliente: Mother praising in real time
# From demo_panel_1.png: mother's warm praising face and open arms
process_card('public/elogia/demo_panel_1.png', (0.18, 0.05, 0.65, 0.85), 'public/elogia/card_en_caliente.png')

# 3. card_calidez_fisica: High five close up
# From demo_panel_2.png: the high-five and joyful smiles
process_card('public/elogia/demo_panel_2.png', (0.18, 0.08, 0.78, 0.85), 'public/elogia/card_calidez_fisica.png')

# 4. card_valora_esfuerzo: Child proudly showing drawing
# From practica_tarea.png: child with drawing and crayon
process_card('public/elogia/practica_tarea.png', (0.48, 0.15, 0.88, 0.92), 'public/elogia/card_valora_esfuerzo.png')

# ==========================================
# 6. EVITA (4 tarjetas)
# ==========================================

# 1. card_el_pero: Child looking rushed / hesitant
process_card('public/habla_claro/thumb_opt_c.png', (0.0, 0.0, 1.0, 1.0), 'public/elogia/card_el_pero.png', is_negative=True)

# 2. card_sarcasmo: Frowning / sarcastic parent
process_card('public/habla_claro/card_a_distancia.png', (0.05, 0.05, 0.95, 0.95), 'public/elogia/card_sarcasmo.png', is_negative=True)

# 3. card_elogio_vago: Mother walking past distractedly with grocery bag
process_card('public/elogia/illustration_mira.png', (0.12, 0.12, 0.45, 0.88), 'public/elogia/card_elogio_vago.png', is_negative=True)

# 4. card_postergar: Night window with crescent moon (late hours)
process_card('public/se_constante/illustration_intro.png', (0.64, 0.02, 0.86, 0.40), 'public/elogia/card_postergar.png', is_negative=True)
