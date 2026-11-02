// Banco de contenidos de las 9 Habilidades Parentales
// para la sección "Quiero aprender" de la app Crecer

export const learnSkills = [
  {
    id: 'conecta',
    number: 1,
    title: 'Conecta y juega',
    subtitle: 'Vínculo y atención compartida',
    tagline: 'Cuando dejas que tu hijo dirija el juego, le demuestras que te interesa lo que hace.',
    emoji: '🌱',
    badge: 'Habilidad 1 de 10',
    color: '#00A896',
    bgSoft: 'bg-[#E8F8F7]',
    borderSoft: 'border-[#B2EBF2]',
    category: 'communication',
    isPremier: true,
    whyImportant: 'Cuando dejas que tu hijo dirija el juego, le demuestras que te interesa lo que hace. Jugar juntos fortalece su vínculo.',
    introImage: '/conecta/illustration_intro.png',
    miraQuePasa: {
      tag: '1. Mira qué pasa',
      subtitle: 'Observa esta situación. Fíjate en lo que hace el adulto y cómo puede influir en el juego de su hijo.',
      image: '/conecta/illustration_mira.png',
      dialogue: '“¡Pon el bloque rojo arriba!”',
      didYouKnow: 'A veces, sin darnos cuenta, les decimos a nuestros hijos cómo deben jugar. Aunque queremos ayudar, terminamos decidiendo por ellos y les dejamos poco espacio para explorar y crear a su manera.'
    },
    elige: {
      tag: '2. Elige',
      prompt: 'Tu hijo está construyendo una torre con bloques. ¿Qué harías?',
      image: '/conecta/illustration_elige.png',
      options: [
        {
          id: 'a',
          label: 'A',
          text: 'Le digo cómo hacerla más alta.',
          thumb: '/conecta/thumb_opt_a.png',
          isCorrect: false,
          feedbackTitle: '¡Probemos otra forma!',
          feedback: 'Cuando le dices cómo hacer la torre, terminas dirigiendo su juego. Aunque quieres ayudar, es mejor dejar que él decida cómo construirla.'
        },
        {
          id: 'b',
          label: 'B',
          text: 'Observo y digo: “¡Estás construyendo una torre!”',
          thumb: '/conecta/thumb_opt_b.png',
          isCorrect: true,
          feedbackTitle: '¡Eso es!',
          feedback: '¡Eso es! Estás mostrando interés sin dirigir el juego.'
        },
        {
          id: 'c',
          label: 'C',
          text: 'Le pregunto qué colores está usando.',
          thumb: '/conecta/thumb_opt_c.png',
          isCorrect: false,
          feedbackTitle: '¡Probemos otra forma!',
          feedback: 'Preguntar no está mal. Ahora practica comentar lo que hace, sin convertir el juego en preguntas.'
        }
      ]
    },
    miraComoSeHace: {
      tag: '3. Mira cómo se hace',
      subtitle: 'Observa dos ejemplos de cómo acompañar el juego de tu hijo sin dirigirlo.',
      panels: [
        {
          id: 1,
          image: '/conecta/demo_panel_1.png',
          text: '¡Estás poniendo un bloque sobre otro!'
        },
        {
          id: 2,
          image: '/conecta/demo_panel_2.png',
          text: 'Gracias, voy a ponerlo contigo.'
        }
      ],
      coachMessage: 'Puedes acompañar el juego observando, comentando o imitando lo que hace tu hijo, sin decirle cómo debe jugar.'
    },
    practica: {
      tag: '4. Practica',
      subtitle: 'Selecciona la situación que más se parezca a lo que hace tu hijo.',
      activities: [
        {
          id: 'bloques',
          name: 'Bloques',
          icon: '/conecta/tab_bloques.png',
          sceneImage: '/conecta/practica_bloques.png',
          sceneDescription: 'Tu hijo está construyendo una torre con bloques en el suelo.',
          question: '¿Qué podrías decir para acompañar su juego?',
          options: [
            {
              id: 'a',
              text: 'Pon ese bloque aquí.',
              isCorrect: false,
              feedback: 'Le estás indicando dónde ponerlo. Prueba comentar lo que está haciendo.'
            },
            {
              id: 'b',
              text: 'Estás poniendo un bloque sobre otro.',
              isCorrect: true,
              feedback: '¡Muy bien! Comentaste lo que hace sin cambiar su juego.'
            },
            {
              id: 'c',
              text: 'Haz una torre más alta.',
              isCorrect: false,
              feedback: 'Así le estás diciendo cómo jugar. Prueba observar lo que está haciendo.'
            }
          ]
        },
        {
          id: 'carros',
          name: 'Carros',
          icon: '/conecta/tab_carros.png',
          sceneImage: '/conecta/card_describe.png',
          sceneDescription: 'Un niño está moviendo un carro de juguete por el piso. El adulto está cerca, observando.',
          question: '¿Qué podrías decir para acompañar su juego?',
          options: [
            {
              id: 'a',
              text: 'Haz que el carro vaya más rápido.',
              isCorrect: false,
              feedback: 'Así le estás diciendo cómo jugar. Prueba observar lo que está haciendo.'
            },
            {
              id: 'b',
              text: 'Tu carro está recorriendo el piso.',
              isCorrect: true,
              feedback: '¡Muy bien! Comentaste lo que hace sin cambiar su juego.'
            },
            {
              id: 'c',
              text: 'Ahora lleva el carro al garaje.',
              isCorrect: false,
              feedback: 'Le estás indicando qué hacer después. En este momento buscamos seguir su iniciativa.'
            }
          ]
        },
        {
          id: 'dibujar',
          name: 'Dibujar',
          icon: '/conecta/tab_dibujar.png',
          sceneImage: '/conecta/tab_dibujar.png',
          sceneDescription: 'Un niño está realizando trazos de diferentes colores sobre una hoja. El adulto observa su actividad.',
          question: '¿Qué podrías decir para acompañar su juego?',
          options: [
            {
              id: 'a',
              text: 'Dibuja un árbol.',
              isCorrect: false,
              feedback: 'Le estás diciendo qué dibujar. En este momento queremos dejar que él decida.'
            },
            {
              id: 'b',
              text: 'Estás haciendo muchas líneas de colores.',
              isCorrect: true,
              feedback: '¡Eso es! Describiste lo que está haciendo sin cambiar su dibujo.'
            },
            {
              id: 'c',
              text: 'Pinta también aquí.',
              isCorrect: false,
              feedback: 'Así estás dirigiendo su dibujo. Prueba comentar lo que ya está haciendo.'
            }
          ]
        },
        {
          id: 'munecos',
          name: 'Muñecos',
          icon: '/conecta/tab_munecos.png',
          sceneImage: '/conecta/card_responde.png',
          sceneDescription: 'Un niño está acostando un muñeco sobre una cama de juguete. El adulto observa sin intervenir.',
          question: '¿Qué podrías decir para acompañar su juego?',
          options: [
            {
              id: 'a',
              text: 'Ahora dale de comer.',
              isCorrect: false,
              feedback: 'Estás proponiendo qué debe pasar después. Prueba seguir la historia que está creando.'
            },
            {
              id: 'b',
              text: 'Estás acostando a tu muñeco.',
              isCorrect: true,
              feedback: '¡Muy bien! Describiste lo que hace sin cambiar su juego.'
            },
            {
              id: 'c',
              text: 'No, primero tienes que bañarlo.',
              isCorrect: false,
              feedback: 'Así estás corrigiendo su manera de jugar. Deja que él decida cómo continúa la historia.'
            }
          ]
        }
      ],
      reminder: 'Puedes acompañar el juego observando, comentando o imitando lo que hace tu hijo, sin dirigirlo.'
    },
    puedesDecirOHacer: {
      tag: '5. Puedes decir o hacer',
      subtitle: 'Durante el juego puedes acompañar a tu hijo de diferentes formas. Aquí te mostramos cuatro conductas que fortalecen la conexión y el disfrute.',
      cards: [
        {
          id: 'observa',
          title: 'Observa',
          desc: 'Mira con interés lo que hace tu hijo.',
          image: '/conecta/card_observa.png'
        },
        {
          id: 'describe',
          title: 'Describe',
          desc: 'Comenta lo que está haciendo, sin decirle cómo hacerlo.',
          image: '/conecta/card_describe.png'
        },
        {
          id: 'imita',
          title: 'Imita',
          desc: 'Haz algo parecido a lo que él hace.',
          image: '/conecta/card_imita.png'
        },
        {
          id: 'responde',
          title: 'Responde',
          desc: 'Si te invita a jugar, participa siguiendo su idea.',
          image: '/conecta/card_responde.png'
        }
      ],
      reminder: 'Mientras juegan, puedes observar, comentar, imitar y responder a tu hijo. Lo importante es acompañarlo y dejar que él lleve la iniciativa.'
    },
    evita: {
      tag: '6. Evita',
      subtitle: 'Algunas formas de interactuar pueden dificultar el juego y hacer que tu hijo pierda el interés. Aquí te mostramos cuatro cosas que es mejor evitar.',
      cards: [
        {
          id: 'ordenes',
          title: 'Órdenes',
          desc: 'Decirle todo el tiempo qué hacer.',
          image: '/conecta/card_ordenes.png'
        },
        {
          id: 'preguntas',
          title: 'Preguntas',
          desc: 'Hacer preguntas sin parar.',
          image: '/conecta/card_preguntas.png'
        },
        {
          id: 'correcciones',
          title: 'Correcciones',
          desc: 'Corregir cómo debe jugar.',
          image: '/conecta/card_correcciones.png'
        },
        {
          id: 'distracciones',
          title: 'Distracciones',
          desc: 'Mirar el celular mientras juegan.',
          image: '/conecta/card_distracciones.png'
        }
      ],
      reminder: 'Cuando das muchas órdenes, preguntas o correcciones, o miras el celular, es más difícil que tu hijo disfrute del juego y se sienta conectado contigo.'
    },
    pruebaloHoy: {
      tag: '7. Pruébalo hoy',
      badge: 'Tu misión',
      title: '5 minutos juntos',
      description: 'Deja que tu hijo escoja un juego seguro. Acompáñalo sin dirigir.',
      image: '/conecta/illustration_mision.png',
      habitKey: 'conecta_5_minutos_juntos',
      durations: [
        { id: '2min', label: '2 minutos', sub: 'Versión breve' },
        { id: '5min', label: '5 minutos', sub: 'Tiempo completo' }
      ],
      moments: [
        { id: 'manana', label: 'Mañana', icon: 'sun' },
        { id: 'tarde', label: 'Tarde', icon: 'sunset' },
        { id: 'noche', label: 'Noche', icon: 'moon' },
        { id: 'despues', label: 'Elegir después', icon: 'calendar' }
      ],
      reminder: 'Durante el juego, puedes observar, comentar, imitar y responder a tu hijo. Lo importante es acompañarlo y dejar que él lleve la iniciativa.'
    }
  },
  {
    id: 'habla_claro',
    number: 2,
    title: 'Habla claro',
    subtitle: 'Instrucciones concretas y efectivas',
    tagline: 'Dile exactamente qué esperas que haga.',
    emoji: '🗣️',
    badge: 'Habilidad 2 de 10',
    color: '#D97706',
    bgSoft: 'bg-amber-50',
    borderSoft: 'border-amber-200',
    category: 'communication',
    isPremier: true,
    whyImportant: 'Cuando le pides a tu hijo que "se porte bien", para él es una idea abstracta. Cuando le dices la acción física exacta que esperas, su cerebro sabe exactamente qué hacer.',
    introImage: '/habla_claro/illustration_intro.png',
    miraQuePasa: {
      tag: '1. Mira qué pasa',
      subtitle: 'Observa esta situación. Fíjate en cómo reacciona el niño cuando la indicación se da desde lejos y de forma imprecisa.',
      image: '/habla_claro/illustration_mira.png',
      dialogue: '“¡Organiza todo este desorden y pórtate bien!”',
      didYouKnow: 'A veces decimos “¡pórtate bien!” o “¡recoge todo ese desorden!” creyendo que fuimos claros. Para un niño de 3 a 6 años, esos son conceptos abstractos que generan bloqueo o distracción.'
    },
    elige: {
      tag: '2. Elige',
      prompt: 'Tu hijo tiene sus juguetes esparcidos por la sala. ¿Cuál indicación es más efectiva?',
      image: '/habla_claro/illustration_elige.png',
      options: [
        {
          id: 'a',
          label: 'A',
          text: '“¡Deja de ser tan desordenado!”',
          thumb: '/habla_claro/thumb_opt_a.png',
          isCorrect: false,
          feedbackTitle: '¡Probemos otra forma!',
          feedback: 'Esta frase desahoga la frustración del adulto y etiqueta al niño, pero no le dice qué acción física esperas que realice en este momento.'
        },
        {
          id: 'b',
          label: 'B',
          text: '“Guarda los bloques en la caja amarilla, por favor.”',
          thumb: '/habla_claro/thumb_opt_b.png',
          isCorrect: true,
          feedbackTitle: '¡Eso es!',
          feedback: '¡Exacto! Nombraste la acción física directa (guardar), el objeto (bloques) y el lugar (caja amarilla) de manera respetuosa y alcanzable.'
        },
        {
          id: 'c',
          label: 'C',
          text: '“¿Cuántas veces tengo que decirte lo mismo?”',
          thumb: '/habla_claro/thumb_opt_c.png',
          isCorrect: false,
          feedbackTitle: '¡Probemos otra forma!',
          feedback: 'Hacer preguntas de reproche aumenta la tensión y no orienta su atención hacia la tarea concreta.'
        }
      ]
    },
    miraComoSeHace: {
      tag: '3. Mira cómo se hace',
      subtitle: 'Observa dos momentos clave para dar una instrucción con cercanía, claridad y calma.',
      panels: [
        {
          id: 1,
          image: '/habla_claro/demo_panel_1.png',
          text: '“Guarda el bloque amarillo en la canasta, por favor.”'
        },
        {
          id: 2,
          image: '/habla_claro/demo_panel_2.png',
          text: '“¡Muchas gracias por guardarlo en la canasta!”'
        }
      ],
      coachMessage: 'Dar instrucciones claras no es imponerse con gritos. Es hacer fácil para tu hijo entender exactamente qué debe hacer ahora con su cuerpo y sus manos.'
    },
    practica: {
      tag: '4. Practica',
      subtitle: 'Selecciona el momento en el que más te gustaría mejorar tus indicaciones.',
      activities: [
        {
          id: 'juguetes',
          name: 'Juguetes',
          icon: '🧸',
          sceneImage: '/habla_claro/practica_juguetes.png',
          sceneDescription: 'Juguetes esparcidos sobre la alfombra.',
          question: '¿Cómo transformarías: “¡Ordena todo este reguero ahora!”?',
          options: [
            {
              id: 'a',
              text: '“¡No dejes nada tirado en el piso!”',
              isCorrect: false,
              feedback: 'Le dices lo que quieres evitar, pero no le das la acción que debe realizar ahora.'
            },
            {
              id: 'b',
              text: '“Pon los bloques dentro del baúl, por favor.”',
              isCorrect: true,
              feedback: '¡Exacto! Nombraste el objeto exacto, la acción física y el lugar con amabilidad.'
            },
            {
              id: 'c',
              text: '“¿Quieres ayudarme a recoger tus cosas?”',
              isCorrect: false,
              feedback: 'Formularlo como pregunta da la opción de decir "no" cuando es una indicación necesaria.'
            }
          ]
        },
        {
          id: 'mesa',
          name: 'En la mesa',
          icon: '🥣',
          sceneImage: '/habla_claro/practica_mesa.png',
          sceneDescription: 'El niño comiendo en la mesa de la cocina.',
          question: '¿Cómo transformarías: “¡Pórtate bien mientras comemos!”?',
          options: [
            {
              id: 'a',
              text: '“¡Deja de moverte tanto en la silla!”',
              isCorrect: false,
              feedback: 'Prohibir no orienta su postura física. El niño necesita saber qué hacer con su cuerpo.'
            },
            {
              id: 'b',
              text: '“Siéntate derecho y toma la cuchara para la sopa.”',
              isCorrect: true,
              feedback: '¡Muy bien! Describiste dos acciones físicas concretas y alcanzables de inmediato.'
            },
            {
              id: 'c',
              text: '“Come bien como los niños grandes.”',
              isCorrect: false,
              feedback: 'Es una comparación abstracta que suele generar frustración en vez de cooperación.'
            }
          ]
        },
        {
          id: 'calle',
          name: 'En la calle',
          icon: '🚶',
          sceneImage: '/habla_claro/practica_calle.png',
          sceneDescription: 'Caminando por la acera antes de cruzar la calle.',
          question: '¿Cómo transformarías: “¡Ten mucho cuidado!” antes de cruzar?',
          options: [
            {
              id: 'a',
              text: '“¡No se te ocurra soltarte o correr!”',
              isCorrect: false,
              feedback: 'Enfoca la mente del niño en la palabra "correr" en vez de indicarle detenerse.'
            },
            {
              id: 'b',
              text: '“Detén tus pies en la línea y dame la mano para cruzar.”',
              isCorrect: true,
              feedback: '¡Eso es! Le diste una orden motora clara y precisa para garantizar su seguridad.'
            },
            {
              id: 'c',
              text: '“¿Estás listo para pasar la calle?”',
              isCorrect: false,
              feedback: 'La seguridad no es una sugerencia; requiere una indicación protectora y clara.'
            }
          ]
        },
        {
          id: 'voz',
          name: 'Voz suave',
          icon: '🤫',
          sceneImage: '/habla_claro/practica_voz.png',
          sceneDescription: 'Jugando y hablando en la habitación.',
          question: '¿Cómo transformarías: “¡Deja de gritar de esa manera!”?',
          options: [
            {
              id: 'a',
              text: '“¡Que te calles y dejes la bulla te dije!”',
              isCorrect: false,
              feedback: 'Gritarle para que no grite modela justamente la conducta que deseas reducir.'
            },
            {
              id: 'b',
              text: '“Háblame con voz suave y bajita para poder escucharte.”',
              isCorrect: true,
              feedback: '¡Excelente! Sustituyes el grito por una conducta incompatible explicada con calma.'
            },
            {
              id: 'c',
              text: '“¿Por qué siempre tienes que gritar?”',
              isCorrect: false,
              feedback: 'Las preguntas acusatorias generan defensa, no autorregulación.'
            }
          ]
        }
      ],
      reminder: 'Los niños cooperan mejor cuando escuchan una sola acción que pueden ejecutar con su cuerpo, en vez de prohibiciones abstractas.'
    },
    puedesDecirOHacer: {
      tag: '5. Puedes decir o hacer',
      subtitle: 'Para que tu indicación funcione a la primera, apóyate en estas cuatro pautas prácticas de comunicación:',
      cards: [
        {
          id: 'acercate',
          title: 'Acércate',
          desc: 'Ponte a su altura física y busca contacto visual amable.',
          image: '/habla_claro/card_acercate.png'
        },
        {
          id: 'una_a_la_vez',
          title: 'Una sola indicación',
          desc: 'Pide un solo paso por vez. Evita encadenar tareas.',
          image: '/habla_claro/card_una_instruccion.png'
        },
        {
          id: 'accion_concreta',
          title: 'Acción concreta',
          desc: 'Nombra el objeto, el lugar y la acción física exacta.',
          image: '/habla_claro/card_accion_concreta.png'
        },
        {
          id: 'tono_calmo',
          title: 'Tono firme y cálido',
          desc: 'Habla con calma y seguridad sin elevar la voz.',
          image: '/habla_claro/card_tono_calmo.png'
        }
      ],
      reminder: 'Menos palabras y más cercanía física multiplican la capacidad de tu hijo para cooperar sin discusiones.'
    },
    evita: {
      tag: '6. Evita',
      subtitle: 'Estas formas de comunicarte dificultan que tu hijo responda a la primera. Aquí te mostramos cuatro cosas que conviene evitar:',
      cards: [
        {
          id: 'a_distancia',
          title: 'A distancia',
          desc: 'Gritar la orden desde la cocina u otra habitación.',
          image: '/habla_claro/card_a_distancia.png'
        },
        {
          id: 'abstracto',
          title: 'Palabras abstractas',
          desc: 'Decir "sé bueno" o "pórtate bien" sin decir qué hacer.',
          image: '/habla_claro/card_abstracto.png'
        },
        {
          id: 'cadenas',
          title: 'Cadenas de órdenes',
          desc: 'Dar tres o cuatro indicaciones juntas que se olvidan.',
          image: '/habla_claro/card_cadenas.png'
        },
        {
          id: 'preguntar',
          title: 'Preguntar dudas',
          desc: 'Decir "¿quieres recoger?" cuando no es opcional.',
          image: '/habla_claro/card_preguntar.png'
        }
      ],
      reminder: 'Cuando gritamos desde lejos o encadenamos muchas órdenes, el niño no desobedece por rebeldía: simplemente no retiene lo que esperamos de él.'
    },
    puedesDecir: [
      '“Pon los zapatos en el armario, por favor.”',
      '“Guarda el celular y ven a la mesa.”',
      '“Háblame con voz tranquila.”'
    ],
    pruebaloHoy: {
      tag: '7. Pruébalo hoy',
      badge: 'Tu misión',
      title: '3 Instrucciones Claras y Específicas',
      description: 'Acércate a su altura, da una sola instrucción por vez y di exactamente la acción concreta que esperas.',
      image: '/habla_claro/illustration_mision.png',
      habitKey: 'habla_claro_3_instrucciones',
      durations: [
        { id: '2min', label: '2 minutos', sub: 'Versión breve' },
        { id: '5min', label: '5 minutos', sub: 'Tiempo completo' }
      ],
      moments: [
        { id: 'manana', label: 'Mañana', icon: 'sun' },
        { id: 'tarde', label: 'Tarde', icon: 'sunset' },
        { id: 'noche', label: 'Noche', icon: 'moon' },
        { id: 'despues', label: 'Elegir después', icon: 'calendar' }
      ],
      reminder: 'Pide una sola cosa concreta. Espera 5 segundos antes de repetir. Cuando inicie, reconócelo de inmediato.'
    }
  },

    {
  "id": "elogia",
  "number": 3,
  "title": "Elogia",
  "subtitle": "Reconocimiento específico e inmediato",
  "tagline": "Hazle saber exactamente qué hizo bien.",
  "emoji": "⭐",
  "badge": "Habilidad 3 de 10",
  "color": "#EAB308",
  "bgSoft": "bg-yellow-50",
  "borderSoft": "border-yellow-200",
  "category": "communication",
  "isPremier": true,
  "whyImportant": "Un \"muy bien\" genérico se pierde en el aire. Cuando describes la acción motora concreta con entusiasmo apenas ocurre, el cerebro infantil conecta placer con la conducta adecuada y desea repetirla.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo reacciona el niño cuando el elogio es vago o postergado.",
    "dialogue": "“Muy bien... pórtate así siempre.” (Dicho al pasar desde otra habitación)",
    "didYouKnow": "El 80% de los elogios son vagos. Los niños cooperan el triple cuando el elogio describe exactamente el verbo y el objeto con calidez en los primeros segundos."
  },
  "elige": {
    "tag": "2. Elige",
    "image": "/elogia/illustration_elige.png",
    "prompt": "Tu hijo recogió sus materiales al terminar de pintar. ¿Cuál elogio refuerza más la conducta para que se repita?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "thumb": "/elogia/thumb_opt_a.png",
        "text": "“Por fin hiciste caso sin renegar.”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Recuerda el error pasado y añade una pizca de queja que arruina el reconocimiento positivo."
      },
      {
        "id": "b",
        "label": "B",
        "thumb": "/elogia/thumb_opt_b.png",
        "text": "“¡Me encantó que guardaras los pinceles en su frasco apenas terminaste!”",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Perfecto! El niño sabe exactamente qué acción específica estás reconociendo y sentirá orgullo auténtico por repetirla."
      },
      {
        "id": "c",
        "label": "C",
        "thumb": "/elogia/thumb_opt_c.png",
        "text": "“Muy bien, pero mañana hazlo más rápido.”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "El \"pero\" anula todo el efecto del elogio anterior y desmotiva el esfuerzo."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo estructurar un elogio específico y lleno de calidez.",
    "panels": [
      {
        "id": 1,
        "step": "1",
        "title": "Elogio por compartir",
        "image": "/elogia/demo_panel_1.png",
        "phrase": "¡Noté que compartiste tus colores con tu hermano con una sonrisa! Me gustó mucho tu paciencia.",
        "text": "“¡Noté que compartiste tus colores con tu hermano con una sonrisa! Me gustó mucho tu paciencia.”",
        "tip": "Describe la acción concreta con calidez."
      },
      {
        "id": 2,
        "step": "2",
        "title": "Elogio por ordenar",
        "image": "/elogia/demo_panel_2.png",
        "phrase": "Muchas gracias por colocar los zapatos dentro del mueble apenas llegaste de la calle. ¡Qué gran ayuda!",
        "text": "“Muchas gracias por colocar los zapatos dentro del mueble apenas llegaste de la calle. ¡Qué gran ayuda!”",
        "tip": "Reconoce de inmediato el esfuerzo sin reproches pasados."
      }
    ],
    "coachTip": "La regla de oro del elogio: 1) Ponte cerca con una sonrisa, 2) Nombra la acción física exacta, 3) Reconoce el esfuerzo sin añadir un \"pero\"."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una situación cotidiana para ensayar cómo transformar un elogio común en uno específico.",
    "activities": [
      {
        "id": "tarea",
        "name": "La tarea",
        "icon": "/elogia/tab_tarea.png",
        "image": "/elogia/practica_tarea.png",
        "sceneDescription": "Tu hijo abrió sus cuadernos a la primera llamada sin discutir.",
        "question": "¿Cómo elogiarías su iniciativa para fijar este hábito?",
        "options": [
          {
            "id": "a",
            "text": "“Ya era hora de que fueras responsable con tus cosas.”",
            "isCorrect": false,
            "feedback": "Suena a reproche por ocasiones anteriores y apaga la motivación."
          },
          {
            "id": "b",
            "text": "“¡Me encantó ver tus cuadernos listos a la primera llamada! Gran esfuerzo hoy.”",
            "isCorrect": true,
            "feedback": "¡Brillante! Describiste la puntualidad y valoraste el esfuerzo de forma concreta."
          },
          {
            "id": "c",
            "text": "“Muy bien, a ver si sacas una buena calificación.”",
            "isCorrect": false,
            "feedback": "Pone la presión en el resultado futuro en lugar de premiar la iniciativa presente."
          }
        ]
      },
      {
        "id": "ropa",
        "name": "Guardar ropa",
        "icon": "/elogia/tab_ropa.png",
        "image": "/elogia/practica_ropa.png",
        "sceneDescription": "Puso sus zapatos en el armario después de llegar del parque.",
        "question": "¿Cómo reconoces la acción terminada?",
        "options": [
          {
            "id": "a",
            "text": "“Gracias por poner tus zapatos dentro del armario justo al llegar.”",
            "isCorrect": true,
            "feedback": "¡Excelente! Nombraste el objeto exacto, el lugar y diste las gracias con cercanía."
          },
          {
            "id": "b",
            "text": "“¿Ves que no te costaba nada hacerlo?”",
            "isCorrect": false,
            "feedback": "Es un comentario irónico que genera molestia en vez de orgullo."
          },
          {
            "id": "c",
            "text": "“Bien hecho.”",
            "isCorrect": false,
            "feedback": "Es muy vago; no especifica qué conducta fue la que agradó."
          }
        ]
      },
      {
        "id": "calma",
        "name": "Autocontrol",
        "icon": "/elogia/tab_calma.png",
        "image": "/elogia/practica_calma.png",
        "sceneDescription": "Sintió frustración porque se le cayó una torre de bloques y respiró hondo sin tirarla.",
        "question": "¿Cómo refuerzas su autorregulación?",
        "options": [
          {
            "id": "a",
            "text": "“Menos mal no rompiste nada hoy.”",
            "isCorrect": false,
            "feedback": "Enfoca la atención en la conducta negativa pasada."
          },
          {
            "id": "b",
            "text": "“Vi que estabas molesto y respiraste con calma antes de volver a armarla. ¡Qué gran autocontrol!”",
            "isCorrect": true,
            "feedback": "¡Eso es! Describiste la emoción, la acción positiva y la etiquetaste como fortaleza."
          },
          {
            "id": "c",
            "text": "“No tenías por qué enojarte por un juego.”",
            "isCorrect": false,
            "feedback": "Invalida su emoción real en vez de premiar que la supo gestionar."
          }
        ]
      },
      {
        "id": "mesa",
        "name": "En la mesa",
        "icon": "/elogia/tab_mesa.png",
        "image": "/elogia/practica_mesa.png",
        "sceneDescription": "Permaneció sentado y comió su sopa usando la cuchara.",
        "question": "¿Cómo reconoces su conducta en la mesa?",
        "options": [
          {
            "id": "a",
            "text": "“¡Qué rico que comiste tu sopa sentado derecho y usando la cuchara! Fue muy agradable almorzar juntos.”",
            "isCorrect": true,
            "feedback": "¡Eso es! Refuerzas la postura física, el uso del cubierto y la conexión familiar."
          },
          {
            "id": "b",
            "text": "“Ojalá comieras así todos los días.”",
            "isCorrect": false,
            "feedback": "Muestra desconfianza en su capacidad futura en vez de disfrutar el logro de hoy."
          },
          {
            "id": "c",
            "text": "“Termina rápido lo demás.”",
            "isCorrect": false,
            "feedback": "Ignora el avance presente y salta de inmediato a una nueva exigencia."
          }
        ]
      }
    ],
    "reminder": "Elogiar la acción concreta y el esfuerzo en caliente es la herramienta más poderosa para cambiar conductas."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Para que tu elogio tenga máximo impacto pedagógico y afectivo, apóyate en estos cuatro pilares:",
    "cards": [
      {
        "id": "accion_exacta",
        "title": "Describe la acción",
        "desc": "Nombra el verbo concreto: \"guardar\", \"compartir\", \"esperar\".",
        "image": "/elogia/card_accion_exacta.png"
      },
      {
        "id": "en_caliente",
        "title": "Elogia de inmediato",
        "desc": "Reconoce en los primeros 3 segundos de ocurrir la acción.",
        "image": "/elogia/card_en_caliente.png"
      },
      {
        "id": "calidez_fisica",
        "title": "Calidez y cercanía",
        "desc": "Sonríe, haz contacto visual, choca las manos o da un abrazo.",
        "image": "/elogia/card_calidez_fisica.png"
      },
      {
        "id": "valora_esfuerzo",
        "title": "Valora el esfuerzo",
        "desc": "Reconoce el intento y el progreso paso a paso, no la perfección.",
        "image": "/elogia/card_valora_esfuerzo.png"
      }
    ],
    "reminder": "Un elogio descriptivo e inmediato vale más que mil sermones o explicaciones."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Ciertas costumbres al elogiar pueden restarle todo el valor a tu reconocimiento. Conviene evitar:",
    "cards": [
      {
        "id": "el_pero",
        "title": "El \"pero\" final",
        "desc": "Decir \"muy bien, pero la próxima hazlo más rápido\" borra el elogio.",
        "image": "/elogia/card_el_pero.png"
      },
      {
        "id": "sarcasmo",
        "title": "Sarcasmo e ironía",
        "desc": "Frases como \"¡milagro que recogiste!\" humillan en vez de motivar.",
        "image": "/elogia/card_sarcasmo.png"
      },
      {
        "id": "elogio_vago",
        "title": "Elogios vacíos",
        "desc": "Quedarte en un \"bien\" rutinario sin explicar qué hizo bien.",
        "image": "/elogia/card_elogio_vago.png"
      },
      {
        "id": "postergar",
        "title": "Esperar a la noche",
        "desc": "Dejar pasar las horas hace que el niño olvide el contexto de la acción.",
        "image": "/elogia/card_postergar.png"
      }
    ],
    "reminder": "El cerebro infantil necesita claridad absoluta: celebra lo que ocurrió hoy sin mezclar reproches del pasado."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "3 Elogios Descriptivos Hoy",
    "description": "Encuentra 3 conductas positivas cotidianas hoy y descríbelas en voz alta con entusiasmo y calidez apenas ocurran.",
    "habitKey": "elogia_3_descriptivos",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Ponte a su altura, sonríe, describe la acción exacta y agradécesela sin añadir ningún \"pero\"."
  }
},

  {
  "id": "motiva",
  "number": 4,
  "title": "Motiva",
  "subtitle": "Reforzadores sociales y privilegios",
  "tagline": "Ayúdalo a querer repetir lo que hace bien.",
  "emoji": "🎯",
  "badge": "Habilidad 4 de 10",
  "color": "#F97316",
  "bgSoft": "bg-orange-50",
  "borderSoft": "border-orange-200",
  "category": "limits",
  "isPremier": true,
  "whyImportant": "Los sobornos materiales (\"te compro un juguete si no lloras\") pierden efecto y enseñan manipulación. Los privilegios de tiempo compartido y juegos juntos despiertan cooperación genuina y alegría.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo los sobornos materiales desgastan la relación a largo plazo.",
    "dialogue": "“Si haces la tarea sin quejarte, te compro un juguete el sábado en el centro comercial.”",
    "didYouKnow": "Los niños pequeños valoran más 10 minutos de juego exclusivo con mamá o papá que un juguete nuevo comprado con prisa."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "¿Cuál motivador es más saludable y duradero para un niño pequeño?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Comprarle un dulce o juguete cada vez que coopera.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Crea dependencia material externa y pierde su valor muy rápidamente."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Tiempo especial juntos: elegir el cuento de la noche o 10 minutos de juego libre.",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Excelente! Los privilegios de tiempo y atención fortalecen el vínculo afectivo y la motivación interna del niño."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Darle el premio antes de que cumpla la conducta para que se calme.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Refuerza la queja o el berrinche previo en lugar de incentivar el esfuerzo."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo vincular una rutina cotidiana con un privilegio positivo compartido.",
    "panels": [
      {
        "id": 1,
        "text": "“Cuando los zapatos estén en su mueble, ponemos tu canción favorita para bailar juntos en la sala.”"
      },
      {
        "id": 2,
        "text": "“¡Terminaste a tiempo tu tarea! Ahora tenemos 15 minutos extra para leer el cuento que tú elijas.”"
      }
    ],
    "coachMessage": "Aplica la regla de oro: \"Primero cooperamos con la tarea, luego disfrutamos el privilegio divertido juntos\"."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una rutina para practicar cómo formular un motivador positivo basado en tiempo compartido.",
    "activities": [
      {
        "id": "pijama",
        "name": "Hora de dormir",
        "icon": "🌙",
        "sceneDescription": "Le cuesta dejar el juego para ponerse el pijama e ir a la cama.",
        "question": "¿Cómo aplicas el principio de motivación?",
        "options": [
          {
            "id": "a",
            "text": "“Cuando tengas el pijama puesto y los dientes limpios, leemos dos cuentos en la cama juntos.”",
            "isCorrect": true,
            "feedback": "¡Exacto! Pones la condición clara y ofreces un momento de cercanía como recompensa natural."
          },
          {
            "id": "b",
            "text": "“Ponte el pijama o mañana no vas al cumpleaños.”",
            "isCorrect": false,
            "feedback": "Usa una amenaza lejana en vez de un motivador inmediato y conectivo."
          },
          {
            "id": "c",
            "text": "“Te dejo jugar media hora más si prometes dormirte rápido.”",
            "isCorrect": false,
            "feedback": "Cedes el límite antes del esfuerzo y enseñas que resistirse funciona."
          }
        ]
      },
      {
        "id": "pantallas",
        "name": "Apagar tele",
        "icon": "📺",
        "sceneDescription": "Es hora de apagar la pantalla y guardar la tablet.",
        "question": "¿Qué privilegio de tiempo ayuda a la transición?",
        "options": [
          {
            "id": "a",
            "text": "“Apenas apagues la tele, elegimos el juego de mesa para jugar en la alfombra.”",
            "isCorrect": true,
            "feedback": "¡Muy bien! Sustituyes la pantalla por una actividad relacional aún más atractiva."
          },
          {
            "id": "b",
            "text": "“¡Si no apagas ya te decomiso la tablet una semana!”",
            "isCorrect": false,
            "feedback": "Genera confrontación reactiva y resistencia emocional."
          },
          {
            "id": "c",
            "text": "“Déjame ver qué te compro si la apagas ahora.”",
            "isCorrect": false,
            "feedback": "Soborno innecesario que crea dependencia económica."
          }
        ]
      },
      {
        "id": "almuerzo",
        "name": "Almuerzo",
        "icon": "🍽️",
        "sceneDescription": "Es hora de terminar el plato de verduras antes del postre.",
        "question": "¿Cómo formulas la regla motivante?",
        "options": [
          {
            "id": "a",
            "text": "“Cuando termines tu porción de verduras, elegimos juntos la fruta dulce para el postre.”",
            "isCorrect": true,
            "feedback": "¡Perfecto! Secuencia lógica: primero el esfuerzo alimenticio, luego la recompensa saludable."
          },
          {
            "id": "b",
            "text": "“Cómete eso porque hay niños que no tienen nada.”",
            "isCorrect": false,
            "feedback": "Genera culpa pero no motivación para comer."
          },
          {
            "id": "c",
            "text": "“Toma la tableta mientras comes para que no llores.”",
            "isCorrect": false,
            "feedback": "Desconecta al niño de sus señales de saciedad y de la mesa familiar."
          }
        ]
      },
      {
        "id": "bano",
        "name": "El baño",
        "icon": "🛁",
        "sceneDescription": "Se niega a entrar a la tina para bañarse.",
        "question": "¿Cómo conviertes el baño en una meta divertida?",
        "options": [
          {
            "id": "a",
            "text": "“¡Hoy tenemos barquitos de espuma en el agua! En cuanto entres, hacemos carreras de burbujas.”",
            "isCorrect": true,
            "feedback": "¡Eso es! El juego dentro del agua hace que la rutina sea deseable por sí misma."
          },
          {
            "id": "b",
            "text": "“¡Al agua ya porque estás sucio y hueles feo!”",
            "isCorrect": false,
            "feedback": "Descalifica al niño y asocia el aseo con vergüenza."
          },
          {
            "id": "c",
            "text": "“Bueno, no te bañes hoy si vas a hacer escándalo.”",
            "isCorrect": false,
            "feedback": "Rompe la consistencia del hábito por evitar la rabieta."
          }
        ]
      }
    ],
    "reminder": "El mejor motivador no se compra: se comparte a través de la presencia, el juego y la atención del adulto."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Para incentivar conductas positivas con motivación respetuosa y duradera:",
    "cards": [
      {
        "id": "primero_luego",
        "title": "Primero X, luego Y",
        "desc": "Establece claramente: \"Primero recogemos, luego leemos juntos\"."
      },
      {
        "id": "tiempo_compartido",
        "title": "Privilegios de tiempo",
        "desc": "Ofrece cosquillas, bailes, paseos en bici o juegos de mesa."
      },
      {
        "id": "cumple_promesa",
        "title": "Cumple siempre",
        "desc": "Si prometiste 10 minutos de juego, cúmplelos sin falta."
      },
      {
        "id": "celebra_juntos",
        "title": "Reconoce el logro",
        "desc": "Resalta que ambos ganaron tiempo agradable gracias a su cooperación."
      }
    ],
    "reminder": "La motivación conectada enseña que cooperar beneficia a toda la familia."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Trampas comunes que debilitan la motivación sana:",
    "cards": [
      {
        "id": "sobornos_crisis",
        "title": "Sobornos en crisis",
        "desc": "Nunca ofrezcas premios en medio de un berrinche o queja."
      },
      {
        "id": "premios_materiales",
        "title": "Regalos y compras",
        "desc": "Evita comprar juguetes como condición diaria para colaborar."
      },
      {
        "id": "premio_anticipado",
        "title": "Entregar antes",
        "desc": "No des el beneficio antes de que se inicie la acción acordada."
      },
      {
        "id": "promesas_falsas",
        "title": "Promesas que no cumples",
        "desc": "No ofrezcas salidas gigantes si no tienes tiempo de realizarlas."
      }
    ],
    "reminder": "Si el niño aprende que la recompensa llega sin esfuerzo, la motivación desaparece."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Primero Cooperamos, Luego Jugamos",
    "description": "Vincula una rutina difícil hoy con un privilegio divertido de tiempo compartido y cúmplelo apenas cumpla la acción.",
    "habitKey": "motiva_tiempo_compartido",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Define el privilegio divertido antes de empezar, sé claro en el \"primero X, luego Y\" y disfruta el momento juntos."
  }
},

  {
  "id": "da_ejemplo",
  "number": 5,
  "title": "Da ejemplo",
  "subtitle": "Modelado consciente de regulación",
  "tagline": "Enséñale con lo que haces.",
  "emoji": "👀",
  "badge": "Habilidad 5 de 10",
  "color": "#06B6D4",
  "bgSoft": "bg-cyan-50",
  "borderSoft": "border-cyan-200",
  "category": "communication",
  "isPremier": true,
  "whyImportant": "Los niños aprenden por neuronas espejo. No podemos enseñar calma gritando, ni enseñar respeto perdiendo el control. Tu respuesta ante el error es su mayor guía de vida.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo la pérdida de control del adulto intensifica la crisis.",
    "dialogue": "El adulto grita alterado: “¡TE DIJE QUE DEJES DE GRITAR EN ESTA CASA!”",
    "didYouKnow": "El cerebro infantil no escucha las palabras de un adulto enojado: copia el tono muscular, la mirada tensa y los decibeles de su voz."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "Tu hijo derrama un vaso de leche por accidente sobre la mesa. ¿Qué le enseñará mejor a manejar errores?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "“¡Mira lo que hiciste! ¡Siempre eres tan torpe y descuidado!”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Enseña culpa, vergüenza y miedo a equivocarse, sin mostrar una solución."
      },
      {
        "id": "b",
        "label": "B",
        "text": "“Fue un accidente. Respira hondo, toma un trapo y vamos a limpiarlo juntos.”",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Perfecto! Modela que los accidentes cotidianos se resuelven con serenidad, responsabilidad y trabajo en equipo."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Limpiarlo tú con enojo y resoplando en silencio con cara de molestia.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Comunica hostilidad pasiva y angustia al niño en lugar de una pauta tranquila."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo narrar tu propia autorregulación frente a tu hijo.",
    "panels": [
      {
        "id": 1,
        "text": "“Siento mucha prisa y me estoy alterando con el tráfico. Voy a respirar hondo tres veces antes de hablar.”"
      },
      {
        "id": 2,
        "text": "“Perdóname por levantar la voz hace un momento. Me sentía frustrado, pero ya me calmé y podemos resolverlo.”"
      }
    ],
    "coachMessage": "Modelar no es ser un robot perfecto. Es mostrarle a tu hijo en voz alta cómo un adulto siente emociones difíciles y elige volver a la calma."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una situación cotidiana para practicar el modelado consciente de calma y resolución.",
    "activities": [
      {
        "id": "derrame",
        "name": "Derrame accidental",
        "icon": "🥛",
        "sceneDescription": "Un vaso de agua cae al piso mientras tu hijo intentaba servirlo.",
        "question": "¿Cómo modelas la respuesta constructiva?",
        "options": [
          {
            "id": "a",
            "text": "“Los accidentes pasan. Vamos por el trapero y te enseño cómo secarlo.”",
            "isCorrect": true,
            "feedback": "¡Excelente! Enseña responsabilidad activa sin dramatismo ni recriminación."
          },
          {
            "id": "b",
            "text": "“¡Deja eso, tú no sabes servir nada!”",
            "isCorrect": false,
            "feedback": "Daña su autoeficacia y genera miedo a intentar tareas nuevas."
          },
          {
            "id": "c",
            "text": "Ignorarlo y dejar el charco sucio.",
            "isCorrect": false,
            "feedback": "No modela el cuidado del hogar ni la resolución compartida."
          }
        ]
      },
      {
        "id": "trafico",
        "name": "Retraso y prisa",
        "icon": "🚗",
        "sceneDescription": "Van tarde al colegio y hay una fila larga de autos.",
        "question": "¿Cómo expresas el manejo del estrés en voz alta?",
        "options": [
          {
            "id": "a",
            "text": "“Estamos con el tiempo justo y siento ganas de acelerar. Voy a poner música suave y respirar tranquilos.”",
            "isCorrect": true,
            "feedback": "¡Brillante! Muestras cómo identificar la prisa y elegir conscientemente la serenidad."
          },
          {
            "id": "b",
            "text": "Tocar la bocina y maldecir a los otros conductores.",
            "isCorrect": false,
            "feedback": "Modela agresión e impulsividad cuando las cosas no salen como queremos."
          },
          {
            "id": "c",
            "text": "“¡Por tu culpa de no vestirte rápido vamos a llegar tardísimo!”",
            "isCorrect": false,
            "feedback": "Descarga la frustración del adulto culpando al niño."
          }
        ]
      },
      {
        "id": "disculpa",
        "name": "Reparar el error",
        "icon": "🤝",
        "sceneDescription": "Perdiste la paciencia y le hablaste con un tono brusco.",
        "question": "¿Cómo modelas la reparación emocional sincera?",
        "options": [
          {
            "id": "a",
            "text": "“Hijo, te hablé de forma fea hace un momento. Estaba cansado, pero no debí hablarte así. Lo siento.”",
            "isCorrect": true,
            "feedback": "¡Poderoso! Enseña que los adultos también se equivocan y saben pedir perdón con madurez."
          },
          {
            "id": "b",
            "text": "Hacer como si nada hubiera pasado y comprarle un dulce.",
            "isCorrect": false,
            "feedback": "Enseña a encubrir los errores con objetos en lugar de hablar."
          },
          {
            "id": "c",
            "text": "“Te hablé así porque tú me provocaste.”",
            "isCorrect": false,
            "feedback": "Justifica la violencia verbal culpando a la otra persona."
          }
        ]
      },
      {
        "id": "pantallas",
        "name": "Uso de pantallas",
        "icon": "📱",
        "sceneDescription": "Quieres que tu hijo deje los videojuegos para cenar.",
        "question": "¿Cómo modelas la coherencia con dispositivos?",
        "options": [
          {
            "id": "a",
            "text": "Dejas tu propio celular en la canasta de la entrada antes de sentarte a la mesa.",
            "isCorrect": true,
            "feedback": "¡Eso es coherencia! Las reglas del hogar se aplican a todos con el ejemplo vivo."
          },
          {
            "id": "b",
            "text": "Le quitas la tablet mientras tú revisas mensajes en la mesa.",
            "isCorrect": false,
            "feedback": "Doble moral que despierta resentimiento y desobediencia."
          },
          {
            "id": "c",
            "text": "Decirle que los celulares son malos mientras miras series.",
            "isCorrect": false,
            "feedback": "Tus acciones contradicen totalmente tus palabras."
          }
        ]
      }
    ],
    "reminder": "Tus hijos quizás no siempre hagan lo que dices, pero siempre imitarán lo que haces."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Pautas para convertirte en el mejor modelo de regulación emocional para tu hijo:",
    "cards": [
      {
        "id": "narra_calma",
        "title": "Narra tu calma",
        "desc": "Di en voz alta: \"Estoy sintiendo enojo, voy a respirar hondo\"."
      },
      {
        "id": "repara_fallas",
        "title": "Repara si fallas",
        "desc": "Pide disculpas con sencillez si perdiste la paciencia o alzaste la voz."
      },
      {
        "id": "resuelve_sin_culpa",
        "title": "Resuelve el error",
        "desc": "Enfoca los accidentes en soluciones prácticas, no en buscar culpables."
      },
      {
        "id": "coherencia_viva",
        "title": "Sé coherente",
        "desc": "Cumple tú mismo las normas de pantallas, orden y respeto de la casa."
      }
    ],
    "reminder": "La serenidad no se enseña con sermones; se contagia con presencia y modelado constante."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Incoherencias frecuentes que confunden el aprendizaje emocional del niño:",
    "cards": [
      {
        "id": "exigir_sin_dar",
        "title": "Exigir sin dar",
        "desc": "No pidas calma a gritos ni respeto usando burlas o agresividad."
      },
      {
        "id": "ocultar_errores",
        "title": "Ocultar tropiezos",
        "desc": "No finjas que eres perfecto; muestra cómo te recuperas y reparas."
      },
      {
        "id": "resentimiento",
        "title": "Resentimiento pasivo",
        "desc": "Evita guardar silencio hostil o azotar puertas en la casa."
      },
      {
        "id": "castigar_accidentes",
        "title": "Castigar descuidos",
        "desc": "No trates un vaso roto por torpeza motora como una falta grave."
      }
    ],
    "reminder": "Cuando el adulto se desregula, el niño siente que el mundo es caótico y pierde su ancla segura."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Narra Tu Autocontrol en Voz Alta",
    "description": "Elige una situación que te dé impaciencia hoy y narra en voz alta cómo respiras y eliges mantener la calma.",
    "habitKey": "da_ejemplo_calma",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Haz visible tu propio proceso de volver a la calma frente a tu hijo."
  }
},

  {
  "id": "practiquen_juntos",
  "number": 6,
  "title": "Practiquen juntos",
  "subtitle": "Ensayo conductual fuera de crisis",
  "tagline": "Las habilidades se aprenden practicando.",
  "emoji": "🤝",
  "badge": "Habilidad 6 de 10",
  "color": "#8B5CF6",
  "bgSoft": "bg-purple-50",
  "borderSoft": "border-purple-200",
  "category": "limits",
  "isPremier": true,
  "whyImportant": "Nadie aprende a nadar en medio de una tormenta. Los niños necesitan ensayar cómo respirar o cómo pedir las cosas jugando en momentos de paz, antes de que ocurra el conflicto.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en por qué las explicaciones lógicas fallan en el momento crítico.",
    "dialogue": "“¡Ya te he dicho mil veces que cuando estés furioso no debes pegar a nadie!”",
    "didYouKnow": "Saber una regla en teoría no activa los músculos. Solo el ensayo físico repetido en frío crea las conexiones neuronales automáticas."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "¿Cuál es el mejor momento para ensayar cómo pedir las cosas por favor o cómo calmarse?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "En pleno berrinche mientras llora y grita.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Bajo secuestro emocional el cerebro del niño está cerrado a cualquier nuevo aprendizaje."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Durante un momento tranquilo de juego a modo de simulacro divertido.",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Perfecto! El ensayo en frío permite automatizar la respuesta corporal sin la presión del enojo."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Justo después de haberle puesto un castigo por desobedecer.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "El niño estará a la defensiva o resentido y lo vivirá como un regaño extra."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo plantear un ensayo conductual divertido de 2 minutos.",
    "panels": [
      {
        "id": 1,
        "text": "“Vamos a jugar a que nos enojamos mucho, pero respiramos como un león: tomamos aire y soltamos despacio.”"
      },
      {
        "id": 2,
        "text": "“¡Eso es! Ahora practicamos pasar el juguete diciendo: ¿me lo prestas por favor cuando termines?”"
      }
    ],
    "coachMessage": "La secuencia del ensayo: 1) Tú lo muestras, 2) Lo hacen juntos como juego, 3) El niño lo hace solo, 4) Elogias con entusiasmo."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una habilidad para practicar cómo estructurar un simulacro de juego de 2 minutos.",
    "activities": [
      {
        "id": "turno",
        "name": "Pedir turno",
        "icon": "🎲",
        "sceneDescription": "Le cuesta esperar su turno cuando juegan con otros niños.",
        "question": "¿Cómo proponer el simulacro de juego?",
        "options": [
          {
            "id": "a",
            "text": "“Vamos a jugar a que yo tengo el juguete favorito. Mírame a los ojos y ensaya decir: ¿me lo prestas cuando termines?”",
            "isCorrect": true,
            "feedback": "¡Excelente! Ensayar la frase literal en frío crea el reflejo automático para la plaza."
          },
          {
            "id": "b",
            "text": "“Si no aprendes a compartir no te dejo jugar con nadie.”",
            "isCorrect": false,
            "feedback": "Es una amenaza que no le enseña la conducta motora de pedir."
          },
          {
            "id": "c",
            "text": "Decirle que los niños que no comparten son egoístas.",
            "isCorrect": false,
            "feedback": "Coloca una etiqueta negativa que daña su autoconcepto."
          }
        ]
      },
      {
        "id": "respirar",
        "name": "Respiración de león",
        "icon": "🦁",
        "sceneDescription": "Enseñar qué hacer con el cuerpo cuando siente ganas de empujar.",
        "question": "¿Cómo practicar la respuesta física alternativa?",
        "options": [
          {
            "id": "a",
            "text": "“Juguemos a que las manos se ponen como puños cerrados, pero inhalamos fuerte y las abrimos como estrellas.”",
            "isCorrect": true,
            "feedback": "¡Brillante! Asocia la tensión muscular con una acción incompatible de relajación."
          },
          {
            "id": "b",
            "text": "“¡No se te ocurra volver a empujar a tu primo!”",
            "isCorrect": false,
            "feedback": "Prohibir no le da una alternativa motora a su energía física."
          },
          {
            "id": "c",
            "text": "Explicarle un tratado sobre por qué empujar está mal.",
            "isCorrect": false,
            "feedback": "Los discursos largos no se traducen en autocontrol motor."
          }
        ]
      },
      {
        "id": "ayuda",
        "name": "Pedir ayuda",
        "icon": "🆘",
        "sceneDescription": "Se frustra al ponerse los zapatos y los lanza con rabia.",
        "question": "¿Cómo ensayar pedir auxilio antes de la explosión?",
        "options": [
          {
            "id": "a",
            "text": "“Vamos a jugar a que el zapato está rebelde. Antes de enojarte, grita la palabra mágica: ¡Auxilio papá!”",
            "isCorrect": true,
            "feedback": "¡Eso es! Sustituyes el lanzamiento del objeto por una petición verbal divertida."
          },
          {
            "id": "b",
            "text": "Ponérselos tú siempre para que no llore.",
            "isCorrect": false,
            "feedback": "Fomenta la indefensión aprendida y no desarrolla autonomía."
          },
          {
            "id": "c",
            "text": "“Si los tiras te quedas descalzo.”",
            "isCorrect": false,
            "feedback": "Castigo reactivo que no soluciona la dificultad motora."
          }
        ]
      },
      {
        "id": "saludar",
        "name": "Saludar con soltura",
        "icon": "👋",
        "sceneDescription": "Suele esconderse detrás de tus piernas al llegar visitas.",
        "question": "¿Cómo entrenar el saludo con un juego sin presión?",
        "options": [
          {
            "id": "a",
            "text": "“Juguemos a ser detectives: cuando llegue el abuelo, miramos el color de sus ojos y chocamos los cinco.”",
            "isCorrect": true,
            "feedback": "¡Fantástico! Desvía la timidez hacia un juego de observación y contacto motriz amable."
          },
          {
            "id": "b",
            "text": "Obligarlo a abrazar y dar besos a la fuerza.",
            "isCorrect": false,
            "feedback": "Vulnera sus límites corporales y aumenta la resistencia."
          },
          {
            "id": "c",
            "text": "“Saluda bien, qué vergüenza que seas tan tímido.”",
            "isCorrect": false,
            "feedback": "Lo expone ante otros y refuerza la timidez como identidad."
          }
        ]
      }
    ],
    "reminder": "Los ensayos breves y divertidos fuera de crisis fijan hábitos más rápido que cualquier regaño."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Pautas para realizar simulacros de juego efectivos con tu hijo:",
    "cards": [
      {
        "id": "hazlo_juego",
        "title": "Hazlo un juego",
        "desc": "Plantea el ensayo como una misión divertida o juego de roles."
      },
      {
        "id": "tu_primero",
        "title": "Modela tú primero",
        "desc": "Muestra tú la acción física con gracia antes de pedir que él la haga."
      },
      {
        "id": "ensayos_cortos",
        "title": "Ensayos de 2 minutos",
        "desc": "Practica solo dos o tres repeticiones breves para no cansar al niño."
      },
      {
        "id": "elogia_inmediato",
        "title": "Celebra el avance",
        "desc": "Choca los cinco apenas realice el movimiento esperado en el ensayo."
      }
    ],
    "reminder": "Lo que el cuerpo practica en calma, el cerebro lo ejecuta automáticamente en el momento difícil."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Errores frecuentes al intentar practicar habilidades:",
    "cards": [
      {
        "id": "ensayo_en_rabia",
        "title": "Ensayar en crisis",
        "desc": "Nunca intentes enseñar mientras el niño llora o está furioso."
      },
      {
        "id": "perfeccionismo",
        "title": "Exigir perfección",
        "desc": "No te enfades si en el primer simulacro se ríe o se distrae."
      },
      {
        "id": "examen_rigido",
        "title": "Hacerlo un examen",
        "desc": "No conviertas la práctica en una prueba tensa o regaño."
      },
      {
        "id": "burlarse",
        "title": "Burlarse del intento",
        "desc": "Evita comentarios como \"a ver si ahora sí te sale\"."
      }
    ],
    "reminder": "El ensayo debe ser siempre un espacio seguro, alegre y libre de juicio."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Simulacro de Juego de 2 Minutos",
    "description": "Haz un juego de roles de 2 minutos sobre cómo pedir algo con calma o respirar antes de que ocurra el conflicto.",
    "habitKey": "practiquen_juntos_simulacro",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Muestra tú primero, háganlo juntos como juego y elogia con entusiasmo al terminar."
  }
},

  {
  "id": "anticipate",
  "number": 7,
  "title": "Anticípate",
  "subtitle": "Alertas y preparación de transiciones",
  "tagline": "Prepáralo antes del momento difícil.",
  "emoji": "🔮",
  "badge": "Habilidad 7 de 10",
  "color": "#6366F1",
  "bgSoft": "bg-indigo-50",
  "borderSoft": "border-indigo-200",
  "category": "limits",
  "isPremier": true,
  "whyImportant": "A los 3 a 6 años, el cerebro tarda en cambiar de foco atencional. Un corte abrupto en su juego se siente como una agresión. Los avisos previos de 5 minutos suavizan la transición sin lágrimas.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo los cortes abruptos detonan resistencia y berrinches.",
    "dialogue": "“¡Apaga eso YA y ven a cenar ahora mismo!” (Corte abrupto sin aviso previo)",
    "didYouKnow": "Avisar 5 minutos antes con una meta tangible (\"dos bajadas más en el tobogán\") activa la corteza prefrontal del niño para cerrar su ciclo mental de juego."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "¿Cómo preparas mejor a tu hijo para salir del parque sin lágrimas ni persecuciones?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Decirle a último segundo: “Nos vamos ya porque es tarde”.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Garantiza resistencia por sorpresa y frustración al cortar en seco su juego."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Avisar 5 minutos antes: “Te quedan 2 bajadas por el tobogán y nos vamos a cenar juntos”.",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Perfecto! La meta tangible (2 bajadas) le permite completar su ciclo y prepararse con autonomía."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Amenazarlo con no volver al parque si no corre hacia la salida.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Genera miedo y estrés innecesario en una rutina diaria."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo estructurar avisos previos con amabilidad y firmeza.",
    "panels": [
      {
        "id": 1,
        "text": "“En 5 minutos guardamos las pinturas para ir a cenar. Ve terminando este dibujo tan bonito.”"
      },
      {
        "id": 2,
        "text": "“Se cumplieron los 5 minutos acordados. ¿Guardas tú los pinceles o los guardamos juntos?”"
      }
    ],
    "coachMessage": "La regla de oro de la anticipación: Avisa con tiempo medible, ofrece una opción de cierre y mantén el corte con afecto."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una transición típica para practicar cómo estructurar el aviso previo:",
    "activities": [
      {
        "id": "parque",
        "name": "Salida del parque",
        "icon": "🌳",
        "sceneDescription": "Está jugando feliz en el columpio del parque.",
        "question": "¿Cómo das el aviso de transición?",
        "options": [
          {
            "id": "a",
            "text": "“Te aviso cuando te queden dos columpiadas más para despedirnos del parque.”",
            "isCorrect": true,
            "feedback": "¡Excelente! La medida concreta de 2 columpiadas le da control y cierre mental."
          },
          {
            "id": "b",
            "text": "“Nos vamos en un ratito.”",
            "isCorrect": false,
            "feedback": "Los niños pequeños no comprenden la palabra abstracta \"ratito\"."
          },
          {
            "id": "c",
            "text": "Subirlo al coche a la fuerza sin decirle nada.",
            "isCorrect": false,
            "feedback": "Provoca sensación de invasión y un berrinche reactivo intenso."
          }
        ]
      },
      {
        "id": "pantallas",
        "name": "Apagar pantallas",
        "icon": "📱",
        "sceneDescription": "Está mirando su serie favorita en la tablet.",
        "question": "¿Cómo anticipas el final del tiempo acordado?",
        "options": [
          {
            "id": "a",
            "text": "“Faltan 5 minutos para terminar el capítulo. Cuando suene la alarma, ¿apagas tú la pantalla o te ayudo?”",
            "isCorrect": true,
            "feedback": "¡Brillante! La alarma externa actúa como juez neutro y tú eres el guía empático."
          },
          {
            "id": "b",
            "text": "Desconectar el WiFi de sorpresa.",
            "isCorrect": false,
            "feedback": "Crea desconfianza y sensación de trampa."
          },
          {
            "id": "c",
            "text": "Gritarle desde la cocina que apague eso ya.",
            "isCorrect": false,
            "feedback": "Las órdenes a distancia casi nunca se cumplen."
          }
        ]
      },
      {
        "id": "bano",
        "name": "Hora del baño",
        "icon": "🛁",
        "sceneDescription": "Está absorto armando un rompecabezas en el suelo.",
        "question": "¿Cómo preparas la transición hacia el baño?",
        "options": [
          {
            "id": "a",
            "text": "“Coloca las últimas dos fichas del rompecabezas y vamos juntos a saltar a la tina con espuma.”",
            "isCorrect": true,
            "feedback": "¡Eso es! Respetas su juego, cierras con 2 fichas y anuncias algo agradable."
          },
          {
            "id": "b",
            "text": "“Deja todo tirado y ven a bañarte rápido.”",
            "isCorrect": false,
            "feedback": "Corta su proceso mental bruscamente y garantiza queja."
          },
          {
            "id": "c",
            "text": "Esperar a que se canse solo aunque sean las 10 de la noche.",
            "isCorrect": false,
            "feedback": "Rompe la estructura y horarios saludables de la familia."
          }
        ]
      },
      {
        "id": "colegio",
        "name": "Salir de casa",
        "icon": "🎒",
        "sceneDescription": "Faltan 10 minutos para salir por la puerta rumbo al colegio.",
        "question": "¿Cómo anticipas los pasos de la salida?",
        "options": [
          {
            "id": "a",
            "text": "“Faltan 5 minutos: primero ponemos los zapatos, luego tomamos la mochila y salimos como astronautas.”",
            "isCorrect": true,
            "feedback": "¡Fantástico! Desglosas los pasos secuenciales con un toque de imaginación."
          },
          {
            "id": "b",
            "text": "“¡Vamos tarde, apúrate, siempre nos atrasas!”",
            "isCorrect": false,
            "feedback": "Genera pánico y bloquea las habilidades motoras del niño."
          },
          {
            "id": "c",
            "text": "No decir nada hasta que abres la puerta del auto.",
            "isCorrect": false,
            "feedback": "No le da oportunidad de colaborar ni de aprender a organizarse."
          }
        ]
      }
    ],
    "reminder": "La anticipación convierte los choques de voluntad en acuerdos previsibles y pacíficos."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Pautas para dominar el arte de la anticipación en casa:",
    "cards": [
      {
        "id": "alerta_cinco",
        "title": "Aviso a los 5 minutos",
        "desc": "Da una alerta previa clara con una medida comprensible para él."
      },
      {
        "id": "metas_tangibles",
        "title": "Metas tangibles",
        "desc": "Usa referencias físicas: \"dos canciones\", \"dos bajadas\", \"dos fichas\"."
      },
      {
        "id": "dos_opciones",
        "title": "Ofrece dos opciones",
        "desc": "Pregunta: \"¿Caminas como robot o como gigante hacia la cena?\"."
      },
      {
        "id": "sosten_corte",
        "title": "Sostén el cierre",
        "desc": "Acompaña el final sin abrir una negociación interminable."
      }
    ],
    "reminder": "El cerebro infantil coopera mejor cuando sabe qué esperar con antelación."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Errores comunes que generan berrinches durante las transiciones:",
    "cards": [
      {
        "id": "corte_abrupto",
        "title": "Cortes abruptos",
        "desc": "Evita apagar aparatos o arrebatar juguetes sin previo aviso."
      },
      {
        "id": "avisos_eternos",
        "title": "Avisar 15 veces",
        "desc": "No des avisos falsos que nunca se cumplen; pierde credibilidad."
      },
      {
        "id": "ceder_al_llanto",
        "title": "Negociar en el llanto",
        "desc": "No permitas más tiempo solo porque protestó al sonar la campana."
      },
      {
        "id": "terminos_vagos",
        "title": "Palabras vagas",
        "desc": "Evita decir \"en un ratito\" o \"ya casi\", que el niño no puede medir."
      }
    ],
    "reminder": "La previsibilidad amorosa es el mayor antídoto contra la angustia infantil."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Transición con Aviso Previo",
    "description": "Elige la hora de pantallas o salida del parque y da un aviso claro a los 5 minutos con una meta de cierre tangible.",
    "habitKey": "anticipate_aviso_previo",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Avisa con tiempo tangible, ofrece una opción amable para cerrar y mantén la transición con calma."
  }
},

  {
  "id": "pon_limites",
  "number": 8,
  "title": "Pon límites",
  "subtitle": "Firmeza serena y límites claros",
  "tagline": "Sé firme sin entrar en una pelea.",
  "emoji": "🛑",
  "badge": "Habilidad 8 de 10",
  "color": "#EF4444",
  "bgSoft": "bg-rose-50",
  "borderSoft": "border-rose-200",
  "category": "limits",
  "isPremier": true,
  "whyImportant": "Poner límites no es pelear ni ganar una discusión a los gritos. La firmeza real es tranquila: valida el deseo o molestia del niño, pero sostiene el \"No\" con seguridad y afecto incondicional.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo engancharse en una pelea de poder agrava la resistencia.",
    "dialogue": "Niño: “¡NO! ¡No voy a guardar nada!” Adulto: “¡Pues lo vas a hacer porque aquí mando yo y punto!”",
    "didYouKnow": "Cuando los adultos se enganchan en el debate verbal, el niño siente que el límite es negociable y escala el volumen para imponerse."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "Tu hijo te exige comer galletas antes del almuerzo y se queja fuertemente. ¿Cómo sostienes el límite sin pelea?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "“¡No me contestes así o te quedas sin postre toda la semana entera!”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Es una amenaza desproporcionada nacida del enfado que el adulto no podrá sostener."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Ceder y darle una galleta para que no haga un escándalo en la casa.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Le enseña que la insistencia y el berrinche anulan las reglas de salud."
      },
      {
        "id": "c",
        "label": "C",
        "text": "“Sé que tienes muchas ganas de esa galleta, pero ahora es hora del almuerzo. La guardamos para la tarde.”",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Excelente! Valida su deseo (conexión) y mantiene firme la regla sin agresividad ni sermones."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo sostener un límite con afecto y pocas palabras.",
    "panels": [
      {
        "id": 1,
        "text": "“Entiendo que estés furioso, pero no permito golpes. Te acompaño mientras pasa la tormenta.”"
      },
      {
        "id": 2,
        "text": "“Sé que querías seguir jugando, pero la respuesta sigue siendo no. ¿Caminas o saltas hacia la cama?”"
      }
    ],
    "coachMessage": "La fórmula del límite respetuoso: 1) Valida la emoción (\"Entiendo tu molestia\"), 2) Sostén el límite con pocas palabras, 3) Ofrece una alternativa constructiva."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una situación típica para ensayar cómo sostener un límite con firmeza y calma:",
    "activities": [
      {
        "id": "dulce",
        "name": "Golosinas",
        "icon": "🍬",
        "sceneDescription": "Pide golosinas justo antes del almuerzo.",
        "question": "¿Cómo sostienes el límite con serenidad?",
        "options": [
          {
            "id": "a",
            "text": "“Sé que se te antoja, pero ahora comemos la sopa. El dulce queda para después.”",
            "isCorrect": true,
            "feedback": "¡Eso es! Valida el antojo y mantiene firme la secuencia alimenticia."
          },
          {
            "id": "b",
            "text": "“¡Qué fastidio contigo y los dulces, me tienes harto!”",
            "isCorrect": false,
            "feedback": "Ataca al niño en lugar de sostener la regla."
          },
          {
            "id": "c",
            "text": "Dárselo con tal de que no grite.",
            "isCorrect": false,
            "feedback": "Premia la exigencia ruidosa."
          }
        ]
      },
      {
        "id": "agresion",
        "name": "Límite físico",
        "icon": "🛑",
        "sceneDescription": "Intenta dar un manotazo por frustración.",
        "question": "¿Cómo intervienes de forma protectora?",
        "options": [
          {
            "id": "a",
            "text": "Sostienes sus manos con suavidad y dices: “Puedes estar enojado, pero no permito golpes. Yo te cuido”.",
            "isCorrect": true,
            "feedback": "¡Brillante! Pones un freno físico protector con tono seguro y afectuoso."
          },
          {
            "id": "b",
            "text": "Devolverle el golpe para que vea lo que se siente.",
            "isCorrect": false,
            "feedback": "Modela agresión física y destruye la seguridad del apego."
          },
          {
            "id": "c",
            "text": "Reírse pensando que es una broma graciosa.",
            "isCorrect": false,
            "feedback": "Confunde al niño sobre los límites corporales y de seguridad."
          }
        ]
      },
      {
        "id": "tienda",
        "name": "En la tienda",
        "icon": "🛒",
        "sceneDescription": "Exige comprar un juguete en el supermercado y llora en el pasillo.",
        "question": "¿Cómo mantienes la calma sin ceder?",
        "options": [
          {
            "id": "a",
            "text": "Te agachas a su altura y dices con calma: “Hoy vinimos por la comida. Sé que te gustó mucho, podemos anotarlo en tu lista de deseos”.",
            "isCorrect": true,
            "feedback": "¡Excelente! No compras el juguete y canalizas su ilusión en una lista sin discusión."
          },
          {
            "id": "b",
            "text": "Comprarlo para no pasar vergüenza ante la gente.",
            "isCorrect": false,
            "feedback": "Enseña que el llanto público doblega a los adultos."
          },
          {
            "id": "c",
            "text": "“¡Eres un malcriado, nunca más te saco a ningún lado!”",
            "isCorrect": false,
            "feedback": "Etiqueta al niño y hace amenazas poco realistas."
          }
        ]
      },
      {
        "id": "dormir",
        "name": "Hora de acostarse",
        "icon": "🛏️",
        "sceneDescription": "Sale de la cama 4 veces pidiendo agua y juego.",
        "question": "¿Cómo acompañas el límite del sueño?",
        "options": [
          {
            "id": "a",
            "text": "Lo tomas de la mano con cariño y lo devuelves a la cama diciendo: “Es hora de dormir. Te arropo y aquí estoy”.",
            "isCorrect": true,
            "feedback": "¡Eso es! Repites el mismo procedimiento sereno tantas veces como sea necesario."
          },
          {
            "id": "b",
            "text": "Perder el control y gritarle para que se duerma del susto.",
            "isCorrect": false,
            "feedback": "El cortisol del miedo impide el descanso reparador del cerebro infantil."
          },
          {
            "id": "c",
            "text": "Dejarlo en la sala hasta la madrugada frente a la tele.",
            "isCorrect": false,
            "feedback": "Afecta su ritmo circadiano y salud física."
          }
        ]
      }
    ],
    "reminder": "La firmeza no necesita elevar la voz: necesita mantenerse tranquila y constante en el tiempo."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Principios para sostener límites sin entrar en combates verbales:",
    "cards": [
      {
        "id": "valida_primero",
        "title": "Valida la emoción",
        "desc": "Dile: \"Sé que tienes muchas ganas / entiendo que te enoje\"."
      },
      {
        "id": "pocas_palabras",
        "title": "Pocas palabras",
        "desc": "Sostén la respuesta sin dar discursos interminables."
      },
      {
        "id": "tono_neutro",
        "title": "Tono neutro y seguro",
        "desc": "Habla con calma y firmeza sin suplicar ni gritar."
      },
      {
        "id": "presencia_cercana",
        "title": "Acompaña su enojo",
        "desc": "Quédate cerca con presencia afectuosa mientras pasa el berrinche."
      }
    ],
    "reminder": "El límite cuida al niño; tu calma le enseña que la frustración se puede superar."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Trampas que destruyen la eficacia de los límites:",
    "cards": [
      {
        "id": "debatir",
        "title": "Engancharte a debatir",
        "desc": "No entres en discusiones lógicas de 20 minutos con un niño alterado."
      },
      {
        "id": "ceder_cansancio",
        "title": "Ceder por cansancio",
        "desc": "Si dijiste que no, no lo transformes en sí por evitar el llanto."
      },
      {
        "id": "amenazas_vacias",
        "title": "Amenazas gigantes",
        "desc": "Evita castigos absurdos nacidos de tu desesperación momentánea."
      },
      {
        "id": "culpa",
        "title": "Sentirte culpable",
        "desc": "No pidas perdón por una regla razonable que protege su bienestar."
      }
    ],
    "reminder": "Un niño que nunca escucha un \"No\" firme crece con angustia y desorientación."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Límite Firme y Respetuoso",
    "description": "Sostén un límite hoy usando tono neutro, validando su molestia pero manteniendo el \"No\" con serenidad.",
    "habitKey": "pon_limites_firme_calmado",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Valida la emoción en 5 segundos, sostén la regla sin ceder y acompaña su proceso con cariño."
  }
},

  {
  "id": "ensena_que_hacer",
  "number": 9,
  "title": "Enseña qué hacer",
  "subtitle": "Conductas alternativas positivas",
  "tagline": "No le digas solamente qué debe dejar de hacer.",
  "emoji": "🔄",
  "badge": "Habilidad 9 de 10",
  "color": "#10B981",
  "bgSoft": "bg-emerald-50",
  "borderSoft": "border-emerald-200",
  "category": "communication",
  "isPremier": true,
  "whyImportant": "El cerebro infantil no puede procesar un vacío de conducta. Decir \"¡no corras!\" o \"¡no grites!\" solo resalta la palabra negativa. Tu hijo necesita saber con qué movimiento exacto reemplazar esa energía.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en por qué las órdenes en negativo producen el efecto contrario.",
    "dialogue": "“¡NO CORRAS! ¡NO TOQUES ESO! ¡NO GRITES EN LA CASA!”",
    "didYouKnow": "Cuando reemplazas una orden negativa por una conducta alternativa positiva, la tasa de cooperación infantil aumenta más de un 70% a la primera indicación."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "Tu hijo está tirando bloques de madera por los aires. ¿Qué indicación enseña la conducta alternativa?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "“¡Deja de tirar todo al piso ahora mismo!”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Le recuerda el acto negativo sin darle un cauce constructivo a su energía motriz."
      },
      {
        "id": "b",
        "label": "B",
        "text": "“Los bloques ruedan por la alfombra o los guardamos en la caja, por favor.”",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Brillante! Le dices exactamente cómo sí se usa el objeto y cuál es la alternativa segura."
      },
      {
        "id": "c",
        "label": "C",
        "text": "“Si vuelves a tirar eso te quito todos los juguetes.”",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Es una amenaza reactiva que no le enseña la conducta adecuada."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo transformar un \"NO\" en una indicación motora positiva.",
    "panels": [
      {
        "id": 1,
        "text": "“En la casa usamos pies que caminan despacio a mi lado.”"
      },
      {
        "id": 2,
        "text": "“Háblame con voz suave y bajita para poder entender lo que necesitas.”"
      }
    ],
    "coachMessage": "Convierte cada prohibición en una acción física que sus manos o pies sí puedan realizar de inmediato."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una situación típica para transformar una prohibición en una conducta incompatible positiva:",
    "activities": [
      {
        "id": "correr",
        "name": "Correr en pasillo",
        "icon": "🏃",
        "sceneDescription": "Tu hijo corre a toda velocidad en un piso resbaloso.",
        "question": "¿Cuál es la alternativa positiva?",
        "options": [
          {
            "id": "a",
            "text": "“Camina despacito y toma mi mano para cruzar este pasillo.”",
            "isCorrect": true,
            "feedback": "¡Exacto! Sustituyes el correr por caminar y tomar la mano con seguridad."
          },
          {
            "id": "b",
            "text": "“¡Que no corras te dije!”",
            "isCorrect": false,
            "feedback": "El niño solo escucha \"corras\" y sigue acelerando."
          },
          {
            "id": "c",
            "text": "Hacerle una zancadilla para detenerlo.",
            "isCorrect": false,
            "feedback": "Peligroso e inadecuado para la confianza."
          }
        ]
      },
      {
        "id": "gritar",
        "name": "Gritos en el auto",
        "icon": "🚗",
        "sceneDescription": "Grita fuertemente en el asiento trasero.",
        "question": "¿Cómo redirigir su voz?",
        "options": [
          {
            "id": "a",
            "text": "“Dímelo en un susurro como si fuera un secreto para que pueda escucharte mientras manejo.”",
            "isCorrect": true,
            "feedback": "¡Brillante! El susurro es una conducta incompatible con el grito y le divierte."
          },
          {
            "id": "b",
            "text": "“¡Cállate ya que me vas a hacer chocar!”",
            "isCorrect": false,
            "feedback": "Aumenta los decibeles de tensión en el vehículo."
          },
          {
            "id": "c",
            "text": "Subir la música al máximo para tapar su voz.",
            "isCorrect": false,
            "feedback": "Sobrecarga sensorial que empeora la desregulación infantil."
          }
        ]
      },
      {
        "id": "tirar",
        "name": "Tirar objetos",
        "icon": "🧱",
        "sceneDescription": "Lanza cojines o juguetes pesados hacia las personas.",
        "question": "¿Qué conducta alternativa le ofreces?",
        "options": [
          {
            "id": "a",
            "text": "“Si quieres lanzar, lanza esta pelota blanda adentro de la cesta de ropa.”",
            "isCorrect": true,
            "feedback": "¡Excelente! Canalizas la necesidad motora de lanzar hacia un objetivo seguro."
          },
          {
            "id": "b",
            "text": "“¡Deja de ser tan agresivo!”",
            "isCorrect": false,
            "feedback": "Etiqueta al niño en vez de orientar su energía."
          },
          {
            "id": "c",
            "text": "Quitarle todo y encerrarlo en su cuarto.",
            "isCorrect": false,
            "feedback": "Aislamiento punitivo que no enseña uso seguro de objetos."
          }
        ]
      },
      {
        "id": "hablar",
        "name": "Interrumpir",
        "icon": "🗣️",
        "sceneDescription": "Jala de tu ropa mientras estás conversando con otra persona.",
        "question": "¿Cómo enseñarle a pedir la palabra con respeto?",
        "options": [
          {
            "id": "a",
            "text": "“Pon tu mano en mi hombro para saber que quieres hablar y en cuanto termine la frase te atiendo.”",
            "isCorrect": true,
            "feedback": "¡Fantástico! Crea un código corporal de espera respetuoso y eficaz."
          },
          {
            "id": "b",
            "text": "“¡No interrumpas a los grandes!”",
            "isCorrect": false,
            "feedback": "Le hace sentir invisible y aumentará los tirones."
          },
          {
            "id": "c",
            "text": "Ignorarlo por completo hasta que se canse.",
            "isCorrect": false,
            "feedback": "El niño escalará al llanto o al grito para ser notado."
          }
        ]
      }
    ],
    "reminder": "Dile a tu hijo qué hacer con su cuerpo y sus manos, en vez de repetirle lo que debe evitar."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Pautas para transformar el lenguaje de prohibición en indicaciones de acción:",
    "cards": [
      {
        "id": "sustituye_no",
        "title": "Sustituye el \"No\"",
        "desc": "Cambia \"no corras\" por \"camina despacio a mi lado\"."
      },
      {
        "id": "nombra_cuerpo",
        "title": "Nombra el cuerpo",
        "desc": "Indica qué hacer con las manos, los pies o la voz."
      },
      {
        "id": "salida_segura",
        "title": "Canal seguro",
        "desc": "Da una opción compatible con la energía que está sintiendo."
      },
      {
        "id": "reconoce_cambio",
        "title": "Elogia el cambio",
        "desc": "Apenas adopte la conducta positiva, reconóceselo con una sonrisa."
      }
    ],
    "reminder": "Guiar es mostrar el camino que sí se debe pisar, no solo poner carteles de prohibido pasar."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Costumbres que bloquean la conducta alternativa:",
    "cards": [
      {
        "id": "bombardeo_no",
        "title": "Bombardeo de \"No\"",
        "desc": "Evita pasar el día diciendo no toques, no saltes, no grites."
      },
      {
        "id": "asumir_sabe",
        "title": "Asumir que ya sabe",
        "desc": "No des por sentado que el niño sabe cómo actuar en vez de."
      },
      {
        "id": "discursos_largos",
        "title": "Discursos abstractos",
        "desc": "Decir \"sé educado\" no le dice a sus músculos qué hacer."
      },
      {
        "id": "prohibir_sin_canal",
        "title": "Prohibir sin opción",
        "desc": "No bloquees una conducta sin ofrecer un juego o salida segura."
      }
    ],
    "reminder": "Un niño ocupado en una conducta positiva no tiene tiempo de incurrir en la negativa."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Cambia 1 \"NO\" por una Acción Positiva",
    "description": "Cada vez que estés por decir \"¡No hagas eso!\", transfórmalo en la acción concreta que sí esperas ver en ese momento.",
    "habitKey": "ensena_conducta_alternativa",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Di el verbo de acción, ponte a su altura y reconoce su cooperación apenas empiece."
  }
},

  {
  "id": "se_constante",
  "number": 10,
  "title": "Sé constante",
  "subtitle": "Previsibilidad y consistencia",
  "tagline": "Lo que haces muchas veces enseña más que lo que haces una vez.",
  "emoji": "🔁",
  "badge": "Habilidad 10 de 10",
  "color": "#0D9488",
  "bgSoft": "bg-teal-50",
  "borderSoft": "border-teal-200",
  "category": "limits",
  "isPremier": true,
  "whyImportant": "La inconsistencia es el mayor combustible de los berrinches persistentes. Si un niño sabe que 1 de cada 4 veces sus quejas hacen que cedas, insistirá siempre. La consistencia crea un hogar predecible y seguro.",
  "miraQuePasa": {
    "tag": "1. Mira qué pasa",
    "subtitle": "Observa esta situación cotidiana. Fíjate en cómo la falta de consistencia genera confusión y discusiones diarias.",
    "dialogue": "Lunes: “Cero celular en la mesa”. Martes: “Bueno, unos minutos porque estoy cansado”. Miércoles: “¡¿Por qué nunca me haces caso?!”",
    "didYouKnow": "El cerebro infantil busca patrones. Cuando las reglas cambian con el humor del adulto, el niño vive en incertidumbre y prueba los límites cada día."
  },
  "elige": {
    "tag": "2. Elige",
    "prompt": "Cuando tu hijo llora e insiste para romper un acuerdo, ¿qué promueve mayor seguridad y paz a largo plazo?",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Ceder solo los días que estés de buen humor para que no sufra.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Crea confusión e inseguridad sobre cuándo la regla es real y cuándo no."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Mantener la misma respuesta tranquila tanto el lunes como el domingo.",
        "isCorrect": true,
        "feedbackTitle": "¡Exacto!",
        "feedback": "¡Perfecto! La previsibilidad reduce la ansiedad infantil y elimina la necesidad de probar los límites a diario."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Cambiar la regla sobre la marcha según cuánto llore.",
        "isCorrect": false,
        "feedbackTitle": "¡Probemos otra forma!",
        "feedback": "Le enseña que el volumen del llanto determina las reglas de la casa."
      }
    ]
  },
  "miraComoSeHace": {
    "tag": "3. Mira cómo se hace",
    "subtitle": "Escucha dos ejemplos reales de cómo responder con la misma serenidad predecible cada día.",
    "panels": [
      {
        "id": 1,
        "text": "“Sé que tienes ganas de seguir, pero la regla de hoy es la misma de ayer. La hora de dormir no cambia.”"
      },
      {
        "id": 2,
        "text": "“Entiendo tu molestia. Mañana volveremos a tener tiempo para jugar; ahora corresponde cenar juntos.”"
      }
    ],
    "coachMessage": "Es mejor tener 3 reglas que puedas sostener con serenidad todos los días, que 20 reglas que rompas por agotamiento a mitad de semana."
  },
  "practica": {
    "tag": "4. Practica",
    "subtitle": "Selecciona una situación típica para practicar la consistencia tranquila:",
    "activities": [
      {
        "id": "dormir",
        "name": "Hora de dormir fija",
        "icon": "🌙",
        "sceneDescription": "Insiste en quedarse despierto 30 minutos más jugando.",
        "question": "¿Cómo responder con consistencia serena?",
        "options": [
          {
            "id": "a",
            "text": "“La hora de dormir es la misma de siempre. Te acompaño a tu cama y leemos el cuento.”",
            "isCorrect": true,
            "feedback": "¡Eso es! No negocias el límite del descanso y ofreces presencia amorosa."
          },
          {
            "id": "b",
            "text": "“Bueno, pero mañana te duermes temprano.”",
            "isCorrect": false,
            "feedback": "Rompe la regla y garantiza que mañana insista el doble."
          },
          {
            "id": "c",
            "text": "Gritarle que es un desconsiderado.",
            "isCorrect": false,
            "feedback": "Pierde el control y no sostiene el hábito con calma."
          }
        ]
      },
      {
        "id": "orden",
        "name": "Guardar antes de sacar",
        "icon": "📦",
        "sceneDescription": "Quiere sacar las pinturas teniendo todos los bloques tirados.",
        "question": "¿Cómo mantener el acuerdo básico?",
        "options": [
          {
            "id": "a",
            "text": "“En cuanto los bloques estén en su caja, bajamos las pinturas. Te ayudo con los primeros tres.”",
            "isCorrect": true,
            "feedback": "¡Excelente! Mantienes la regla con colaboración y sin enfado."
          },
          {
            "id": "b",
            "text": "Dejar que saque todo y luego quejarte del desorden.",
            "isCorrect": false,
            "feedback": "Inconsistencia que genera caos en el hogar."
          },
          {
            "id": "c",
            "text": "Recoger tú todo con enojo mientras él pinta.",
            "isCorrect": false,
            "feedback": "Fomenta la falta de responsabilidad en el niño."
          }
        ]
      },
      {
        "id": "comida",
        "name": "Pantallas en la mesa",
        "icon": "🍽️",
        "sceneDescription": "Pide el celular para comer durante el almuerzo.",
        "question": "¿Cómo sostener la regla de la mesa?",
        "options": [
          {
            "id": "a",
            "text": "“En la mesa los celulares descansan. Ahora disfrutamos la comida y conversamos de nuestro día.”",
            "isCorrect": true,
            "feedback": "¡Brillante! Mensaje predecible y claro que protege la conexión familiar."
          },
          {
            "id": "b",
            "text": "Dárselo porque hoy no tienes paciencia.",
            "isCorrect": false,
            "feedback": "Enseña que las normas dependen de tu nivel de cansancio."
          },
          {
            "id": "c",
            "text": "Burlarte de su apego al teléfono.",
            "isCorrect": false,
            "feedback": "Ofensivo e ineficaz para crear hábitos de desconexión."
          }
        ]
      },
      {
        "id": "cansancio",
        "name": "Desafío y cansancio",
        "icon": "😮‍💨",
        "sceneDescription": "Estás exhausto y tu hijo llora para romper una regla acordada.",
        "question": "¿Cómo sostenerte sin pelear ni ceder?",
        "options": [
          {
            "id": "a",
            "text": "Respiras hondo y repites con voz baja: “Sé que estás cansado y yo también. El acuerdo se mantiene igual”.",
            "isCorrect": true,
            "feedback": "¡Impresionante! Validas el cansancio de ambos sin quebrar la estructura protectora."
          },
          {
            "id": "b",
            "text": "Ceder gritando que te arruinó el día.",
            "isCorrect": false,
            "feedback": "Doble mensaje: rompes la regla y además lo culpas."
          },
          {
            "id": "c",
            "text": "Imponer un castigo nuevo y severo.",
            "isCorrect": false,
            "feedback": "La severidad inconsistente no enseña disciplina interna."
          }
        ]
      }
    ],
    "reminder": "La consistencia tranquila le da al niño el mayor regalo de la infancia: un mundo predecible y seguro."
  },
  "puedesDecirOHacer": {
    "tag": "5. Puedes decir o hacer",
    "subtitle": "Claves para mantener la constancia en el día a día sin desgastarte:",
    "cards": [
      {
        "id": "pocas_reglas",
        "title": "Pocas reglas de oro",
        "desc": "Elige solo 2 o 3 acuerdos que tengas la energía de cuidar siempre."
      },
      {
        "id": "mismo_mensaje",
        "title": "Mismo mensaje",
        "desc": "Usa las mismas palabras y tono sereno tanto el lunes como el domingo."
      },
      {
        "id": "resiste_cansancio",
        "title": "Anticipa el cansancio",
        "desc": "Recuerda que ceder por apuro hoy multiplica el conflicto de mañana."
      },
      {
        "id": "afecto_siempre",
        "title": "Firmeza con amor",
        "desc": "La regla no se rompe, pero el abrazo y la contención siempre están."
      }
    ],
    "reminder": "Lo que haces de forma constante es lo que tu hijo recordará e integrará en su vida."
  },
  "evita": {
    "tag": "6. Evita",
    "subtitle": "Inconsistencias que alimentan la queja infantil:",
    "cards": [
      {
        "id": "reglas_humor",
        "title": "Reglas según humor",
        "desc": "No seas permisivo un día y estricto y punitivo al siguiente."
      },
      {
        "id": "ceder_agotamiento",
        "title": "Ceder por cansancio",
        "desc": "Ceder enseña que el berrinche largo y ruidoso da resultados."
      },
      {
        "id": "amenazas_sin_cumplir",
        "title": "Amenazas en el aire",
        "desc": "No digas cosas que sabes que no vas a llevar a cabo."
      },
      {
        "id": "culpa_regla",
        "title": "Culpa por la regla",
        "desc": "La previsibilidad no daña al niño; le da contención y tranquilidad."
      }
    ],
    "reminder": "Un padre predecible es un refugio seguro donde el niño no necesita pelear por el control."
  },
  "pruebaloHoy": {
    "tag": "7. Pruébalo hoy",
    "badge": "Tu misión",
    "title": "Una Regla de Oro Blindada",
    "description": "Elige UNA sola regla sencilla hoy (ej. lavarse dientes o apagar tele a la hora acordada) y mantén la misma respuesta todo el día.",
    "habitKey": "se_constante_una_regla",
    "durations": [
      {
        "id": "2min",
        "label": "2 minutos",
        "sub": "Versión breve"
      },
      {
        "id": "5min",
        "label": "5 minutos",
        "sub": "Tiempo completo"
      }
    ],
    "moments": [
      {
        "id": "manana",
        "label": "Mañana",
        "icon": "sun"
      },
      {
        "id": "tarde",
        "label": "Tarde",
        "icon": "sunset"
      },
      {
        "id": "noche",
        "label": "Noche",
        "icon": "moon"
      },
      {
        "id": "despues",
        "label": "Elegir después",
        "icon": "calendar"
      }
    ],
    "reminder": "Elige una sola regla, mantén la misma respuesta con tranquilidad y felicítate por tu consistencia."
  }
}
];

export const getSkillById = (id) => {
  return learnSkills.find(skill => skill.id === id) || learnSkills[0];
};
