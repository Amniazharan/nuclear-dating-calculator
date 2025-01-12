import React, { useState } from 'react';

const NuclearDatingCalculator = () => {
  // State untuk menyimpan input dan hasil
  const [isotope, setIsotope] = useState('uranium-235');
  const [initialAmount, setInitialAmount] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);

  // Data isotop untuk nuclear dating
  const isotopeData = {
    'uranium-235': {
      halfLife: 703800000, // tahun
      name: 'Uranium-235'
    },
    'potassium-40': {
      halfLife: 1250000000, // tahun
      name: 'Potassium-40'
    },
    'rubidium-87': {
      halfLife: 48800000000, // tahun
      name: 'Rubidium-87'
    },
    'carbon-14': {
      halfLife: 5730, // tahun
      name: 'Carbon-14'
    }
  };

  // Fungsi untuk mengira baki isotop
  const calculateRemaining = () => {
    const initial = parseFloat(initialAmount);
    const years = parseFloat(time);
    const selectedIsotope = isotopeData[isotope];
    
    if (isNaN(initial) || isNaN(years)) {
      alert('Sila masukkan nombor yang sah');
      return;
    }

    // Rumus decay radioaktif: A = A0 * (1/2)^(t/t1/2)
    const remaining = initial * Math.pow(0.5, years / selectedIsotope.halfLife);
    
    setResult({
      remaining: remaining.toFixed(4),
      percentage: ((remaining / initial) * 100).toFixed(2),
      halfLife: selectedIsotope.halfLife.toLocaleString()
    });
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          Kalkulator Nuclear Dating
        </h1>
        
        {/* Pilih Isotop */}
        <div className="mb-4">
          <label className="block text-red-700 mb-2">Pilih Isotop</label>
          <select 
            value={isotope}
            onChange={(e) => setIsotope(e.target.value)}
            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {Object.keys(isotopeData).map(key => (
              <option key={key} value={key}>
                {isotopeData[key].name}
              </option>
            ))}
          </select>
        </div>

        {/* Input Jumlah Awal */}
        <div className="mb-4">
          <label className="block text-red-700 mb-2">Jumlah Awal Isotop</label>
          <input 
            type="number" 
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Masukkan jumlah awal"
          />
        </div>

        {/* Input Tempoh Masa */}
        <div className="mb-4">
          <label className="block text-red-700 mb-2">Tempoh Masa (tahun)</label>
          <input 
            type="number" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Masukkan tempoh masa"
          />
        </div>

        {/* Butang Kira */}
        <button 
          onClick={calculateRemaining}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Kira Baki Isotop
        </button>

        {/* Paparan Keputusan */}
        {result && (
          <div className="mt-6 text-center">
            <p className="text-red-800 font-semibold">
              Baki Isotop: {result.remaining}
            </p>
            <p className="text-red-700">
              Peratusan Baki: {result.percentage}%
            </p>
            <p className="text-sm text-red-600 mt-2">
              Umur Separuh: {result.halfLife} tahun
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuclearDatingCalculator;