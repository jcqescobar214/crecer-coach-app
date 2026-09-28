import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

const FeedbackFooter = () => {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col items-center justify-center gap-3 w-full text-center mt-2">
      {feedback ? (
        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs py-1">
          <CheckCircle2 className="w-4 h-4" />
          <span>¡Gracias por tus comentarios!</span>
        </div>
      ) : (
        <>
          <span className="text-xs font-semibold text-slate-600">
            ¿Te fue útil esta orientación?
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFeedback('up')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200/80 hover:border-emerald-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Sí, gracias</span>
            </button>
            <button
              onClick={() => setFeedback('down')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200/80 hover:border-rose-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>No mucho</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackFooter;
