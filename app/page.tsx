"use client";

import { useState } from "react";
import Game from "./components/Game";

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(5);

  // Handle change in selected option
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-500">
      <h1 className="text-3xl uppercase text-6xl mb-2 text-blue-900">Wordle</h1>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl ">Difficulty: </h2>
        <div className="w-64 ml-2">
          <select
            id="options"
            value={selectedOption}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="4">Easy</option>
            <option value="5">Medium</option>
            <option value="6">Hard</option>
            <option value="7">Master</option>
          </select>
        </div>
      </div>
      <Game wordLength={selectedOption} />
    </div>
  );
};

export default Home;
