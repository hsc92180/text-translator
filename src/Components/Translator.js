import React, { useState, useEffect } from "react";
import SelectLanguage from "./SelectLanguage";
import "./Translator.css";
const Translator = () => {
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState([]);
 
  useEffect(() => {
    getLanguages();
  }, []);

  async function getLanguages() {
    const url = "https://text-translator2.p.rapidapi.com/getLanguages";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0b9a1016admsh3fce878d8ac28efp1d333djsna6ace521134a",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const newData = JSON.parse(result);
      setLanguage(newData.data.languages);
    } catch (error) {
      alert("Error!");
    }
  }

  async function fetchData(selectedLanguage, translatedLanguage, inputValue) {
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "0b9a1016admsh3fce878d8ac28efp1d333djsna6ace521134a",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: new URLSearchParams({
        source_language: selectedLanguage,
        target_language: translatedLanguage,
        text: inputValue,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const newResult = JSON.parse(result);
      setOutput(newResult.data.translatedText);
    } catch (error) {
      alert("Error!");
    }
  }

  function formInput(e) {
    e.preventDefault();

    const selectedLanguage = e.target.elements["Select Language"].value;
    const translatedLanguage = e.target.elements["Converted Language"].value;
    const inputValue = e.target.elements["inputValue"].value;
    fetchData(selectedLanguage, translatedLanguage, inputValue);
  }

  return (
    <>
      <main className="main">
        <div className="formTranslator">
          <form action="" onSubmit={(e) => formInput(e)}>
            <div className="languageSelector">
              <select name="Select Language" id="">
                <option value="" disabled="true">
                  Select Your Language
                </option>

                {language.map((ele) => (
                  <SelectLanguage
                    key={"sel"}
                    dataObj={ele}
                  />
                ))}
              </select>
              <select name="Converted Language" id="" >
                <option value="" disabled="true">
                  Select Converted Language
                </option>

                {language.map((ele) => (
                  <SelectLanguage
                    key={"trans"}
                    dataObj={ele}
                  />
                ))}
              </select>
            </div>
            <div className="textContainer">
              
                <textarea type="text" name="inputValue" placeholder="Enter Text" rows={5} cols={50}></textarea>
              
              <textarea type="text" name="outputValue" placeholder={output} rows={5} cols={50}></textarea>
            </div>
            <button>Translate</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Translator;