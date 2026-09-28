import React from 'react';

const themeStyles = {
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-800',
    highlightBg: 'bg-emerald-50/60 border-emerald-200/70',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    highlightBg: 'bg-blue-50/70 border-blue-200/80',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    iconColor: 'text-rose-500',
    titleColor: 'text-rose-800',
    highlightBg: 'bg-rose-50/50 border-rose-200/70',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-800',
    highlightBg: 'bg-amber-50/60 border-amber-200/70',
  }
};

const GuidanceBlock = ({ title, content, icon: Icon, colorTheme = 'emerald', isList = false, isQuote = false }) => {
  const theme = themeStyles[colorTheme] || themeStyles.emerald;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3 w-full">
      {/* Encabezado del bloque con icono de color temático */}
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme.bg} ${theme.border} border`}>
          {Icon && <Icon className={`w-4 h-4 ${theme.iconColor}`} strokeWidth={2.5} />}
        </div>
        <h4 className={`text-sm font-bold ${theme.titleColor}`}>
          {title}
        </h4>
      </div>

      {/* Contenido del bloque */}
      <div className="text-sm text-slate-700 leading-relaxed">
        {isList && Array.isArray(content) ? (
          <ul className="flex flex-col gap-2 pt-0.5">
            {content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-600">
                <span className="text-rose-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : isQuote ? (
          <div className={`p-3.5 rounded-xl border ${theme.highlightBg} italic text-slate-800 font-medium leading-relaxed`}>
            "{content}"
          </div>
        ) : (
          <p className="text-slate-600">{content}</p>
        )}
      </div>
    </div>
  );
};

export default GuidanceBlock;
