import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import numpy as np

def build_all():
    print("Iniciando generacion de brand assets...")
    
    # -------------------------------------------------------------
    # 1. AISLAR MASCOTA CON ALFA LIMPIO
    # -------------------------------------------------------------
    src_mascot = 'public/coach_mascot.png'
    im_raw = Image.open(src_mascot).convert('RGB')
    arr = np.array(im_raw).astype(float)
    
    # Fondo off-white alrededor de (242, 242, 242)
    bg_col = np.array([242.0, 242.0, 242.0])
    dist = np.linalg.norm(arr - bg_col, axis=2)
    
    alpha = np.clip((dist - 12.0) / (30.0 - 12.0), 0.0, 1.0) * 255.0
    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode='L')
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(1.0))
    
    mascot_rgba = im_raw.convert('RGBA')
    mascot_rgba.putalpha(alpha_img)
    
    # -------------------------------------------------------------
    # 2. GENERAR BANNER OPEN GRAPH (1200 x 630 px) PARA WHATSAPP
    # -------------------------------------------------------------
    bg_path = r'C:\Users\jcqes\.gemini\antigravity\brain\f931adf0-ae7b-40d8-8e7e-23a34f97ee90\og_clean_backdrop_1793662812787.jpg'
    og = Image.open(bg_path).convert('RGBA')
    og = og.resize((1200, 630), Image.Resampling.LANCZOS)
    
    # Escalar mascota a altura de 515 px
    m_h = 515
    m_w = int(mascot_rgba.width * (m_h / mascot_rgba.height))
    mascot_scaled = mascot_rgba.resize((m_w, m_h), Image.Resampling.LANCZOS)
    
    # Sombra difuminada bajo la mascota
    shadow = Image.new('RGBA', (1200, 630), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([690, 560, 1070, 608], fill=(0, 60, 50, 48))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    og.alpha_composite(shadow)
    
    # Posicionar mascota a la derecha
    og.alpha_composite(mascot_scaled, (640, 75))
    
    # Tarjeta blanca translucida para el texto
    card = Image.new('RGBA', (1200, 630), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card)
    card_x0, card_y0 = 60, 55
    card_x1, card_y1 = 635, 575
    c_draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=36, fill=(255, 255, 255, 222), outline=(224, 247, 246, 255), width=2)
    og = Image.alpha_composite(og, card)
    
    draw = ImageDraw.Draw(og)
    font_bold_path = 'public/fonts/albert-sans-bold.ttf'
    font_reg_path = 'public/fonts/albert-sans-regular.ttf'
    
    font_badge = ImageFont.truetype(font_bold_path, 22)
    font_title = ImageFont.truetype(font_bold_path, 66)
    font_sub = ImageFont.truetype(font_reg_path, 26)
    font_chips = ImageFont.truetype(font_bold_path, 20)
    font_footer = ImageFont.truetype(font_reg_path, 19)
    
    # Pill Badge de Marca "CRECER"
    badge_x, badge_y = 95, 90
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 160, badge_y + 44], radius=22, fill=(224, 247, 246, 255), outline=(0, 168, 150, 255), width=2)
    # Dibujar brote geometrico dentro del badge
    draw.ellipse([badge_x + 18, badge_y + 14, badge_x + 32, badge_y + 28], fill=(0, 168, 150, 255))
    draw.ellipse([badge_x + 28, badge_y + 11, badge_x + 40, badge_y + 23], fill=(77, 208, 194, 255))
    draw.text((badge_x + 48, badge_y + 9), 'CRECER', font=font_badge, fill=(10, 59, 92, 255))
    
    # Titulo Principal
    draw.text((95, 160), 'Tu coach de', font=font_title, fill=(15, 41, 66, 255))
    draw.text((95, 235), 'crianza diaria', font=font_title, fill=(0, 168, 150, 255))
    
    # Subtitulo descriptivo
    draw.text((95, 335), 'Estrategias practicas paso a paso,', font=font_sub, fill=(71, 85, 105, 255))
    draw.text((95, 375), 'conexion familiar y calma en crisis.', font=font_sub, fill=(71, 85, 105, 255))
    
    # Chips de funcionalidades con puntos de color
    chips_data = [
        ('10 Habilidades', (0, 168, 150, 255)),
        ('Calma en Crisis', (234, 179, 8, 255)),
        ('Mi Progreso', (59, 130, 246, 255))
    ]
    chip_x = 95
    chip_y = 445
    for label, dot_color in chips_data:
        bbox = font_chips.getbbox(label)
        txt_w = bbox[2] - bbox[0]
        full_w = txt_w + 52
        draw.rounded_rectangle([chip_x, chip_y, chip_x + full_w, chip_y + 42], radius=21, fill=(248, 250, 252, 255), outline=(203, 213, 225, 255), width=1)
        # Punto de color
        draw.ellipse([chip_x + 16, chip_y + 16, chip_x + 26, chip_y + 26], fill=dot_color)
        draw.text((chip_x + 34, chip_y + 8), label, font=font_chips, fill=(15, 41, 66, 255))
        chip_x += full_w + 14
        
    # Pie de marca
    draw.text((95, 520), 'Acompanamiento positivo y practico para mamas y papas', font=font_footer, fill=(148, 163, 184, 255))
    
    # Guardar og-image.png (1200x630)
    og.convert('RGB').save('public/og-image.png', 'PNG', optimize=True)
    print("[OK] public/og-image.png creado (1200x630)")
    
    # -------------------------------------------------------------
    # 3. BANNER CUADRADO PARA WHATSAPP PREVIEW 1:1 (600 x 600 px)
    # -------------------------------------------------------------
    sq = Image.new('RGBA', (600, 600), (0, 0, 0, 0))
    sq_draw = ImageDraw.Draw(sq)
    # Fondo degradado
    sq_draw.rounded_rectangle([0, 0, 600, 600], radius=0, fill=(235, 248, 247, 255))
    # Circulo decorativo
    sq_draw.ellipse([-50, -50, 450, 450], fill=(224, 247, 246, 180))
    sq_draw.ellipse([200, 200, 750, 750], fill=(240, 253, 250, 255))
    
    # Mascota centrada
    sq_mascot = mascot_rgba.resize((480, 480), Image.Resampling.LANCZOS)
    sq.alpha_composite(sq_mascot, (60, 80))
    
    # Logo Crecer abajo
    sq_draw = ImageDraw.Draw(sq)
    font_sq_brand = ImageFont.truetype(font_bold_path, 34)
    
    # Badge inferior
    sq_draw.rounded_rectangle([150, 500, 450, 560], radius=30, fill=(255, 255, 255, 240), outline=(0, 168, 150, 255), width=2)
    sq_draw.text((195, 507), 'CRECER', font=font_sq_brand, fill=(10, 59, 92, 255))
    
    sq.convert('RGB').save('public/og-image-square.png', 'PNG', optimize=True)
    print("[OK] public/og-image-square.png creado (600x600)")
    
    # -------------------------------------------------------------
    # 4. ICONO DE APLICACION BASE (512 x 512 px)
    # -------------------------------------------------------------
    app_icon_512 = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    ai_draw = ImageDraw.Draw(app_icon_512)
    # Fondo con radio moderno
    ai_draw.rounded_rectangle([0, 0, 512, 512], radius=115, fill=(235, 249, 248, 255), outline=(0, 168, 150, 255), width=14)
    # Mascota centrada
    m_512 = mascot_rgba.resize((430, 430), Image.Resampling.LANCZOS)
    app_icon_512.alpha_composite(m_512, (41, 48))
    
    app_icon_512.save('public/pwa-512x512.png', 'PNG', optimize=True)
    print("[OK] public/pwa-512x512.png creado")
    
    # pwa-192x192.png
    app_icon_192 = app_icon_512.resize((192, 192), Image.Resampling.LANCZOS)
    app_icon_192.save('public/pwa-192x192.png', 'PNG', optimize=True)
    print("[OK] public/pwa-192x192.png creado")
    
    # apple-touch-icon.png (180x180 px - Sin transparencia en esquinas como exige Apple)
    apple_icon = Image.new('RGB', (180, 180), (235, 249, 248))
    m_180 = mascot_rgba.resize((150, 150), Image.Resampling.LANCZOS)
    apple_icon.paste(m_180, (15, 16), m_180)
    apple_icon.save('public/apple-touch-icon.png', 'PNG', optimize=True)
    print("[OK] public/apple-touch-icon.png creado (180x180)")
    
    # pwa-maskable-512x512.png (Margen de seguridad de 15% para recorte de Android)
    maskable = Image.new('RGB', (512, 512), (235, 249, 248))
    m_mask = mascot_rgba.resize((360, 360), Image.Resampling.LANCZOS)
    maskable.paste(m_mask, (76, 76), m_mask)
    maskable.save('public/pwa-maskable-512x512.png', 'PNG', optimize=True)
    print("[OK] public/pwa-maskable-512x512.png creado (maskable)")
    
    # -------------------------------------------------------------
    # 5. FAVICONS NITIDOS (Recorte optimizado del rostro + brote)
    # -------------------------------------------------------------
    # Recorte enfocado en el rostro y el brote para legibilidad a 16px y 32px
    face_crop = mascot_rgba.crop((240, 160, 800, 720))
    
    # Favicon 32x32 y 16x16
    fav_base = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
    fb_draw = ImageDraw.Draw(fav_base)
    fb_draw.rounded_rectangle([0, 0, 128, 128], radius=32, fill=(235, 249, 248, 255), outline=(0, 168, 150, 255), width=6)
    f_fitted = ImageOps.fit(face_crop, (112, 112), method=Image.Resampling.LANCZOS)
    fav_base.alpha_composite(f_fitted, (8, 8))
    
    fav32 = fav_base.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save('public/favicon-32x32.png', 'PNG', optimize=True)
    print("[OK] public/favicon-32x32.png creado")
    
    fav16 = fav_base.resize((16, 16), Image.Resampling.LANCZOS)
    fav16.save('public/favicon-16x16.png', 'PNG', optimize=True)
    print("[OK] public/favicon-16x16.png creado")
    
    fav48 = fav_base.resize((48, 48), Image.Resampling.LANCZOS)
    
    # Generar favicon.ico multi-resolucion
    fav_base.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print("[OK] public/favicon.ico multi-resolucion creado")
    
    print("\nTodos los brand assets fueron generados con exito.")

if __name__ == '__main__':
    build_all()
