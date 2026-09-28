import React from 'react';
import SituationCard from './SituationCard';

const situations = [
  { id: 'rabieta', icon: '😫', label: 'Rabieta' },
  { id: 'desobediencia', icon: '🙉', label: 'No me hace caso' },
  { id: 'respuesta_mala', icon: '😠', label: 'Me contesta mal' },
  { id: 'pantallas', icon: '📱', label: 'No quiere dejar el celular' },
  { id: 'tarea', icon: '📚', label: 'No quiere hacer la tarea' },
  { id: 'hermanos', icon: '🤼', label: 'Pelea con hermanos' },
  { id: 'dormir', icon: '🌙', label: 'No quiere dormir' },
  { id: 'acuerdos', icon: '🤝', label: 'No cumple acuerdos' },
  { id: 'frustrado', icon: '😖', label: 'Está frustrado' },
  { id: 'paciencia', icon: '🌋', label: 'Estoy perdiendo la paciencia' },
  { id: 'adolescente', icon: '🙄', label: 'Adolescente desafiante' },
  { id: 'otro', icon: '•••', label: 'Otro' },
];

const SituationGrid = ({ onSelectSituation }) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {situations.map((item) => (
        <SituationCard
          key={item.id}
          icon={item.icon}
          label={item.label}
          onClick={() => onSelectSituation?.(item)}
        />
      ))}
    </div>
  );
};

export default SituationGrid;
