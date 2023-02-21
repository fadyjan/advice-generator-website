import React, { useEffect, useState } from "react";
import "./AdviceGenerator.css";
import DviderImg from "../../Assets/pattern-divider-desktop.svg";
import DviderImgMob from "../../Assets/pattern-divider-mobile.svg";
import DiceImg from "../../Assets/icon-dice.svg";
import axios from "axios";

const AdviceGenerator = () => {
  const [advice, setAdvice] = useState([]);
  const [flag, setFlag] = useState(true);
  const [btnflag, setBtnflag] = useState(false);
  const [stateImage, setStateImage] = useState(true);

  useEffect(() => {
    if (flag === true) {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          setBtnflag(true);
          setAdvice(response.data.slip);
          setTimeout(() => {
            setBtnflag(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
      setFlag(false);
    }
    const handleWindowResize = () => {
        if (window.innerWidth >1000) {
          setStateImage(true)
        } else {
          setStateImage(false)
  
        }
      };
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
  }, [flag]);

  return (
    <div id="Wrapper">
      <h1 id="AdviceHeader">ADVICE #{advice.id}</h1>
      <p id="AdviceParaphraphe">"{advice.advice}"</p>
      <img
        alt=""
        src={stateImage ? DviderImg : DviderImgMob}
        id="DviderImg"
      ></img>
      <button
        id="DiceWrapper"
        disabled={btnflag}
        onClick={() => {
          setFlag(true);
        }}
      >
        <img alt="" src={DiceImg} id="DiceImg"></img>
      </button>
    </div>
  );
};

export default AdviceGenerator;
