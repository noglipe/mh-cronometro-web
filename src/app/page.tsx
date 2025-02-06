"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState<{ time: number; interference: boolean; index: number }[]>([]);
  const [interference, setInterference] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSave = () => {
    setSavedTimes((prev) => [...prev, { time, interference, index: count }].sort((a, b) => a.time - b.time));
    setCount((prev) => prev + 1);
    setIsRunning(false);
    setTime(0);
  };

  const handleClearRecords = () => {
    setSavedTimes([]);
    setCount(1);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 font-mono">
      <div className="text-8xl font-bold">{formatTime(time)}</div>
      <label className="flex text-2xl items-center gap-2">
        <input type="checkbox" className="w-6 h-6" checked={interference} onChange={() => setInterference((prev) => !prev)} />
        Interferência
      </label>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleStartPause}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
          disabled={time === 0}
        >
          Registrar
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleReset}
        >
          Zerar
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleClearRecords}
          disabled={savedTimes.length === 0}
        >
          Limpar Registros
        </button>
      </div>
      
      <div className="mt-4 w-1/3 max-h-60 overflow-auto border rounded-md p-2">
        <ul className="w-full text-center">
          {savedTimes.map(({ time, interference, index }) => (
            <li key={index} className={`hover:bg-gray-800 py-1 text-lg ${interference ? 'text-red-500' : ''}`}>
              {index}º tempo : {formatTime(time)} {interference ? '*' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
