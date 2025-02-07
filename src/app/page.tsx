"use client"
import Button from "@/components/Button";
import Lista from "@/components/Lista";
import { useState, useEffect } from "react";

import logo from '@/assets/images/logo-clara.png'
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-3 font-mono">
      <div className=""> 
        <Image 
        src={logo} 
        alt="Logo Marca Mente Humana" 
        width={'150'}
        className="rounded-xl" 
        /> 
        </div>

      <div className="sm:text-7xl text-7xl pt-5 font-bold">{formatTime(time)}</div>
      <label className="flex sm:text-2xl text-xl items-center gap-2">
        <input type="checkbox" className="sm:w-6 sm:h-6 w-4 h-4" checked={interference} onChange={() => setInterference((prev) => !prev)} />
        Interferência
      </label>
      <div className="sm:flex grid grid-cols-2 mt-2 sm:mt-0 gap-2 text-sm">
        <Button 
        onClick={handleStartPause} 
        h={"hover:bg-green-600"}>
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>
        <Button 
        onClick={handleSave} 
        disabled={time === 0}
        h={"hover:bg-blue-600"}>
          Registrar
        </Button>
        <Button 
        onClick={handleReset} 
        disabled={time === 0} 
        h={"hover:bg-red-600"}>
          Zerar
        </Button>
        <Button 
        h={"hover:bg-gray-600"}
        onClick={handleClearRecords} 
        disabled={savedTimes.length === 0}>
          Limpar Registros
        </Button>
      </div>

      { savedTimes.length ? <Lista savedTimes={savedTimes} /> : <></>}

    </div>
  );
}
