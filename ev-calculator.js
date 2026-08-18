(() => {
  const calculator = document.querySelector(".ev-calculator");
  if (!calculator) return;
  const inputs = [...calculator.querySelectorAll("input")];
  const outputs = [...calculator.querySelectorAll(".ev-results strong")];
  const fixed = (value, digits) => {
    const factor = 10 ** digits;
    return (Math.round((value + Number.EPSILON) * factor) / factor).toFixed(digits);
  };
  const update = () => {
    const [battery, start, end, efficiency, rate, annualMiles, milesPerKwh] = inputs.map((input) => Number(input.value));
    const added = battery * Math.max(0, end - start) / 100;
    const grid = added / Math.max(0.01, efficiency / 100);
    const session = grid * rate;
    const annualGrid = annualMiles / Math.max(0.1, milesPerKwh) / Math.max(0.01, efficiency / 100);
    const annualCost = annualGrid * rate;
    const costPerMile = annualMiles ? annualCost / annualMiles : 0;
    outputs[0].textContent = fixed(added, 1) + " kWh";
    outputs[1].textContent = fixed(grid, 1) + " kWh";
    outputs[2].textContent = "$" + fixed(session, 2);
    outputs[3].textContent = "$" + fixed(costPerMile, 3);
    outputs[4].textContent = "$" + fixed(annualCost / 12, 2);
    outputs[5].textContent = "$" + fixed(annualCost, 2);
  };
  inputs.forEach((input) => input.addEventListener("input", update));
  update();
})();
