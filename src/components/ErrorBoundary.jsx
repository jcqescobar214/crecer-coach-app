import React from 'react';
import { RotateCcw, AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturó un error inesperado:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      sessionStorage.clear();
    } catch (e) {
      // Ignore
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col justify-between p-5 text-slate-800 animate-fadeIn">
          {/* Cabecera de Calma */}
          <div className="flex flex-col items-center text-center mt-8 gap-4">
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center border-2 border-rose-200 shadow-sm">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-600">
                Respaldo de Emergencia
              </span>
              <h1 className="text-xl font-black text-[#0F2942]">
                Algo no salió como esperábamos
              </h1>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-xs leading-relaxed">
              No te preocupes: tus registros de práctica y tu proceso guardado están a salvo.
            </p>
          </div>

          {/* Bloque de Acceso Telefónico en Caso de Crisis */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3 my-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-black uppercase text-[#0F2942] tracking-tight">
                Líneas de ayuda inmediata
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Si estás viviendo un momento de alta alteración o riesgo con tu hijo, puedes llamar directamente:
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href="tel:106"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#0F2942]">Línea 106</span>
                  <span className="text-[10px] text-slate-500">Salud mental, escucha y apoyo emocional</span>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Llamar
                </span>
              </a>

              <a
                href="tel:141"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#0F2942]">Línea 141 (ICBF)</span>
                  <span className="text-[10px] text-slate-500">Protección integral a la niñez y familias</span>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Llamar
                </span>
              </a>
            </div>
          </div>

          {/* Botones de Recuperación */}
          <div className="flex flex-col gap-2.5 mb-6">
            <button
              onClick={this.handleReload}
              className="w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar de nuevo</span>
            </button>

            <button
              onClick={this.handleReset}
              className="w-full text-slate-600 hover:text-slate-900 font-bold text-xs py-2.5 text-center transition-colors cursor-pointer"
            >
              Volver a la pantalla principal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
