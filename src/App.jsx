import React, { useState } from "react";
import "./App.css";

const WhoIsBig = (First, Second) => {
  if (First === Second) {
    return "Tie";
  }
  switch (First) {
    case "Rock":
      return Second === "Scissors" ? First : Second;
    case "Paper":
      return Second === "Rock" ? First : Second;
    case "Scissors":
      return Second === "Paper" ? First : Second;
    default:
      return null;
  }
};

const App = () => {
  const [started, setStarted] = useState(false);
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [name, setName] = useState("");

  const Images = {
    Rock: "https://i.imgur.com/TONXH9s.png",
    Paper: "https://i.imgur.com/t2154qR.png",
    Scissors: "https://i.imgur.com/SXstPKk.png"
  };

  const handleStartGame = () => {
    setStarted(true);
  };

  const handlePlayerChoice = (choice) => {
    setPlayer(choice);
    const computerChoice = Object.keys(Images)[
      Math.floor(Math.random() * Object.keys(Images).length)
    ];
    setComputer(computerChoice);
  };

  const handleRestart = () => {
    setStarted(false);
    setPlayer(null);
    setComputer(null);
  };

  const winnerText = () => {
    const winner = WhoIsBig(player, computer);
    if (winner === "Tie") return "Nobody Wins!";
    return winner === player ? `${name} Wins!` : "Computer Wins!";
  };

  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      {started ? (
        <div className="Game">
          <div className={"Player" + (player ? " selected" : "")}>
            <p>Player</p>
            {player ? (
              <img src={Images[player]} alt={player} />
            ) : (
              <div className="choose">
                {Object.keys(Images).map((choice) => (
                  <span
                    key={choice}
                    onClick={() => handlePlayerChoice(choice)}
                  >
                    <img src={Images[choice]} alt={choice} />
                    {choice}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="Computer">
            <p>Computer</p>
            {computer ? (
              <img src={Images[computer]} alt={computer} />
            ) : (
              <img
                src="https://i.imgur.com/CyvHqQH.png"
                alt="All Choices"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="Intro">
          <input
            type="text"
            placeholder="Enter your name, at least 3 characters long..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.trim().length > 2 && (
            <img
              className="start"
              src="https://i.imgur.com/FrnyhhB.png"
              alt="Start"
              onClick={handleStartGame}
            />
          )}
        </div>
      )}
      {player && computer && (
        <p className="Results">
          {winnerText()}
          <img
            src="https://i.imgur.com/529CybI.png"
            alt="Restart"
            onClick={handleRestart}
          />
        </p>
      )}

     <footer>Made with 💌 by Prince</footer>
    </div>
  );
};

export default App;
