import React, { useEffect, useState } from "react";
import { wordList } from "../utils/words";

const Game = (props: any) => {
  const wordLength = props.wordLength || 5; // Default to 5 if not provided
  const maxGuesses = 6;
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(
    Array(maxGuesses).fill(Array(wordLength).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [loading, setLoading] = useState(true);

  const resetGame = () => {
    setGuesses(Array(maxGuesses).fill(Array(wordLength).fill("")));
    setCurrentRow(0);
  };

  useEffect(() => {
    const getRandomWord = () => {
      const words = wordList[wordLength] || [];
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex].toUpperCase();
    };

    const fetchWord = () => {
      setLoading(true);
      const word = getRandomWord();
      setTargetWord(word);
      setLoading(false);
    };

    fetchWord();
  }, [wordLength]);

  const handleChange = (e, rowIndex, colIndex) => {
    if (loading) return;
    const value = e.target.value.toUpperCase();
    if (!/^[A-Z]?$/.test(value)) return; // Only allow letters

    const newGuesses = [...guesses];
    newGuesses[rowIndex] = [...newGuesses[rowIndex]];
    newGuesses[rowIndex][colIndex] = value;
    setGuesses(newGuesses);

    // Move to next input field if not last letter
    if (value && colIndex < wordLength - 1) {
      e.target.nextSibling?.focus();
    }
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (loading) return;
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent browser default behavior

      const newGuesses = [...guesses];
      newGuesses[rowIndex] = [...newGuesses[rowIndex]];

      if (newGuesses[rowIndex][colIndex]) {
        // If the current box has a letter, clear it
        newGuesses[rowIndex][colIndex] = "";
      } else if (colIndex > 0) {
        // If empty, move focus to the previous box
        newGuesses[rowIndex][colIndex - 1] = "";
        e.target.previousSibling?.focus();
      }

      setGuesses(newGuesses);
    }
  };

  const changeWord = () => {
    setLoading(true);

    // Function to get a random word from the word list
    const getRandomWord = () => {
      const words = wordList[wordLength] || [];
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex].toUpperCase();
    };

    // Set a new random target word
    const newWord = getRandomWord();
    setTargetWord(newWord);

    setLoading(false);
  };

  const handleSubmit = () => {
    if (loading || guesses[currentRow].join("").length !== wordLength) return;
    if (guesses[currentRow].join("").length !== wordLength) return;

    if (guesses[currentRow].join("") === targetWord) {
      alert("🎉 You guessed it right!");
    } else if (currentRow < maxGuesses - 1) {
      setCurrentRow(currentRow + 1);
    } else {
      alert(`Game Over! The word was "${targetWord}"`);
    }
  };

  const getColor = (letter, index) => {
    if (targetWord[index] === letter) return "border-green-500 "; // Correct
    if (targetWord.includes(letter)) return "border-yellow-500"; // Misplaced
    return "border-gray-300"; // Wrong
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {guesses.map((guessRow, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2 mb-2">
          {guessRow.map((letter, colIndex) => (
            <input
              key={colIndex}
              type="text"
              maxLength={1}
              value={letter}
              disabled={rowIndex !== currentRow}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              className={`w-15 h-15 text-center text-xl font-bold  border-2 rounded focus:outline-none ${
                rowIndex < currentRow
                  ? getColor(letter, colIndex)
                  : "border-gray-400"
              }`}
            />
          ))}
        </div>
      ))}
      <div className="flex justify-center flex-col gap-2 mt-4">
        <button
          className="w-85 h-10 rounded uppercase text-white text-center bg-blue-900 tracking-wider cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="w-85 h-10 rounded uppercase border bg-white text-center text-blue-900 tracking-wider cursor-pointer"
          onClick={changeWord}
        >
          Guess Another
        </button>
      </div>
    </div>
  );
};

export default Game;
