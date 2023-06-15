import React, { useEffect, useState } from "react";

const TemperatureConverter = () => {
  const [inputTemperature, setInputTemperature] = useState(100);
  const [outputTemperature, setOutputTemperature] = useState(212);
  const [selectedInputUnit, setSelectedInputUnit] = useState("Celsius");
  const [selectedOutputUnit, setSelectedOutputUnit] = useState("Fahrenheit");

  // console.table({
  //   input: inputTemperature,
  //   outputTemperature: outputTemperature,
  //   selectedUnit: selectedInputUnit,
  //   selectedOutput: selectedOutputUnit,
  //   baseTempareture: baseTempareture
  // });

  const handleInputUnitChange = (value) => {
    setSelectedInputUnit(value);
  };

  const handleOutputUnitChange = (value) => {
    setSelectedOutputUnit(value);
  };

  const convertCelsiusToFahrenheit = (value) => 1.8 * value + 32;
  const convertFahrenheitToCelsius = (value) => (value - 32) / 1.8;
  const convertCelsiusToKelvin = (value) => value + 273.15;
  const convertKelvinToCelsius = (value) => value - 273.15;
  const convertFahrenheitToKelvin = (value) => (value + 459.67) / 1.8;
  const convertKelvinToFahrenhreit = (value) => value * 1.8 - 459.67;

  const calculateTemparature = function (unit1, unit2, value) {
    let temp;
    if (unit1 === "Celsius") {
      temp =
        unit2 === "Celsius"
          ? value
          : unit2 === "Fahrenheit"
          ? convertCelsiusToFahrenheit(value)
          : convertCelsiusToKelvin(value);
    } else if (unit1 === "Fahrenheit") {
      temp =
        unit2 === "Celsius"
          ? convertFahrenheitToCelsius(value)
          : unit2 === "Fahrenheit"
          ? value
          : convertFahrenheitToKelvin(value);
    } else if (unit1 === "Kelvin") {
      temp =
        unit2 === "Celsius"
          ? convertKelvinToCelsius(value)
          : unit2 === "Fahrenheit"
          ? convertKelvinToFahrenhreit(value)
          : value;
    }
    return temp;
  };

  // const handleInputTemparetureChange = (unit1, unit2, value) =>
  //   setInputTemperature(calculateTemparature(unit1, unit2, value));

  const handleOutputTemparetureChange = (unit1, unit2, value) =>
    setOutputTemperature(calculateTemparature(unit1, unit2, value));

  ///new code
  const [backgroundColor1, setBackgroundColor1] = useState("");
  const [backgroundColor2, setBackgroundColor2] = useState("");

  const getColorFromTemp = (temp) => {
    let newColor;
    if (selectedInputUnit === "Celsius") {
      newColor =
        temp < 15
          ? "#0000ff"
          : temp > 70
          ? "#ff0000"
          : `#${Math.floor((255 * temp) / 100).toString(16)}0000`;
    } else if (selectedInputUnit === "Fahrenheit") {
      newColor =
        temp < 32
          ? "#0000ff"
          : temp > 212
          ? "#ff0000"
          : `#${Math.floor((255 * (temp - 32)) / 180).toString(16)}0000`;
    } else if (selectedInputUnit === "Kelvin") {
      newColor =
        temp < 273.15
          ? "#0000ff"
          : temp > 373.15
          ? "#ff0000"
          : `#${Math.floor((255 * (temp - 273.15)) / 100).toString(16)}0000`;
    }
    return newColor;
  };

  useEffect(() => {
    setBackgroundColor1(getColorFromTemp(inputTemperature));
  }, [inputTemperature, selectedInputUnit]);

  useEffect(() => {
    setBackgroundColor2(getColorFromTemp(outputTemperature));
  }, [outputTemperature, selectedOutputUnit]);

  ///

  return (
    <>
      <h2>Temperature Unit Converter</h2>

      <div>
        <input
          type="number"
          value={inputTemperature}
          onChange={(e) => {
            setInputTemperature(+e.target.value);
            handleOutputTemparetureChange(
              selectedInputUnit,
              selectedOutputUnit,
              +e.target.value
            );
          }}
        />

        <select
          value={selectedInputUnit}
          onChange={(e) => {
            handleInputUnitChange(e.target.value);
            handleOutputTemparetureChange(
              e.target.value,
              selectedOutputUnit,
              inputTemperature
            );
          }}
          style={{
            backgroundColor: backgroundColor1,
            // backgroundClip: "text",
            // textFillColor: "transparent",
            color: "#fff",
          }}
        >
          <option value="Celsius">°C</option>
          <option value="Fahrenheit">°F</option>
          <option value="Kelvin">°K</option>
        </select>
      </div>

      {
        <div>
          <input
            type="text"
            value={outputTemperature}
            onChange={(e) => {
              console.log(e.target.value);
              // handleInputTemparetureChange(
              //   selectedOutputUnit,
              //   selectedInputUnit,
              //   +e.target.value
              // );
            }}
          />

          <select
            value={selectedOutputUnit}
            onChange={(e) => {
              handleOutputUnitChange(e.target.value);

              handleOutputTemparetureChange(
                selectedInputUnit,
                e.target.value,
                inputTemperature
              );
            }}
            style={{ backgroundColor: backgroundColor2, color: "#fff" }}
          >
            <option value="Celsius">°C</option>
            <option value="Fahrenheit">°F</option>
            <option value="Kelvin">°K</option>
          </select>
        </div>
      }
    </>
  );
};

export default TemperatureConverter;
