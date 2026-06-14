import React, { useState, useEffect } from 'react';
import { Copy, AlertCircle, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { FormConfig } from '../types';

const FORM_PRESETS = {
  sticker: {
    type: "form" as const,
    title: "Create Custom Sticker",
    fields: [
      { label: "Sticker Name", type: "text" as const, placeholder: "e.g., scale-king", value: "Nikunj" },
      { label: "Hype Level", type: "range" as const, min: 1, max: 10, value: 8 },
      { label: "Glow Accent", type: "select" as const, options: ["Neon Mint", "Hot Pink", "Sunbeam Yellow"], value: "Neon Mint" },
      { label: "Glitch Effect", type: "checkbox" as const, value: true }
    ]
  },
  bugReport: {
    type: "form" as const,
    title: "Nuke a Bug Instance",
    fields: [
      { label: "Module Name", type: "text" as const, placeholder: "e.g., k8s-mesh-router", value: "k8s-mesh-router" },
      { label: "Severity Index", type: "range" as const, min: 0, max: 100, value: 42 },
      { label: "Reproducibility", type: "select" as const, options: ["Always", "Sometimes", "Only on Mondays"], value: "Always" },
      { label: "Description", type: "textarea" as const, placeholder: "What did the logs report?", value: "The telemetry pipeline dropped 5 packets during intensive load testing." }
    ]
  },
  coffeeTracker: {
    type: "form" as const,
    title: "Fuel Ledger",
    fields: [
      { label: "Bean Source", type: "text" as const, placeholder: "Ethiopian Yirgacheffe", value: "Ethiopian Roast" },
      { label: "Shots Count", type: "number" as const, min: 1, max: 8, value: 3 },
      { label: "Method", type: "select" as const, options: ["Aeropress", "V60 Pour", "Espresso", "Cold Brew"], value: "Aeropress" },
      { label: "Heart Rate BPM", type: "range" as const, min: 60, max: 180, value: 120 }
    ]
  }
};

export default function FormBuilder() {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(FORM_PRESETS.sticker, null, 2));
  const [parsedForm, setParsedForm] = useState<FormConfig>(FORM_PRESETS.sticker);
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // Real-time input values on the live rendered form
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  
  // Custom submit sticker state
  const [submission, setSubmission] = useState<Record<string, any> | null>(null);
  const [copied, setCopied] = useState(false);

  // Synchronize initial form values when form structure parses successfully
  useEffect(() => {
    const initialVals: Record<string, any> = {};
    parsedForm.fields.forEach(field => {
      initialVals[field.label] = field.value !== undefined ? field.value : (field.type === 'checkbox' ? false : '');
    });
    setFormValues(initialVals);
  }, [parsedForm]);

  // Handle live JSON updates and validation
  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') {
        if (parsed.type !== 'form') {
          setJsonError("JSON root must contain '\"type\": \"form\"'");
          return;
        }
        if (!Array.isArray(parsed.fields)) {
          setJsonError("JSON root must contain a 'fields' array");
          return;
        }
        
        // Basic schema verification
        for (const field of parsed.fields) {
          if (!field.label) {
            setJsonError("Every field object must contain a 'label' string");
            return;
          }
          if (!field.type) {
            setJsonError("Every field object must contain a 'type' specifier");
            return;
          }
        }

        setParsedForm(parsed);
        setJsonError(null);
      } else {
        setJsonError("Input is not a premium valid object");
      }
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON structure");
    }
  };

  const handleFieldChange = (label: string, val: any) => {
    setFormValues(prev => ({
      ...prev,
      [label]: val
    }));
  };

  const loadPreset = (presetName: keyof typeof FORM_PRESETS) => {
    const config = FORM_PRESETS[presetName];
    const text = JSON.stringify(config, null, 2);
    setJsonText(text);
    setParsedForm(config);
    setJsonError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmission(formValues);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="form-builder-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* JSON Editor Panel */}
      <div id="json-editor-panel" className="lg:col-span-6 bg-[#ffdaf4] border-solid-neo p-6 md:p-8 neo-shadow flex flex-col justify-between">
        <div className="w-full">
          {/* Panel Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-sm uppercase bg-white border-2 border-black px-2 py-1 flex items-center gap-1.5 font-bold">
                <FileText className="w-4 h-4 text-purple-700" />
                JSON Editor
              </span>
              {jsonError ? (
                <span className="bg-[#ba1a1a] text-white px-2 py-1 font-mono text-xs border-2 border-black flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> INVALID
                </span>
              ) : (
                <span className="bg-[#8ff6d0] text-black px-2 py-1 font-mono text-xs border-2 border-black flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> SYNTAX OK
                </span>
              )}
            </div>

            {/* Presets Toggle buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => loadPreset('sticker')}
                className="bg-white hover:bg-yellow-100 text-xs font-mono px-2 py-1 border-2 border-black cursor-pointer font-semibold transition"
              >
                Sticker
              </button>
              <button 
                onClick={() => loadPreset('bugReport')}
                className="bg-white hover:bg-yellow-100 text-xs font-mono px-2 py-1 border-2 border-black cursor-pointer font-semibold transition"
              >
                BugNuke
              </button>
              <button 
                onClick={() => loadPreset('coffeeTracker')}
                className="bg-white hover:bg-yellow-100 text-xs font-mono px-2 py-1 border-2 border-black cursor-pointer font-semibold transition"
              >
                FuelLog
              </button>
            </div>
          </div>

          {/* Textarea container */}
          <div className="relative">
            <textarea
              id="raw-json-textarea"
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="w-full h-80 bg-black text-[#8ff6d0] font-mono p-4 border-2 border-black outline-none focus:ring-0 focus:border-black text-sm resize-y leading-relaxed"
              spellCheck="false"
            />
            {jsonError && (
              <div className="absolute bottom-2 left-2 right-2 bg-red-100 border-2 border-black p-2 font-mono text-xs text-red-700 flex gap-1 items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="line-clamp-2">{jsonError}</div>
              </div>
            )}
          </div>
        </div>

        {/* Copy / Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-xs font-mono font-bold bg-white border-2 border-black px-3 py-1.5 hover:bg-gray-100 transition duration-150 active:translate-x-0.5 active:translate-y-0.5"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Copy Schema'}
          </button>
          <div className="text-xs font-mono text-black font-semibold uppercase">
            Editable Schema
          </div>
        </div>
      </div>

      {/* Dynamic Form Live Render Panel */}
      <div id="live-render-panel" className="lg:col-span-6 bg-white border-solid-neo p-6 md:p-8 neo-shadow flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <span className="font-label-caps text-sm uppercase bg-white border-2 border-black px-2 py-1 font-bold">
              🖥️ Live Render
            </span>
            <span className="font-mono text-xs text-gray-500 font-bold">
              {parsedForm.title || "Custom Component"}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {parsedForm.fields.map((field, idx) => {
              const fieldId = `field-${idx}-${field.label.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <div key={idx} className="flex flex-col gap-1.5">
                  <label htmlFor={fieldId} className="font-bold text-xs uppercase tracking-wider text-black font-mono flex items-center justify-between">
                    <span>{field.label}</span>
                    {field.type === 'range' && (
                      <span className="bg-yellow-200 border border-black px-1.5 font-bold text-xxs">
                        {formValues[field.label] !== undefined ? formValues[field.label] : field.value || ''}
                      </span>
                    )}
                  </label>

                  {field.type === 'text' && (
                    <input
                      id={fieldId}
                      type="text"
                      placeholder={field.placeholder || "Type value..."}
                      value={formValues[field.label] !== undefined ? formValues[field.label] : ''}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      className="border-[3px] border-black p-2.5 font-medium outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-none"
                    />
                  )}

                  {field.type === 'number' && (
                    <input
                      id={fieldId}
                      type="number"
                      min={field.min}
                      max={field.max}
                      placeholder={field.placeholder || "Enter integer..."}
                      value={formValues[field.label] !== undefined ? formValues[field.label] : ''}
                      onChange={(e) => handleFieldChange(field.label, parseInt(e.target.value) || 0)}
                      className="border-[3px] border-black p-2.5 font-medium outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-none"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      id={fieldId}
                      placeholder={field.placeholder || "Compose content..."}
                      value={formValues[field.label] !== undefined ? formValues[field.label] : ''}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      className="border-[3px] border-black p-2.5 font-medium outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-none h-24 resize-none"
                    />
                  )}

                  {field.type === 'range' && (
                    <input
                      id={fieldId}
                      type="range"
                      min={field.min ?? 1}
                      max={field.max ?? 100}
                      value={formValues[field.label] !== undefined ? formValues[field.label] : (field.value ?? 50)}
                      onChange={(e) => handleFieldChange(field.label, parseInt(e.target.value))}
                      className="accent-black h-4 cursor-pointer mt-1"
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      id={fieldId}
                      value={formValues[field.label] !== undefined ? formValues[field.label] : ''}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      className="border-[3px] border-black p-2.5 font-medium outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white rounded-none cursor-pointer"
                    >
                      {field.options?.map((opt, optIdx) => (
                        <option key={optIdx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {field.type === 'checkbox' && (
                    <label className="flex items-center gap-3 border-2 border-black p-2.5 cursor-pointer hover:bg-neutral-50 transition select-none">
                      <input
                        id={fieldId}
                        type="checkbox"
                        checked={!!formValues[field.label]}
                        onChange={(e) => handleFieldChange(field.label, e.target.checked)}
                        className="accent-black w-5 h-5 border-2 border-black rounded-none cursor-pointer"
                      />
                      <span className="font-semibold text-sm uppercase font-mono">Toggle Active State</span>
                    </label>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full bg-[#ffe600] border-3 border-black py-3 font-black text-sm uppercase hover:bg-yellow-400 active:translate-y-1 active:shadow-none font-mono cursor-pointer transition text-black neo-flat-shadow mt-4 block text-center"
            >
              🚀 Submit Sticker
            </button>
          </form>
        </div>

        {/* Dynamic submission readout sticker visualizer */}
        {submission && (
          <div id="form-submit-overlay" className="mt-6 bg-[#8ff6d0] border-solid-neo p-4 relative animate-fade-in">
            <button
              onClick={() => setSubmission(null)}
              className="absolute top-2 right-2 font-black font-mono text-sm uppercase bg-white border-2 border-black px-1 text-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              X
            </button>
            <div className="flex items-center gap-2 mb-2 font-display font-black text-sm uppercase tracking-wide">
              <CheckCircle className="w-5 h-5 text-green-800" />
              Sticker Created Successfully!
            </div>
            <p className="font-mono text-xs text-green-900 border-b-2 border-dashed border-green-800 pb-2 mb-2 font-bold select-none">
              DUMP CLIENT DATA:
            </p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {Object.entries(submission).map(([k, v]) => (
                <div key={k} className="font-mono text-xs flex justify-between">
                  <span className="font-bold uppercase text-green-900">{k}:</span>
                  <span className="text-black bg-white/50 px-1 font-semibold">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
