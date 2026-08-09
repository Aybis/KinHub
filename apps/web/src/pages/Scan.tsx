import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AIExtraction } from '@maya/shared';

type Step = 'upload' | 'preview';

export default function Scan() {
  const [step, setStep] = useState<Step>('upload');
  const [extraction, setExtraction] = useState<AIExtraction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editable, setEditable] = useState<{
    vendor: string;
    total: number;
    category: string;
  } | null>(null);

  async function handleFile(file: File) {
    setLoading(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));
      const mime = file.type;
      const res = await fetch('/api/v1/scan/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64: base64, mimeType: mime, defaultCurrency: 'IDR' }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Extraction failed');
      }
      const data: AIExtraction = await res.json();
      setExtraction(data);
      setEditable({ vendor: data.vendor, total: data.total, category: data.category ?? '' });
      setStep('preview');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  async function confirm() {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/scan/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendor: editable?.vendor,
          total: editable?.total,
          category: editable?.category,
          lineItems: extraction?.lineItems ?? [],
        }),
      });
      if (!res.ok) throw new Error('Confirm failed');
      const result = await res.json();
      alert(
        `Saved! Spend: ${result.cascade.spend ? '✅' : '❌'} · Have: ${
          result.cascade.have ? '✅' : '❌'
        } · Leak: ${result.cascade.leak ? '✅' : 'wired next phase'}`,
      );
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Confirm failed');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep('upload');
    setExtraction(null);
    setEditable(null);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-900">Scan Invoice</h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload → Scan → Preview → Review → Confirm
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center"
          >
            <input
              type="file"
              accept="image/*,.pdf"
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {loading && <p className="mt-4 text-slate-400">AI is scanning…</p>}
            {error && <p className="mt-4 text-rose-500">{error}</p>}
          </motion.div>
        )}

        {step === 'preview' && extraction && editable && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-400">
              AI Extraction — Review & Edit
            </div>

            <label className="block text-sm text-slate-600">Vendor</label>
            <input
              value={editable.vendor}
              onChange={(e) => setEditable({ ...editable, vendor: e.target.value })}
              className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2"
            />

            <label className="block text-sm text-slate-600">Total</label>
            <input
              type="number"
              value={editable.total}
              onChange={(e) =>
                setEditable({ ...editable, total: Number(e.target.value) })
              }
              className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2"
            />

            <label className="block text-sm text-slate-600">Category</label>
            <input
              value={editable.category}
              onChange={(e) =>
                setEditable({ ...editable, category: e.target.value })
              }
              className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2"
            />

            {extraction.lineItems.length > 0 && (
              <div className="mb-4 rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-medium text-slate-500">Line items</div>
                {extraction.lineItems.map((li, i) => (
                  <div key={i} className="mt-1 flex justify-between text-sm">
                    <span className="text-slate-700">{li.description}</span>
                    <span className={li.type === 'refund' ? 'text-emerald-600' : 'text-slate-700'}>
                      {li.type === 'refund' ? '+' : ''} {li.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={reset}
                disabled={loading}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirm}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving…' : 'Confirm'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}