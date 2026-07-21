import React, { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Loader2, Apple, Check, AlertTriangle, Plus } from "lucide-react";
import { motion } from "motion/react";
import { playScanSound, playSuccessChime, playWarningSound } from "../utils/audio";

interface ScanResult {
  name: string;
  scientificName: string;
  category: string;
  family?: string;
  origin?: string;
  description: string;
  calories: number;
  water?: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  glycemicIndex?: number;
  benefits: string;
  contraindications: string;
}

interface AIScannerProps {
  onAddScannedToDiary: (food: { name: string; calories: number; protein: number; carbs: number; fat: number }) => void;
}

export default function AIScanner({ onAddScannedToDiary }: AIScannerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Str = (reader.result as string).split(",")[1];
        resolve(base64Str);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione apenas arquivos de imagem.");
      playWarningSound();
      return;
    }

    setError(null);
    setResult(null);
    setAdded(false);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setLoading(true);
    playScanSound();

    try {
      const base64Data = await fileToBase64(file);
      const mimeType = file.type;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com o scanner de IA.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      playSuccessChime();
    } catch (err: any) {
      console.error(err);
      setError(
        "Não foi possível identificar o alimento. Certifique-se de que a imagem esteja nítida e que sua chave do Gemini esteja ativa nas configurações."
      );
      playWarningSound();
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddToDiaryClick = () => {
    if (!result) return;
    onAddScannedToDiary({
      foodName: result.name,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fats,
    } as any);
    setAdded(true);
    playSuccessChime();
  };

  const resetScanner = () => {
    setImagePreview(null);
    setResult(null);
    setError(null);
    setAdded(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 bg-emerald-600/50 rounded-full text-xs font-semibold tracking-wide text-orange-300 flex items-center gap-1.5 w-fit mb-3">
            <Sparkles size={12} /> SCANNER INTELIGENTE
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Identificar Alimento por Foto</h2>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl">
            Tire uma foto na hora ou carregue um arquivo. A inteligência artificial identificará o alimento, sua categoria e calculará os macronutrientes correspondentes.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={triggerFileInput}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            id="camera-scan-btn"
          >
            <Camera size={18} />
            Tirar Foto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Pane */}
        <div className={`${result ? "lg:col-span-4" : "lg:col-span-12"} transition-all`}>
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={imagePreview ? undefined : triggerFileInput}
            className={`relative min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all ${
              imagePreview ? "cursor-default border-gray-200" : "cursor-pointer border-emerald-300 hover:border-emerald-500 bg-emerald-50/10 hover:bg-emerald-50/20"
            } ${dragActive ? "border-emerald-600 bg-emerald-50/40" : ""}`}
            id="scanner-dropzone"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <div className="w-full h-full flex flex-col items-center">
                <img
                  src={imagePreview}
                  alt="Pré-visualização"
                  className="max-h-[220px] rounded-xl object-cover shadow-md border border-gray-100 mb-4"
                  referrerPolicy="no-referrer"
                />
                {!loading && (
                  <div className="flex gap-2">
                    <button
                      onClick={triggerFileInput}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Mudar Imagem
                    </button>
                    <button
                      onClick={resetScanner}
                      className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                  <Upload size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Arraste uma foto aqui</p>
                  <p className="text-xs text-gray-500 mt-1">ou clique para procurar no seu dispositivo</p>
                </div>
                <p className="text-[10px] text-gray-400">Formatos aceitos: JPG, PNG, WEBP</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-white/80 rounded-2xl flex flex-col items-center justify-center space-y-3 z-10">
                <Loader2 size={36} className="text-emerald-600 animate-spin" />
                <p className="font-semibold text-emerald-800 text-sm">IA Analisando Imagem...</p>
                <p className="text-xs text-gray-500 animate-pulse">Consultando base de dados científicos de nutrição</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs flex items-start gap-2.5">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Erro de Conectividade</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Pane */}
        {result && (
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
              id="scanner-results-card"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider">
                    {result.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {result.name}
                  </h3>
                  {result.scientificName && (
                    <p className="text-xs text-gray-500 italic font-medium">
                      Scientific: {result.scientificName}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleAddToDiaryClick}
                  disabled={added}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    added
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:scale-[0.98]"
                  }`}
                  id="scanner-add-diary-btn"
                >
                  {added ? (
                    <>
                      <Check size={16} /> Adicionado
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Adicionar ao Diário (100g)
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                  <Apple size={16} className="text-emerald-600" />
                  Descrição do Alimento
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Nutrients Macro Bento */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-gray-100/80 p-3.5 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Calorias</span>
                  <p className="text-xl font-bold text-gray-900">{result.calories} <span className="text-xs font-normal">kcal</span></p>
                </div>
                <div className="bg-sky-50/50 border border-sky-100/50 p-3.5 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">Carboidratos</span>
                  <p className="text-xl font-bold text-sky-900">{result.carbs}g</p>
                </div>
                <div className="bg-red-50/50 border border-red-100/50 p-3.5 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">Proteínas</span>
                  <p className="text-xl font-bold text-red-900">{result.protein}g</p>
                </div>
                <div className="bg-amber-50/50 border border-amber-100/50 p-3.5 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Gorduras</span>
                  <p className="text-xl font-bold text-amber-900">{result.fats}g</p>
                </div>
              </div>

              {/* Specific info rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-t border-b border-gray-100 py-4">
                {result.glycemicIndex !== undefined && (
                  <div className="flex justify-between py-1 border-b border-gray-50 md:border-none">
                    <span className="text-gray-500 font-medium">Índice Glicémico:</span>
                    <span className="font-bold text-gray-800">{result.glycemicIndex} ({result.glycemicIndex < 55 ? "Baixo" : result.glycemicIndex < 70 ? "Médio" : "Alto"})</span>
                  </div>
                )}
                {result.origin && (
                  <div className="flex justify-between py-1 border-b border-gray-50 md:border-none">
                    <span className="text-gray-500 font-medium">Origem do Alimento:</span>
                    <span className="font-bold text-gray-800">{result.origin}</span>
                  </div>
                )}
                {result.family && (
                  <div className="flex justify-between py-1 border-b border-gray-50 md:border-none">
                    <span className="text-gray-500 font-medium">Família:</span>
                    <span className="font-bold text-gray-800">{result.family}</span>
                  </div>
                )}
              </div>

              {/* Health and Risks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/30 border border-emerald-100/50 p-4 rounded-xl space-y-2">
                  <h5 className="font-bold text-emerald-800 text-xs uppercase tracking-wider">Benefícios Principais</h5>
                  <p className="text-sm text-emerald-900 leading-relaxed">{result.benefits}</p>
                </div>
                <div className="bg-orange-50/30 border border-orange-100/50 p-4 rounded-xl space-y-2">
                  <h5 className="font-bold text-orange-800 text-xs uppercase tracking-wider">Contraindicações / Atenção</h5>
                  <p className="text-sm text-orange-950 leading-relaxed">{result.contraindications}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
