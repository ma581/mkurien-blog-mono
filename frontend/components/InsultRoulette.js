// import { Wheel } from "react-custom-roulette";
import React, { useState } from "react";

export function InsultRoulette() {
  const data = [
    {
      option: "Panoli",
      style: { backgroundColor: "#1abc9c" },
      value: { title: "Panoli!", description: "Idiot." },
    },
    {
      option: "Pringado",
      style: { backgroundColor: "#f1c40f" },
      value: { title: "Pringado!", description: "Idiot." },
    },
    {
      option: "Maldita Sea",
      style: { backgroundColor: "#e74c3c" },
      value: { title: "Maldita Sea!", description: "Darn it." },
    },
    {
      option: "Me cago en el mar",
      style: { backgroundColor: "#2980b9" },
      value: {
        title: "Me cago en el mar!",
        description:
          "Translation: I'm crapping in the sea. Equivalent of saying 's**t!'.",
      },
    },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [insult, setInsult] = useState({
    title: "Have a spin!",
    description: "And learn a mild insult today.",
  });

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setInsult({ title: "", description: "Preparing your insult..." });
  };
  

  return (
    <div onClick={handleSpinClick} className="fill-space hover-hand">
    </div>
  );
}
