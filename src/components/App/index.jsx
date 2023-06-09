import "./style.scss";
import { useState, useEffect } from "react";
import countriesApi from "../../utils/CountryApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import MyButton from "../MyButton";
import MyRadioButton from "../MyRadioButton";
import { YMaps } from '@pbe/react-yandex-maps';
import YandexMap from "../YandexMap";
import InfoCountry from "../InfoCountry";
import { wikipediaApiEn } from "../../utils/WikipediaApiEn";
import { wikipediaApiRu } from "../../utils/WikipediaApiRu";

export default function App() {
  const [countries, setCountries] = useLocalStorage("countries", []);
  const [currentFlag, setCurrentFlag] = useState("")
  const [buttons, setButtons] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [trueCountryName, setTrueCountryName] = useState([]);
  const [language, setLanguage] = useState("russian");
  const [lang, setLang] = useState("ru_RU");
  const [coordinates, setCoordinates] = useState([]);
  const [info, setInfo] = useState({});
  const [articleEn, setArticleEn] = useState("");
  const [articleRu, setArticleRu] = useState("");

  function chengeValue(e) {
    setLanguage(e.target.value);
    if (e.target.value === "english") {
      setLang("en_US");
    } else {
      setLang("ru_RU");
    }
  }

  async function handleGetCountries() {
    try {
      const data = await countriesApi.getAllCountries();
      setCountries(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  function getQuiz() {
    const trueCountry = countries[Math.floor(Math.random() * (countries.length - 1))];
    setTrueCountryName([trueCountry.name.common, trueCountry.translations.rus.common]);
    setCurrentFlag(trueCountry.flags.svg);
    setCoordinates(trueCountry.capitalInfo.latlng);
    setInfo({
      population: trueCountry.population,
      capital: trueCountry.capital[0],
      coatOfArms: trueCountry.coatOfArms.svg,
      area: trueCountry.area,
    });
  }

  async function getInfoFromWikipediaEn(nameCountry) {
    try {
      const dataEn = await wikipediaApiEn.getInfoCountryEn(nameCountry);
      const identificator = Object.keys(dataEn.query.pages)[0];
      setArticleEn(dataEn.query.pages[identificator].extract);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getInfoFromWikipediaRu(nameCountry) {
    try {
      const dataRu = await wikipediaApiRu.getInfoCountryRu(nameCountry);
      const identificator = Object.keys(dataRu.query.pages)[0];
      setArticleRu(dataRu.query.pages[identificator].extract);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (trueCountryName.length !== 0) {
      getInfoFromWikipediaEn(trueCountryName[0]);
      getInfoFromWikipediaRu(trueCountryName[1]);
    }
  }, [trueCountryName]);

  function answer(element) {
    if (trueCountryName[0] === element || trueCountryName[1] === element) {
      setScore(score + 1)
    }
    else {
      setLives(lives - 1)
    }
    getQuiz()
  }

  useEffect(() => {
    if (countries.length !== 0 && trueCountryName.length !== 0) {
      const selectedCountriesNames = [];
      while (selectedCountriesNames.length < 3) {
        let newCountry = countries[Math.floor(Math.random() * (countries.length - 1))];

        if (!selectedCountriesNames.includes(newCountry.name.common)) {
          if (language === "english") {
            selectedCountriesNames.push(newCountry.name.common);
          } else {
            selectedCountriesNames.push(newCountry.translations.rus.common);
          }
        }
      }
      selectedCountriesNames.splice(Math.floor(Math.random() * 4), 0, language === "english" ? trueCountryName[0] : trueCountryName[1])
      setButtons(selectedCountriesNames)
      console.log(trueCountryName);
    }
  }, [trueCountryName, countries, language])


  useEffect(() => {
    if (countries.length === 0) {
      handleGetCountries();
    }
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    if (countries.length !== 0) {
      getQuiz();
    }
    // eslint-disable-next-line 
  }, [countries]);

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_APIKEY_YANDEX_MAPS,
        lang: lang
      }}>
      <div className="quiz">
        <div className="game">
          <form action="" className="game__form">
            <div className="game__header">
              <h2 className="game__score">Score: {score}</h2>
              <h1 className="game__name">Flag Quiz</h1>
              <h2 className="game__lives">Lives: {lives}</h2>
            </div>
            <img src={currentFlag} alt="flag" className="game__flag" />
            <section className="game__buttons">
              {buttons.map((text, id) => (
                <MyButton
                  key={id}
                  text={text || ""}
                  className="game__button"
                  onClick={() => answer(text)}
                  ariaLabel={text}
                />
              ))}
            </section>
            <div className="game__radio-buttons">
              <MyRadioButton
                type="radio"
                id="radio-1"
                name="radio"
                value="english"
                text="english"
                ariaLabel="english"
                disabled={false}
                checked={language === "english"}
                onChange={chengeValue}
              />
              <MyRadioButton
                type="radio"
                id="radio-2"
                name="radio"
                value="russian"
                text="русский"
                ariaLabel="russian"
                disabled={false}
                checked={language === "russian"}
                onChange={chengeValue}
              />
            </div>
          </form>
        </div>
        {coordinates.length !== 0 &&
          <YandexMap
            coordinates={coordinates}
            info={info}
          />
        }
        {language === "english" &&
          articleEn &&
          <InfoCountry
            text={articleEn}
          />
        }
        {language === "russian" &&
          articleRu &&
          <InfoCountry
            text={articleRu}
          />
        }
      </div>
    </YMaps>
  )
}
