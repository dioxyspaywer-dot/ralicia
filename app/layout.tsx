'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<any>(null);

  const examples = [
    "Vidéo motivante 45s sur la réussite",
    "Humour vie étudiante en 30s",
    "Pub produit tech voix féminine dynamique"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setScript(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Ralicia
        </h1>
        <p className="text-zinc-400">Décrivez votre vidéo, l'IA fait le reste</p>
      </header>

      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Crée une vidéo humoristique sur..."
          className="w-full h-32 p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none transition-all"
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all active:scale-[0.98]"
        >
          {loading ? '🤖 Analyse en cours...' : '✨ Générer le scénario'}
        </button>

        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {script && (
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold text-indigo-400">Scénario généré</h2>
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono bg-zinc-950 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(script, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
            }
