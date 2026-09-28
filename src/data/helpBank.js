// Banco profesional de intervenciones para cuidadores de niños de 3 a 6 años

export const helpBank = {
  rabieta: {
    id: 'rabieta',
    number: 1,
    title: 'Está haciendo una rabieta',
    icon: '😫',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Mantén una presencia tranquila y utiliza pocas palabras. Comprueba primero que el niño y quienes están alrededor estén seguros. Mantén el límite que desencadenó la rabieta, siempre que este sea razonable. Reduce las preguntas, explicaciones y negociaciones hasta que disminuya la intensidad emocional.',
    puedesDecir: '“Veo que estás muy enojado. Estoy aquí contigo.” / “Sé que querías seguir. La respuesta sigue siendo no. Te acompaño mientras te calmas.”',
    evita: [
      'Gritar',
      'Amenazar',
      'Dar explicaciones extensas',
      'Cambiar el límite únicamente para detener el llanto',
      'Preguntar repetidamente si ya se va a calmar',
      'Utilizar castigos durante el momento de máxima activación'
    ],
    cuandoSeCalme: 'Reconecta primero: “Fue difícil para ti cuando tuvimos que parar”. Después enseña una alternativa: “La próxima vez puedes decir: estoy enojado o quiero cinco minutos más”. Si la situación es recurrente, trabaja posteriormente anticipación y transiciones.',
    sigueIgual: 'Verifica primero si hay riesgo de que el niño se lastime. Si no hay riesgo, mantén la intervención sencilla, reduce las palabras al mínimo, conserva el límite sin ceder y da tiempo suficiente para disminuir la intensidad emocional.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño o alguien más se haga daño?',
      withRisk: 'Prioridad Absoluta de Seguridad: Separa al niño de objetos peligrosos o de otros niños con firmeza neutra. Detén explicaciones y mantén contención física segura.',
      withoutRisk: 'Estrategia de Desescalamiento: Reduce estímulos del entorno (ruido, luz, personas). Guarda silencio o usa tono grave y pausado. Prioriza recuperar la calma antes de resolver el problema.'
    }
  },

  desobediencia: {
    id: 'desobediencia',
    number: 2,
    title: 'No sigue una instrucción',
    icon: '🙉',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Acércate al niño antes de repetir la indicación. Busca su atención visual poniéndote a su altura y utiliza su nombre. Da una sola instrucción clara y específica describiendo qué debe hacer. Espera unos segundos antes de repetir.',
    puedesDecir: '“Sofía, guarda los bloques dentro de la caja.” / “Gracias por guardar los bloques cuando te lo pedí.”',
    evita: [
      'Dar instrucciones desde otra habitación',
      'Repetir la misma instrucción continuamente a distancia',
      'Dar varias órdenes simultáneamente',
      'Formular una instrucción como pregunta si no hay opción',
      'Utilizar frases generales como "pórtate bien"',
      'Explicar demasiado antes de que el niño actúe'
    ],
    cuandoSeCalme: 'Revisa si la instrucción fue breve, específica, adecuada para su edad y posible de realizar en ese momento. Practica el principio: una instrucción → esperar → reconocer el cumplimiento.',
    sigueIgual: 'No repitas la orden verbalmente. Acércate físicamente, conéctate con su mirada y dale asistencia presencial guiando suavemente sus manos para iniciar la tarea.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño o alguien más se haga daño?',
      withRisk: 'Mantén la seguridad física inmediata. Retira objetos peligrosos y acompaña al niño a un espacio libre de riesgos.',
      withoutRisk: 'Pausa las demandas por un minuto. Deja que se reduzca la resistencia activa antes de reorientar de forma neutra y directa.'
    }
  },

  respuesta_mala: {
    id: 'respuesta_mala',
    number: 10,
    title: 'Está gritando o contestando mal',
    icon: '😠',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Disminuye deliberadamente tu propio volumen de voz. Mantén una frase breve y clara sin engancharte en discusiones.',
    puedesDecir: '“Quiero escucharte. Háblame con una voz más tranquila.” / “Esperamos un momento y hablamos cuando podamos escucharnos.”',
    evita: [
      'Gritar más fuerte para imponerte',
      'Repetir instrucciones continuamente',
      'Amenazar o burlarte de su todo de voz',
      'Intentar dar discursos mientras ambos están alterados'
    ],
    cuandoSeCalme: 'Enséñale otra forma de comunicar la misma necesidad: “En lugar de gritar puedes decir: estoy enojado o necesito ayuda”. Practíquenlo cuando esté tranquilo.',
    sigueIgual: 'Baja aún más tu tono de voz y da un paso atrás. Di: "Estoy aquí para cuando quieras hablar tranquilos", y espera en silencio.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño o alguien más se haga daño?',
      withRisk: 'Si empieza a tirar objetos o agredir, intervén físicamente para mantener la seguridad sin gritar.',
      withoutRisk: 'Aplica reducción de estímulos. Aléjate un metro y respira hondo sin hacer contacto verbal hasta que baje la agitación.'
    }
  },

  pantallas: {
    id: 'pantallas',
    number: 4,
    title: 'No quiere dejar el celular o la tablet',
    icon: '📱',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Mantén el límite previamente establecido. Utiliza pocas palabras y evita comenzar una negociación nueva.',
    puedesDecir: '“Sé que quieres seguir viendo la tablet. El tiempo terminó.” / “Puedes apagarla tú o puedo ayudarte.”',
    evita: [
      'Dar "cinco minutos más" repetidamente',
      'Entregar nuevamente el dispositivo para detener una rabieta',
      'Amenazar con quitarlo durante períodos excesivos',
      'Explicar demasiado mientras el niño está alterado',
      'Utilizar la pantalla inmediatamente como forma de regular cualquier emoción'
    ],
    cuandoSeCalme: 'Prepara mejor la siguiente transición utilizando avisos: faltan diez minutos, faltan cinco minutos y terminó el tiempo. Puedes utilizar temporizadores visuales para hacer el final más predecible.',
    sigueIgual: 'Toma la iniciativa firme y serena: di "Te ayudo a apagarlo" y retira el dispositivo sin enojo ni discursos.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño o alguien más se haga daño?',
      withRisk: 'Si intenta golpear al quitar la pantalla, asegúrate de colocar el dispositivo fuera de alcance y mantén tus manos en contención segura.',
      withoutRisk: 'Guarda la tablet fuera de vista y ofrece una actividad de transición física (ej. tomar agua, correr a la ventana).'
    }
  },

  tarea: {
    id: 'tarea',
    number: 17,
    title: 'No quiere recoger o hacer su rutina',
    icon: '📚',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Divide la tarea en pasos muy pequeños. Da una instrucción concreta a la vez y participa inicialmente a su lado si es necesario.',
    puedesDecir: '“Vamos a guardar los carros primero.” / “Tú guardas los bloques y yo recojo los libros.”',
    evita: [
      'Decir "¡recoge todo este desastre!"',
      'Hacerlo completamente por él cada vez',
      'Amenazar con botar todos sus juguetes',
      'Dar una instrucción demasiado amplia u abrumadora'
    ],
    cuandoSeCalme: 'Convierte recoger en una rutina predecible utilizando una canción corta, cajas identificadas con dibujos o temporizador. Refuerza específicamente: "Guardaste todos los bloques en su lugar".',
    sigueIgual: 'Reduce aún más el paso: "Solo guardamos este carro azul juntos", y acompaña la mano del niño guiándolo suavemente.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño o alguien más se haga daño?',
      withRisk: 'Si tira cajas o juguetes con violencia, retira los elementos contundentes para proteger su integridad.',
      withoutRisk: 'Detén la exigencia momentáneamente: "Hacemos una pausa de 2 minutos y regresamos juntos".'
    }
  },

  hermanos: {
    id: 'hermanos',
    number: 13,
    title: 'Pelea con su hermano/a',
    icon: '🤼',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Si hay golpes o agresiones, separa primero de forma física y neutral. Si no existe peligro inmediato, evita decidir apresuradamente quién tiene la culpa.',
    puedesDecir: '“No voy a dejar que se lastimen.” / “Primero nos calmamos. Después vemos qué pasó.”',
    evita: [
      'Preguntar inmediatamente "¿quién empezó?"',
      'Etiquetar a uno como "el problemático"',
      'Compararlos entre sí',
      'Obligar inmediatamente a compartir',
      'Exigir una disculpa mientras están alterados'
    ],
    cuandoSeCalme: 'Escucha brevemente a cada uno por separado. Pregunta qué quería y qué podría hacer la próxima vez. Trabaja una solución sencilla: turnarse, devolver, reparar o pedir ayuda.',
    sigueIgual: 'Mantén la separación física en habitaciones o rincones distintos sin regañar ni juzgar hasta que baje la frecuencia cardíaca de ambos.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que se lastimen físicamente?',
      withRisk: 'Colócate físicamente en medio de ambos haciendo barrera de protección. Llévalos a espacios separados.',
      withoutRisk: 'Permanece en silencio junto a uno de ellos ofreciendo contención en calma sin tomar partido.'
    }
  },

  dormir: {
    id: 'dormir',
    number: 7,
    title: 'No quiere ir a dormir',
    icon: '🌙',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Mantén la rutina nocturna de manera tranquila y altamente predecible. Reduce conversaciones estimulantes, juegos y negociaciones.',
    puedesDecir: '“Sé que quieres seguir despierto. Ahora es hora de dormir.” / “¿Quieres un cuento o una canción?”',
    evita: [
      'Incorporar nuevas actividades o juegos en la cama',
      'Permitir pantallas para que se duerma',
      'Cambiar repetidamente la hora de acostarse',
      'Negociar "otros cinco minutos" muchas veces',
      'Amenazar con personajes o castigos'
    ],
    cuandoSeCalme: 'Mantén una secuencia idéntica cada noche: baño → pijama → cepillado → cuento/canción → cama. Si expresa miedo, valida y trabaja los miedos durante el día.',
    sigueIgual: 'Mantén la luz tenue, siéntate en una silla junto a la cama en silencio sin entablar conversación nueva.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de que el niño se haga daño al saltar o salir descontrolado?',
      withRisk: 'Asegura bordes de cama y muebles cercanos. Acompaña de la mano de regreso a la cama con calidez neutral.',
      withoutRisk: 'Evita encender luces intensas ni salir del cuarto molestos. Mantén el ambiente en penumbra y silencio.'
    }
  },

  acuerdos: {
    id: 'acuerdos',
    number: 15,
    title: 'Quiere algo y ya le dije que no',
    icon: '🤝',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Mantén el límite sin continuar agregando explicaciones. Reconoce la emoción sin ceder en la regla.',
    puedesDecir: '“Sé que lo quieres mucho. Mi respuesta sigue siendo no.” / “Puedes estar triste o enojado. La respuesta no cambia.”',
    evita: [
      'Dar muchas razones diferentes cada vez que insiste',
      'Cambiar la decisión porque insiste o llora',
      'Amenazar',
      'Ridiculizar su deseo',
      'Decir "porque yo mando"'
    ],
    cuandoSeCalme: 'Si existe una alternativa apropiada, ofrécela cuando esté receptivo. El objetivo es ayudarlo a aprender que puede tolerar un límite aunque no le guste.',
    sigueIgual: 'No repitas el "no". Asiente con empatía y guarda silencio manteniendo la postura corporal tranquila y firme.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de conducta autolesiva o agresiva?',
      withRisk: 'Protege su espacio físico y retira objetos al alcance que puedan ser arrojados.',
      withoutRisk: 'Acompaña el llanto sin discursos. Dile una sola vez: "Aquí estoy si quieres un abrazo".'
    }
  },

  frustrado: {
    id: 'frustrado',
    number: 8,
    title: 'Está muy frustrado',
    icon: '😖',
    childAge: '3 a 6 años',
    hazEstoAhora: 'No intentes eliminar inmediatamente la frustración. Ayúdalo a permanecer seguro mientras experimenta la emoción. Reduce la exigencia de la tarea si está sobrepasado, pero evita hacerla completamente por él.',
    puedesDecir: '“Eso está siendo difícil.” / “Veo que estás frustrado. Podemos parar un momento y volver a intentar.”',
    evita: [
      'Decir "eso es muy fácil" o "no es para tanto"',
      'Resolver inmediatamente todo por él',
      'Compararlo con otros niños',
      'Exigir que continúe mientras está completamente desregulado'
    ],
    cuandoSeCalme: 'Enséñale tres alternativas: intentar otra vez, pedir ayuda o descansar un momento. Refuerza el esfuerzo: “Seguiste intentando aunque era difícil”.',
    sigueIgual: 'Propón una pausa de descompresión: "Dejamos esto a un lado 5 minutos para respirar y luego volvemos".',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de romper cosas o autolesionarse?',
      withRisk: 'Aleja el material o tarea que causa la frustración para evitar que se dañe o dañe a otros.',
      withoutRisk: 'Ofrécele una descarga sensorial segura (ej. apretar una almohada, soplar burbujas imaginarias).'
    }
  },

  paciencia: {
    id: 'paciencia',
    number: 25,
    title: 'Estoy perdiendo la paciencia',
    icon: '🌋',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Antes de continuar corrigiendo, evalúa tu propio nivel de activación. Si estás muy alterado, comprueba que el niño esté seguro, reduce la interacción, baja el tono de voz y toma unos segundos para respirar antes de responder.',
    puedesDecir: '“Estoy enojado y necesito calmarme un momento. Después seguimos.”',
    evita: [
      'Gritar o insultar',
      'Amenazar impulsivamente',
      'Golpear objetos o reaccionar con fuerza física',
      'Decir "tú me haces poner así"'
    ],
    cuandoSeCalme: 'Pregúntate: ¿qué hizo mi hijo?, ¿qué sentí yo?, ¿qué quiero que aprenda?, ¿qué puedo hacer la próxima vez? Si gritaste, repara: "Antes te grité y no estuvo bien. Estaba muy enojado, pero quiero hablarte con calma".',
    sigueIgual: 'Activa la pausa del cuidador: tómate 3 respiraciones profundas contando hasta 4 y da un paso atrás físicamente.',
    estaEmpeorando: {
      riskQuestion: '¿Sientes riesgo de reaccionar de forma agresiva o desbordada?',
      withRisk: 'Asegura al niño en un lugar a salvo, sal del espacio durante 2 minutos y busca agua fría o ventilación para bajar tu ritmo cardiaco.',
      withoutRisk: 'Colócate las manos en el pecho, baja los hombros y habla en un susurro neutro.'
    }
  },

  adolescente: {
    id: 'adolescente',
    number: 22,
    title: 'Hace algo prohibido repetidamente',
    icon: '🙄',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Acércate y detén la conducta de forma clara y presencial. Recuerda brevemente la regla y dirige hacia una conducta alternativa permitida.',
    puedesDecir: '“Los juguetes no se lanzan. Puedes jugar con ellos en el suelo.” / “No dibujamos en la pared. El papel está aquí.”',
    evita: [
      'Repetir "no" desde lejos',
      'Gritar',
      'Etiquetarlo como "desobediente"',
      'Dar explicaciones largas',
      'Castigar sin enseñarle qué debe hacer en su lugar'
    ],
    cuandoSeCalme: 'Practica la conducta alternativa en momento neutro. La regla siempre debe responder: qué no puede hacer + qué sí puede hacer en su lugar.',
    sigueIgual: 'Redirige físicamente retirando el objeto o acompañando al niño a la zona permitida sin enojo.',
    estaEmpeorando: {
      riskQuestion: '¿Existe riesgo de daño a la propiedad o a personas?',
      withRisk: 'Guarda bajo llave o fuera de alcance el objeto prohibido de forma definitiva por hoy.',
      withoutRisk: 'Ofrece una alternativa sensorial equivalente (ej. si quiere rayar, dale tizas en el patio).'
    }
  },

  otro: {
    id: 'otro',
    number: 28,
    title: 'No sé si corregir o calmar primero',
    icon: '•••',
    childAge: '3 a 6 años',
    hazEstoAhora: 'Observa el nivel de activación. Si el niño está intensamente alterado, regula primero y enseña después. Si puede escucharte y responder, puedes establecer el límite en ese momento.',
    puedesDecir: '“Primero vamos a calmarnos.” / “Ahora podemos hablar de lo que pasó.”',
    evita: [
      'Intentar dar una lección mientras está desbordado',
      'Confundir acompañar con permitir cualquier conducta',
      'Eliminar todos los límites porque está llorando'
    ],
    cuandoSeCalme: 'Aplica la secuencia maestra de crianza: Conectar → Regular → Establecer el límite → Enseñar alternativa.',
    sigueIgual: 'Prioriza 100% la regulación emocional sobre la enseñanza en este instante. Permanece como ancla de calma.',
    estaEmpeorando: {
      riskQuestion: '¿Existe desbordamiento emocional descontrolado con riesgo físico?',
      withRisk: 'Protege el cuerpo del niño y el tuyo de lesiones usando contención suave y neutra.',
      withoutRisk: 'Baja las luces y habla con volumen mínimo diciendo: "Te acompaño hasta que pase el temblor".'
    }
  }
};

// Función auxiliar para obtener intervención por ID o por defecto
export const getHelpIntervention = (situationId) => {
  if (!situationId) return helpBank.rabieta;
  const key = typeof situationId === 'object' ? situationId.id : situationId;
  return helpBank[key] || helpBank.rabieta;
};
