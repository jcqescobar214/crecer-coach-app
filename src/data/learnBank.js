// Banco de contenidos de las 9 Habilidades Parentales
// para la sección "Quiero aprender" de la app Crecer

export const learnSkills = [
  {
    id: 'habla_claro',
    number: 1,
    title: 'Habla claro',
    tagline: 'Dile exactamente qué esperas que haga.',
    emoji: '🗣️',
    color: '#D97706',
    bgSoft: 'bg-amber-50',
    borderSoft: 'border-amber-200',
    miraQuePasa: {
      dialogue: '“¡Organiza todo este desorden y compórtate!”',
      childReaction: 'El niño continúa jugando como si no hubiera escuchado.',
      coachInsight: 'A veces creemos que fuimos claros, pero para un niño de 3 a 6 años "desorden" o "pórtate bien" son conceptos abstractos. Necesita saber la acción física exacta.'
    },
    elige: {
      prompt: 'Quieres que guarde sus juguetes. ¿Cuál instrucción es más efectiva?',
      options: [
        {
          id: 'a',
          text: '“¡Deja de ser tan desordenado!”',
          isCorrect: false,
          feedback: 'Etiqueta al niño y no le dice qué acción física debe realizar ahora.'
        },
        {
          id: 'b',
          text: '“Guarda los juguetes en la caja, por favor.”',
          isCorrect: true,
          feedback: '¡Exacto! Le dijiste exactamente qué hacer, dónde ponerlo y de forma respetuosa.'
        },
        {
          id: 'c',
          text: '“¿Cuántas veces tengo que decirte lo mismo?”',
          isCorrect: false,
          feedback: 'Es un desahogo de frustración del adulto, no una indicación clara.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Transforma: “¡Pórtate bien!” en una instrucción concreta.',
      helper: 'Intenta comenzar con una acción física: guarda, trae, siéntate, habla, pon...',
      options: [
        { id: '1', verb: 'Guarda', action: 'los bloques en el cesto amarillo.' },
        { id: '2', verb: 'Siéntate', action: 'en la silla con los pies hacia adelante.' },
        { id: '3', verb: 'Camina', action: 'despacio a mi lado mientras cruzamos.' },
        { id: '4', verb: 'Habla', action: 'con voz bajita para poder escucharte.' }
      ]
    },
    puedesDecir: [
      '“Pon los zapatos en el armario, por favor.”',
      '“Guarda el celular y ven a la mesa.”',
      '“Háblame con voz tranquila.”'
    ],
    evita: [
      'Dar varias instrucciones al mismo tiempo.',
      'Usar palabras absolutas como “siempre” y “nunca”.',
      'Gritar la orden desde otra habitación.',
      'Preguntar (“¿quieres guardar?”) cuando es una instrucción.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: '3 Instrucciones Claras y Específicas',
      description: 'Acércate a su altura, da una sola instrucción por vez y di exactamente la acción concreta que esperas.',
      habitKey: 'habla_claro_3_instrucciones'
    }
  },

  {
    id: 'elogia',
    number: 2,
    title: 'Elogia',
    tagline: 'Hazle saber exactamente qué hizo bien.',
    emoji: '⭐',
    color: '#EAB308',
    bgSoft: 'bg-yellow-50',
    borderSoft: 'border-yellow-200',
    miraQuePasa: {
      dialogue: 'El niño recoge sus juguetes y el adulto dice al pasar: “Muy bien”.',
      childReaction: 'El niño apenas levanta la mirada y no sabe qué fue lo que agradó.',
      coachInsight: 'Un "muy bien" genérico se pierde. El cerebro infantil aprende mucho más rápido cuando el elogio describe la conducta concreta que acaba de ocurrir.'
    },
    elige: {
      prompt: 'Tu hijo recogió sus materiales al terminar de pintar. ¿Cuál elogio refuerza más la conducta?',
      options: [
        {
          id: 'a',
          text: '“Por fin hiciste caso sin renegar.”',
          isCorrect: false,
          feedback: 'Recuerda el error pasado y arruina el reconocimiento positivo.'
        },
        {
          id: 'b',
          text: '“Muy bien.”',
          isCorrect: false,
          feedback: 'Es cariñoso, pero demasiado vago para fijar el hábito.'
        },
        {
          id: 'c',
          text: '“¡Me encantó que guardaras los pinceles apenas terminaste!”',
          isCorrect: true,
          feedback: '¡Perfecto! El niño sabe exactamente qué acción específica estás reconociendo y querrá repetirla.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Tu hijo se sentó a hacer la tarea sin discutir. Completa tu elogio específico:',
      helper: 'Elogia el esfuerzo y la acción exacta, no la perfección.',
      options: [
        { id: '1', verb: 'Me gustó mucho que', action: 'te sentaras a la primera llamada con tus cuadernos listos.' },
        { id: '2', verb: 'Gracias por', action: 'empezar tu tarea con calma y entusiasmo hoy.' },
        { id: '3', verb: 'Noté que', action: 'dejaste tus juguetes a tiempo para concentrarte. ¡Gran esfuerzo!' }
      ]
    },
    puedesDecir: [
      '“Me gustó cómo esperaste tu turno con paciencia.”',
      '“Gracias por guardar el celular cuando te lo pedí.”',
      '“Vi que estabas enojado y hablaste sin gritar. ¡Muy bien!”'
    ],
    evita: [
      'Elogiar con un “pero...” al final (“Bien, pero mañana hazlo más rápido”).',
      'Usar sarcasmo o ironía (“¡Milagro que recogiste!”).',
      'Elogiar únicamente resultados perfectos en vez del esfuerzo.',
      'Esperar semanas o grandes hitos para reconocer un avance.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: '¡Atrápalo haciéndolo bien!',
      description: 'Encuentra 3 conductas positivas cotidianas hoy y descríbelas en voz alta inmediatamente.',
      habitKey: 'elogia_atrapalo_bien'
    }
  },

  {
    id: 'motiva',
    number: 3,
    title: 'Motiva',
    tagline: 'Ayúdalo a querer repetir lo que está haciendo bien.',
    emoji: '🎯',
    color: '#F97316',
    bgSoft: 'bg-orange-50',
    borderSoft: 'border-orange-200',
    miraQuePasa: {
      dialogue: '“Si haces la tarea sin quejarte, te compro un juguete el sábado.”',
      childReaction: 'El niño se acostumbra a cooperar solo cuando hay un soborno material.',
      coachInsight: 'No necesitas comprar regalos. Los mejores motivadores para niños pequeños son el tiempo compartido, la atención del adulto, elegir una canción o ganar un privilegio divertido.'
    },
    elige: {
      prompt: '¿Cuál de estos reforzadores suele ser más duradero y saludable para un niño?',
      options: [
        {
          id: 'a',
          text: 'Comprarle un dulce o juguete cada vez que obedece.',
          isCorrect: false,
          feedback: 'Crea dependencia material y pierde efecto muy rápidamente.'
        },
        {
          id: 'b',
          text: 'Elegir juntos el cuento de la noche o 10 minutos de juego libre.',
          isCorrect: true,
          feedback: '¡Excelente! Los privilegios de tiempo y atención fortalecen el vínculo y la motivación intrínseca.'
        },
        {
          id: 'c',
          text: 'Darle el premio antes de que cumpla la conducta para calmarlo.',
          isCorrect: false,
          feedback: 'Refuerza la queja previa en lugar de la conducta esperada.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Construye tu regla de motivación usando el principio: "Primero cumples, luego recibes":',
      helper: 'Fórmula: Cuando [Acción] → Entonces [Privilegio agradable].',
      options: [
        { id: '1', verb: 'Cuando', action: 'termines de ponerte el pijama → leemos dos cuentos juntos en la cama.' },
        { id: '2', verb: 'Cuando', action: 'los bloques estén en su caja → ponemos tu música favorita para bailar.' },
        { id: '3', verb: 'Cuando', action: 'la mesa quede limpia → salimos 15 minutos al parque.' }
      ]
    },
    puedesDecir: [
      '“Cuando termines de recoger los colores, podemos jugar.”',
      '“Cada vez que cooperas a la primera, ganas una estrella para la salida del fin de semana.”',
      '“Gracias por terminar a tiempo; ahora tenemos tiempo extra para jugar.”'
    ],
    evita: [
      'Prometer recompensas gigantes que luego no podrás cumplir.',
      'Utilizar siempre premios de comida chatarra o dinero.',
      'Entregar el beneficio antes de que realice el esfuerzo.',
      'Cambiar las reglas a mitad de camino según tu humor.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Elige UNA conducta y refuérzala',
      description: 'Define un privilegio simple de tiempo compartido y otórgualo apenas tu hijo cumpla la acción.',
      habitKey: 'motiva_tiempo_compartido'
    }
  },

  {
    id: 'da_ejemplo',
    number: 4,
    title: 'Da ejemplo',
    tagline: 'Enséñale con lo que haces.',
    emoji: '👀',
    color: '#06B6D4',
    bgSoft: 'bg-cyan-50',
    borderSoft: 'border-cyan-200',
    miraQuePasa: {
      dialogue: 'El adulto grita alterado: “¡TE DIJE QUE DEJES DE GRITAR EN ESTA CASA!”',
      childReaction: 'El niño se asusta, llora o responde gritando con más fuerza.',
      coachInsight: 'Los niños aprenden por neuronas espejo. No podemos enseñar serenidad gritando, ni enseñar respeto perdiendo el control.'
    },
    elige: {
      prompt: 'Tu hijo derrama un vaso de leche por accidente. ¿Qué le enseñará mejor a manejar errores?',
      options: [
        {
          id: 'a',
          text: '“¡Mira lo que hiciste! ¡Siempre eres tan torpe!”',
          isCorrect: false,
          feedback: 'Enseña culpa, vergüenza y miedo a equivocarse.'
        },
        {
          id: 'b',
          text: '“Fue un accidente. Respira, toma un trapo y vamos a limpiarlo juntos.”',
          isCorrect: true,
          feedback: '¡Exacto! Modela que los accidentes se resuelven con calma y responsabilidad.'
        },
        {
          id: 'c',
          text: 'Limpiarlo tú con enojo y resoplando en silencio.',
          isCorrect: false,
          feedback: 'Comunica resentimiento pasivo en lugar de una solución constructiva.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: '¿Qué habilidad de autocontrol quieres modelar frente a tu hijo hoy?',
      helper: 'Decide cómo reaccionarás cuando sientas tensión.',
      options: [
        { id: '1', verb: 'Autocontrol:', action: 'Decir en voz alta: “Estoy frustrado. Voy a respirar hondo antes de responder”.' },
        { id: '2', verb: 'Reparación:', action: 'Pedir disculpas si levanté la voz: “Perdona, me alteré. Hablemos con calma”.' },
        { id: '3', verb: 'Solución:', action: 'Mostrar optimismo ante un tropiezo: “Esto no salió como esperaba, intentémoslo otra vez”.' }
      ]
    },
    puedesDecir: [
      '“Estoy sintiendo mucho calor y enojo. Voy a tomar agua y vuelvo.”',
      '“Me equivoqué con lo que dije hace un momento. Lo siento.”',
      '“Se cayó la torre. Es frustrante, pero podemos volver a armarla.”'
    ],
    evita: [
      'Exigir al niño un autocontrol que los adultos no estamos demostrando.',
      'Ocultar siempre tus errores en vez de mostrar cómo repararlos.',
      'Tratar los accidentes normales como si fueran desobediencias voluntarias.',
      'Usar el teléfono mientras le exiges a él que deje las pantallas.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Modelado Consciente',
      description: 'Elige una situación que te dé impaciencia hoy y muestra en voz alta cómo respiras y mantienes la calma.',
      habitKey: 'da_ejemplo_calma'
    }
  },

  {
    id: 'practiquen_juntos',
    number: 5,
    title: 'Practiquen juntos',
    tagline: 'Las habilidades se aprenden practicando.',
    emoji: '🤝',
    color: '#8B5CF6',
    bgSoft: 'bg-purple-50',
    borderSoft: 'border-purple-200',
    miraQuePasa: {
      dialogue: '“¡Ya te he explicado diez veces que cuando estés furioso no debes pegar!”',
      childReaction: 'En la siguiente rabieta, el niño vuelve a lanzar un golpe.',
      coachInsight: 'Saber la regla de memoria no significa tener la habilidad motriz ni emocional instalada. Las habilidades de autorregulación se entrenan jugando, en momentos de calma.'
    },
    elige: {
      prompt: '¿Cuál es el mejor momento para ensayar cómo pedir las cosas por favor o cómo calmarse?',
      options: [
        {
          id: 'a',
          text: 'En pleno berrinche mientras llora y grita.',
          isCorrect: false,
          feedback: 'Bajo secuestro emocional el cerebro no puede asimilar nuevo aprendizaje.'
        },
        {
          id: 'b',
          text: 'Durante un momento tranquilo de juego a modo de simulacro divertido.',
          isCorrect: true,
          feedback: '¡Exacto! El ensayo en frío permite automatizar la respuesta sin la presión del enojo.'
        },
        {
          id: 'c',
          text: 'Justo después de haberle puesto un castigo.',
          isCorrect: false,
          feedback: 'El niño estará a la defensiva o resentido y lo vivirá como un regaño extra.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Entrenamiento rápido en 4 pasos:',
      helper: 'Elige la conducta que ensayarán hoy durante 2 minutos:',
      options: [
        { id: '1', verb: 'Paso a paso:', action: 'Tú lo muestras → Lo hacen juntos → Él lo intenta → Lo elogias con entusiasmo.' },
        { id: '2', verb: 'Respiración de león:', action: 'Jugar a inhalar por la nariz y rugir suavecito cuando se sienta enojado.' },
        { id: '3', verb: 'Pedir turno:', action: 'Practicar pasar la pelota diciendo: “¿Me lo prestas por favor cuando termines?”.' }
      ]
    },
    puedesDecir: [
      '“Vamos a jugar a que nos enojamos mucho, pero respiramos como tortugas.”',
      '“Mira cómo lo hago yo primero... ahora intentémoslo los dos.”',
      '“¡Eso es! Justo así es como se pide. ¡Choca esos cinco!”'
    ],
    evita: [
      'Intentar dar lecciones o ensayar en plena crisis de furia.',
      'Esperar que salga perfecto en el primer ensayo.',
      'Convertir el juego de práctica en un interrogatorio o regaño.',
      'Burlarse si al niño le cuesta seguir el ensayo.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Simulacro de 2 Minutos',
      description: 'Haz un juego de roles de 2 minutos sobre cómo pedir algo o cómo respirar antes de que ocurra el conflicto.',
      habitKey: 'practiquen_juntos_simulacro'
    }
  },

  {
    id: 'anticipate',
    number: 6,
    title: 'Anticípate',
    tagline: 'Prepáralo antes del momento difícil.',
    emoji: '🔮',
    color: '#6366F1',
    bgSoft: 'bg-indigo-50',
    borderSoft: 'border-indigo-200',
    miraQuePasa: {
      dialogue: 'El niño lleva una hora concentrado jugando y de repente escucha: “¡Apaga eso YA y ven a bañarte!”',
      childReaction: 'Gritos, llanto desbordado y resistencia feroz.',
      coachInsight: 'A los 3-6 años la corteza cerebral tarda en cambiar de foco atencional. Un corte abrupto se vive como una agresión. Los avisos previos suavizan la transición.'
    },
    elige: {
      prompt: '¿Cómo preparas mejor a tu hijo para salir del parque sin lágrimas?',
      options: [
        {
          id: 'a',
          text: 'Decirle a último segundo: “Nos vamos ya porque es tarde”.',
          isCorrect: false,
          feedback: 'Garantiza resistencia por sorpresa y frustración.'
        },
        {
          id: 'b',
          text: 'Avisar 5 minutos antes: “Te quedan 2 bajadas por el tobogán y nos vamos a cenar”.',
          isCorrect: true,
          feedback: '¡Perfecto! El tiempo tangible (2 bajadas) le permite cerrar su ciclo mental de juego.'
        },
        {
          id: 'c',
          text: 'Amenazarlo con no volver al parque si no corre hacia el auto.',
          isCorrect: false,
          feedback: 'Genera miedo y estrés innecesario en una rutina diaria.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Crea tu plan de transición con cuenta regresiva:',
      helper: 'Elige la rutina donde aplicarás los avisos de anticipación:',
      options: [
        { id: '1', verb: 'Apagar pantallas:', action: 'Aviso a los 10 min → Aviso a los 5 min → “¿Lo apagas tú o te ayudo?”.' },
        { id: '2', verb: 'Ir a dormir:', action: '“Terminamos este rompecabezas, lavamos dientes y leemos el cuento”.' },
        { id: '3', verb: 'Salir de casa:', action: '“Faltan 5 minutos para ponernos los zapatos y salir al colegio”.' }
      ]
    },
    puedesDecir: [
      '“En cinco minutos guardamos los juguetes para ir a cenar.”',
      '“Te aviso cuando te queden dos lanzamientos en el columpio.”',
      '“Se acabó el tiempo acordado. ¿Quieres guardar los bloques en la caja o en la repisa?”'
    ],
    evita: [
      'Cambios inesperados en rutinas que se pueden planificar.',
      'Avisar 10 veces seguidas y nunca cumplir el corte prometido.',
      'Reabrir la negociación cada vez que el niño empieza a llorar.',
      'Usar términos confusos como “dentro de un ratito”.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Transición con Aviso Previo',
      description: 'Elige la hora de pantallas o salida del parque y da un aviso claro a los 5 minutos con una acción de cierre.',
      habitKey: 'anticipate_aviso_previo'
    }
  },

  {
    id: 'pon_limites',
    number: 7,
    title: 'Pon límites',
    tagline: 'Sé firme sin entrar en una pelea.',
    emoji: '🛑',
    color: '#EF4444',
    bgSoft: 'bg-rose-50',
    borderSoft: 'border-rose-200',
    miraQuePasa: {
      dialogue: 'Niño: “¡NO! ¡No voy a guardar nada!” Adulto: “¡Pues lo vas a hacer porque aquí mando yo y punto!”',
      childReaction: 'El niño desafía más fuerte y la discusión escala a un combate de poder.',
      coachInsight: 'Cuando el adulto se engancha en la pelea verbal, valida el campo de batalla. La firmeza respetuosa no necesita gritos: valida la emoción y sostiene el límite sin ceder.'
    },
    elige: {
      prompt: 'Tu hijo te exige comer galletas antes del almuerzo. ¿Cómo sostienes el límite sin pelea?',
      options: [
        {
          id: 'a',
          text: '“¡No me contestes así o te quedas sin postre toda la semana!”',
          isCorrect: false,
          feedback: 'Es una amenaza desproporcionada nacida del enfado del adulto.'
        },
        {
          id: 'b',
          text: 'Ceder y darle una galleta para que no haga un escándalo.',
          isCorrect: false,
          feedback: 'Le enseña que la insistencia y el berrinche anulan las reglas.'
        },
        {
          id: 'c',
          text: '“Sé que tienes antojo de galleta, pero ahora es hora de almorzar. La guardamos para la tarde.”',
          isCorrect: true,
          feedback: '¡Excelente! Valida su deseo (conexión) y mantiene firme la regla sin agresión.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Fórmula de Límite Respetuoso: Reconoce emoción + Sostén la regla + Da alternativa:',
      helper: 'Elige cómo formularás tu límite hoy:',
      options: [
        { id: '1', verb: 'Límite físico:', action: '“Puedes estar furioso, pero no permito golpes. Te acompaño hasta que pase la tormenta”.' },
        { id: '2', verb: 'Límite de rutina:', action: '“Entiendo que quieras seguir jugando, pero el tiempo terminó. ¿Caminas o saltas a la cama?”.' },
        { id: '3', verb: 'Límite de respeto:', action: '“Te escucho con gusto cuando me hables con tu voz normal”.' }
      ]
    },
    puedesDecir: [
      '“Sé que querías seguir, pero la respuesta sigue siendo no.”',
      '“Está bien sentirse enojado; no está bien lastimar las cosas.”',
      '“Hablamos sobre esto en cuanto tu cuerpo se sienta más tranquilo.”'
    ],
    evita: [
      'Amenazar con castigos humillantes o que no vas a cumplir.',
      'Engancharte en discusiones lógicas de 20 minutos con un niño de 4 años.',
      'Retirar el límite porque el niño llora o insiste con intensidad.',
      'Justificarte con tono de súplica o culpa.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Límite con Pocas Palabras',
      description: 'Sostén un límite hoy usando tono neutro, validando su molestia pero sin cambiar el "No".',
      habitKey: 'pon_limites_firme_calmado'
    }
  },

  {
    id: 'ensena_que_hacer',
    number: 8,
    title: 'Enseña qué hacer',
    tagline: 'No le digas solamente qué debe dejar de hacer.',
    emoji: '🔄',
    color: '#10B981',
    bgSoft: 'bg-emerald-50',
    borderSoft: 'border-emerald-200',
    miraQuePasa: {
      dialogue: 'El adulto repite a cada minuto: “¡NO CORRAS! ¡NO GRITES! ¡NO TOQUES ESO!”',
      childReaction: 'El niño queda paralizado o hace exactamente lo que le dijeron que no hiciera.',
      coachInsight: 'El cerebro infantil procesa con dificultad las instrucciones en negativo. Decir "no corras" no le dice cómo debe moverse. Necesita una conducta positiva sustituta.'
    },
    elige: {
      prompt: 'Quieres que deje de tirar juguetes por el aire. ¿Qué instrucción enseña la conducta alternativa?',
      options: [
        {
          id: 'a',
          text: '“¡Deja de tirar todo al piso!”',
          isCorrect: false,
          feedback: 'Le recuerda el acto negativo sin darle un cauce constructivo a su energía.'
        },
        {
          id: 'b',
          text: '“Los carritos ruedan por la alfombra o los guardamos en su caja.”',
          isCorrect: true,
          feedback: '¡Exacto! Le dices exactamente cómo sí se usa el objeto y cuál es la alternativa segura.'
        },
        {
          id: 'c',
          text: '“Si vuelves a tirar eso te quito todos los juguetes.”',
          isCorrect: false,
          feedback: 'Es una amenaza que no le enseña la conducta adecuada.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Transforma el problema prohibido en la conducta incompatible deseada:',
      helper: 'Cambia un "NO hagas..." por un "Haz esto...":',
      options: [
        { id: '1', verb: 'De: “¡No grites!”', action: '→ A: “Usa tu voz de adentro / Dímelo en un susurro”.' },
        { id: '2', verb: 'De: “¡No corras!”', action: '→ A: “Camina a mi lado y agarra el carrito de compras”.' },
        { id: '3', verb: 'De: “¡No interrumpas!”', action: '→ A: “Pon tu mano en mi hombro para saber que quieres hablar”.' },
        { id: '4', verb: 'De: “¡No pegues!”', action: '→ A: “Aprieta este cojín fuerte si sientes rabia en las manos”.' }
      ]
    },
    puedesDecir: [
      '“Camina despacito a mi lado, por favor.”',
      '“Dímelo con voz tranquila para entender lo que necesitas.”',
      '“Si quieres tocar al gato, hazlo suavemente con la palma abierta.”'
    ],
    evita: [
      'Llenar el día de órdenes en negativo (“No saltes, no toques, no comas así”).',
      'Dar por hecho que el niño ya sabe cuál es la conducta correcta.',
      'Dar explicaciones teóricas abstractas.',
      'Repetir el "No" sin ofrecer una opción válida de juego o expresión.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Cambia 1 "NO" por un "Haz esto"',
      description: 'Cada vez que estés por decir "¡No hagas eso!", transfórmalo en la acción concreta que sí esperas ver.',
      habitKey: 'ensena_conducta_alternativa'
    }
  },

  {
    id: 'se_constante',
    number: 9,
    title: 'Sé constante',
    tagline: 'Lo que haces muchas veces enseña más que lo que haces una vez.',
    emoji: '🔁',
    color: '#0D9488',
    bgSoft: 'bg-teal-50',
    borderSoft: 'border-teal-200',
    miraQuePasa: {
      dialogue: 'Lunes: “Cero celular después de las 7”. Martes: “Bueno, 10 minutos más porque estoy cansado”. Miércoles: “Hoy no importa”. Jueves: “¡¿Por qué nunca me haces caso?!”',
      childReaction: 'El niño insiste, llora y ruega cada noche porque sabe que a veces el límite se rompe.',
      coachInsight: 'La inconsistencia genera persistencia en la queja (reforzamiento intermitente, como una máquina tragamonedas). Si el niño sabe que 1 de cada 4 veces cedes, insistirá siempre.'
    },
    elige: {
      prompt: 'Cuando tu hijo llora e insiste para romper un acuerdo, ¿qué promueve mayor seguridad a largo plazo?',
      options: [
        {
          id: 'a',
          text: 'Ceder solo los días que estés de buen humor para que no sufra.',
          isCorrect: false,
          feedback: 'Crea confusión e inseguridad sobre cuándo la regla es real y cuándo no.'
        },
        {
          id: 'b',
          text: 'Mantener la misma respuesta con serenidad tanto el lunes como el domingo.',
          isCorrect: true,
          feedback: '¡Exacto! La previsibilidad reduce la ansiedad infantil y elimina la necesidad de probar los límites a diario.'
        },
        {
          id: 'c',
          text: 'Cambiar la regla sobre la marcha según cuánto llore.',
          isCorrect: false,
          feedback: 'Le enseña que el volumen del llanto determina las reglas de la casa.'
        }
      ]
    },
    practica: {
      type: 'template_choice',
      prompt: 'Construye tu ancla de consistencia para los momentos de duda:',
      helper: 'Elige tu frase de recordatorio interno cuando sientas ganas de ceder por cansancio:',
      options: [
        { id: '1', verb: 'Consistencia:', action: '“Ceder hoy solo hará más difícil el berrinche de mañana. Mantengo la regla con amor”.' },
        { id: '2', verb: 'Previsibilidad:', action: '“El acuerdo de hoy es el mismo de ayer. Acompaño su queja sin romper el límite”.' },
        { id: '3', verb: 'Paciencia:', action: '“Elijo UNA sola regla fija esta semana y no la cambio sin importar mi cansancio”.' }
      ]
    },
    puedesDecir: [
      '“Sé que quieres seguir. La regla de hoy se mantiene igual que ayer.”',
      '“Entiendo tu molestia, pero ya habíamos acordado esto juntos.”',
      '“Mañana volveremos a tener tiempo para esto; ahora toca cenar.”'
    ],
    evita: [
      'Poner 20 reglas a la vez que no vas a tener energía de supervisar.',
      'Amenazar con algo que sabes que no vas a cumplir.',
      'Cambiar el límite dependiendo de si estás de buenas o de malas.',
      'Sentirte culpable por sostener un acuerdo que protege a tu hijo.'
    ],
    pruebaloHoy: {
      badge: 'Misión del día',
      title: 'Una Sola Regla Blindada',
      description: 'Elige UNA sola regla sencilla hoy (ej. lavarse dientes o apagar tele) y mantén la misma respuesta todo el día.',
      habitKey: 'se_constante_una_regla'
    }
  }
];

export const getSkillById = (id) => {
  return learnSkills.find(skill => skill.id === id) || learnSkills[0];
};
