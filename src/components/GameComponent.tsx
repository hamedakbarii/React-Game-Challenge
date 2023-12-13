import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { initJsPsych } from "jspsych";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import imageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import GridComponent from "./GridComponent";

const jsPsych = initJsPsych();
const GameComponent: React.FC = () => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const numLevels = 5;
    const trials = [];

    trials.push({
      type: htmlKeyboardResponse,
      stimulus: "",
      trial_duration: 2000,
      on_load: displayGridComponent,
    });

    for (let level = 1; level <= numLevels; level++) {
      const isSymmetrical = Math.random() < 0.5;

      trials.push({
        type: imageKeyboardResponse,
        stimulus: `/${
          isSymmetrical ? "symmetrical" : "asymmetrical"
        }/${level}.svg`,
        choices: ["s", "n"],
        prompt:
          "<p>Is this shape symmetrical?</p><p>Press 's' for symmetrical or 'n' for nonsymmetrical</p>",
        trial_duration: 4000,
      });

      trials.push({
        type: htmlKeyboardResponse,
        stimulus: `<p>Level completed! Your score: ${score}</p>`,
        trial_duration: 2000,
      });

      trials.push({
        type: htmlKeyboardResponse,
        stimulus: "",
        trial_duration: level * 3000,
        on_finish: (data) => {
          const userResponse = data.key_press;
          const correctResponse = getCorrectResponseForLevel(level);
          const isCorrect = validateUserResponse(userResponse, correctResponse);

          if (isCorrect) {
            updateUserScore(1);
            displayFeedback("Correct! You remembered the colored cells.");
          } else {
            displayFeedback("Incorrect! Try again next level.");
          }
        },
      });
    }

    jsPsych.run(trials);
  }, []);

  const getCorrectResponseForLevel = (level: number): string[] => {
    const positions: Record<number, string[]> = {
      1: ["A1", "B2"],
      2: ["A1", "B2", "C3"],
      3: ["A1", "B2", "C3", "D4"],
      4: ["A1", "B2", "C3", "D4", "A2"],
      5: ["A1", "B2", "C3", "D4", "A2", "B3"],
    };

    return positions[level] || [];
  };

  const displayGridComponent = () => {
    console.log("working");
    const gridContainer = document.createElement("div");
    document.body.appendChild(gridContainer);
    ReactDOM.render(<GridComponent />, gridContainer);
  };

  const validateUserResponse = (
    userResponse: string,
    correctResponse: string[]
  ): boolean => {
    return userResponse === correctResponse.join("");
  };

  const updateUserScore = (points: number): void => {
    setScore((prevScore) => prevScore + points);
  };

  const displayFeedback = (message: string): void => {
    console.log(message);
  };

  return <></>;
};

export default GameComponent;
