# Especificación: Ayúdame Ahora - Flujo Completo de Crisis e Intervención

## 1. Historia de Usuario (User Story)
**Como** cuidador en medio de una situación difícil o crisis con un niño de 3 a 6 años,
**quiero** poder reportar qué está pasando, medir la intensidad de la situación y regular mi propia frustración (si es necesario),
**para** recibir una orientación inmediata estructurada, segura y adaptada al momento real.

## 2. Criterios de Aceptación (Definition of Done)
El flujo completo de "Ayúdame ahora" debe seguir rigurosamente los siguientes pasos secuenciales:

- **Paso 1: Selección de Situación**
  - La pantalla debe mostrar la cuadrícula con las 12 situaciones principales de crisis (ej. rabieta, no sigue instrucciones, no quiere dejar el celular, etc.)[cite: 2, 4, 6].
  - Al hacer clic en una situación, el estado global registra la crisis seleccionada y transiciona al Paso 2.

- **Paso 2: Evaluación de Intensidad (Escala 1 a 5)**
  - La aplicación pregunta: "¿Qué tan intensa es la situación?"[cite: 2, 4]
  - Debe mostrar una escala numérica del 1 al 5 con descripciones breves:
    - `1` — Molestia leve[cite: 2, 4].
    - `2` — Hay oposición, pero podemos hablar[cite: 2, 4].
    - `3` — Está aumentando el conflicto[cite: 2, 4].
    - `4` — Hay gritos o mucha alteración[cite: 2, 4].
    - `5` — Hay pérdida de control o riesgo[cite: 2, 4].

- **Paso 3: Verificación de Regulación (Modo PAUSA / "Primero tú")**
  - Si el usuario selecciona una intensidad alta (4 o 5) o si pulsa el botón global **PAUSA** ("Estoy perdiendo la paciencia"), la aplicación interrumpe temporalmente la pauta de crianza para asistir al adulto[cite: 2, 4].
  - **Mensaje del coach:** *"Antes de corregir, necesitamos ayudarte a bajar un poco la intensidad."*[cite: 2, 4]
  - El usuario registra:
    1. ¿Qué tan alterado estás? (Escala 1 a 5)[cite: 2, 4].
    2. ¿Qué estás sintiendo? (Enojo, Frustración, Impotencia, Culpa, Ansiedad, Cansancio)[cite: 2, 4].
    3. Pregunta central de intención: *"¿Qué quieres enseñarle con lo que vas a hacer ahora?"*[cite: 2, 4]

- **Paso 4: Respuesta Inmediata del Coach (Orientación de 3 a 6 años)**
  - Basado en la situación seleccionada y el nivel de intensidad, el coach entrega la orientación estructurada exactamente en cuatro bloques[cite: 2, 4, 6]:
    1. **Haz esto ahora:** Acción inmediata y concreta[cite: 2, 4, 6].
    2. **Puedes decir:** Frase textual corta y adecuada para la edad[cite: 2, 4, 6].
    3. **Evita:** Conductas o respuestas que empeoren el conflicto (en formato de lista)[cite: 2, 4, 6].
    4. **Cuando se calme:** Qué hacer posteriormente para favorecer el aprendizaje[cite: 2, 4, 6].

- **Paso 5: Seguimiento Posterior**
  - Al final de la respuesta, la interfaz pregunta: "¿Ya se calmó?", "Sigue igual" o "Está empeorando", desplegando dinámicamente la ruta de seguimiento correspondiente[cite: 6].

## 3. Especificaciones UI/UX (Frontend)
- **Framework & Estilos:** React + Tailwind CSS.
- **Identidad Visual:** 
  - Tipografía global: Albert Sans.
  - Contenedor principal: `max-w-md mx-auto min-h-screen bg-slate-50`.
  - Tarjetas de pasos: `bg-white`, `rounded-2xl`, `shadow-sm`, espaciado limpio y uso de colores semánticos tenues (rojo/coral para alertas e intensidad alta, verde menta para el avatar del coach y las acciones correctas).