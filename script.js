const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipRange = document.getElementById("tipRange");
const tipValueDisplay = document.getElementById("tipValue");
const resultDisplay = document.getElementById("result");
const currencySelect = document.getElementById("currency");

function calculate() {
  const bill = parseFloat(billInput.value);
  const tipPercentage = parseFloat(tipRange.value) / 100;
  const people = parseInt(peopleInput.value);
  const currency = currencySelect.value;

  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    resultDisplay.textContent = "Please enter valid numbers.";
    return;
  }

  const tip = bill * tipPercentage;
  const total = bill + tip;
  const perPerson = total / people;

  resultDisplay.innerHTML = `
        Tip: ${currency}${tip.toFixed(2)} <br>
        Total: ${currency}${total.toFixed(2)} <br>
        Each Person Pays: ${currency}${perPerson.toFixed(2)}
      `;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function downloadReceipt() {
  const bill = parseFloat(billInput.value);
  const tipPercentage = parseFloat(tipRange.value);
  const people = parseInt(peopleInput.value);
  const currency = currencySelect.value;

  if (isNaN(bill) || isNaN(people) || people <= 0) {
    alert("Please enter valid data first.");
    return;
  }

  const tip = bill * (tipPercentage / 100);
  const total = bill + tip;
  const perPerson = total / people;

  const receipt = `
        --- TIP RECEIPT ---
        Bill: ${currency}${bill.toFixed(2)}
        Tip (${tipPercentage}%): ${currency}${tip.toFixed(2)}
        Total: ${currency}${total.toFixed(2)}
        Number of People: ${people}
        Each Pays: ${currency}${perPerson.toFixed(2)}
      `;

  const blob = new Blob([receipt], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "tip_receipt.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);
tipRange.addEventListener("input", () => {
  tipValueDisplay.textContent = `${tipRange.value}%`;
  calculate();
});
currencySelect.addEventListener("change", calculate);
