// === Loan Calculator Script ===

// Tabs switch karna
function showTab(tab) {
  document.querySelectorAll(
    ".loan-form,.comparison-form,.interest-form,.murabaha-form,.musharakah-form"
  ).forEach((f) => f.classList.remove("active"));

  document.querySelectorAll(".tab-btn").forEach((b) =>
    b.classList.remove("active")
  );

  if (tab === "car") document.getElementById("carForm").classList.add("active");
  if (tab === "home")
    document.getElementById("homeForm").classList.add("active");
  if (tab === "personal")
    document.getElementById("personalForm").classList.add("active");
  if (tab === "compare")
    document.getElementById("compareForm").classList.add("active");
  if (tab === "interest")
    document.getElementById("interestForm").classList.add("active");
  if (tab === "murabaha")
    document.getElementById("murabahaForm").classList.add("active");
  if (tab === "musharakah")
    document.getElementById("musharakahForm").classList.add("active");

  event.target.classList.add("active");
}

// Reset Form
function resetForm(id) {
  document.getElementById(id).reset();
  document.querySelector("#" + id + " div").innerHTML = "";
}

// Normal Loan EMI (Car, Home, Personal)
function calcLoan(type) {
  let amount = parseFloat(document.getElementById(type + "Amount").value);
  let rate = parseFloat(document.getElementById(type + "Rate").value) / 100 / 12;
  let years = parseFloat(document.getElementById(type + "Years").value) * 12;

  if (isNaN(amount) || isNaN(rate) || isNaN(years)) return;

  let emi =
    (amount * rate * Math.pow(1 + rate, years)) /
    (Math.pow(1 + rate, years) - 1);

  let totalPayment = emi * years;
  let totalInterest = totalPayment - amount;

  document.getElementById(type + "Result").innerHTML = `
    <table class="summary-table">
      <tr><th>Loan Amount</th><td>PKR ${amount.toLocaleString()}</td></tr>
      <tr><th>Interest Rate</th><td>${(rate * 12 * 100).toFixed(2)}%</td></tr>
      <tr><th>Duration</th><td>${years / 12} years (${years} months)</td></tr>
      <tr><th>Monthly EMI</th><td><b>PKR ${emi.toFixed(0).toLocaleString()}</b></td></tr>
      <tr><th>Total Payment</th><td>PKR ${totalPayment
        .toFixed(0)
        .toLocaleString()}</td></tr>
      <tr><th>Total Interest</th><td>PKR ${totalInterest
        .toFixed(0)
        .toLocaleString()}</td></tr>
    </table>
  `;
}

// Loan Comparison
function compareLoans() {
  let rateA = parseFloat(document.getElementById("rateA").value) / 100 / 12;
  let rateB = parseFloat(document.getElementById("rateB").value) / 100 / 12;
  let amount = parseFloat(document.getElementById("compAmount").value);
  let months = parseFloat(document.getElementById("compYears").value) * 12;

  let emiA =
    (amount * rateA * Math.pow(1 + rateA, months)) /
    (Math.pow(1 + rateA, months) - 1);
  let emiB =
    (amount * rateB * Math.pow(1 + rateB, months)) /
    (Math.pow(1 + rateB, months) - 1);

  document.getElementById(
    "compareResult"
  ).innerHTML = `<p>Bank A EMI: <b>PKR ${emiA
    .toFixed(0)
    .toLocaleString()}</b><br>Bank B EMI: <b>PKR ${emiB
    .toFixed(0)
    .toLocaleString()}</b></p>`;
}

// Flat vs Reducing
function calcInterest() {
  let amount = parseFloat(document.getElementById("intAmount").value);
  let rate = parseFloat(document.getElementById("intRate").value) / 100;
  let years = parseFloat(document.getElementById("intYears").value);

  let flat = (amount + amount * rate * years) / (years * 12);

  let r = rate / 12,
    n = years * 12;
  let reducing = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  document.getElementById(
    "intResult"
  ).innerHTML = `<p>Flat EMI: PKR ${flat
    .toFixed(0)
    .toLocaleString()}<br>Reducing EMI: PKR ${reducing
    .toFixed(0)
    .toLocaleString()}</p>`;
}

// Murabaha
function calcMurabaha() {
  let price = parseFloat(document.getElementById("murabahaPrice").value);
  let profit = parseFloat(document.getElementById("murabahaRate").value) / 100;
  let years = parseFloat(document.getElementById("murabahaYears").value);

  let total = price + price * profit * years;
  let emi = total / (years * 12);

  document.getElementById("murabahaResult").innerHTML = `
    <p>Total Payable: PKR ${total.toFixed(0).toLocaleString()}<br>
    Monthly Installment: <b>PKR ${emi.toFixed(0).toLocaleString()}</b></p>`;
}

// Musharakah
function calcMusharakah() {
  let price = parseFloat(document.getElementById("musharakahPrice").value);
  let share = parseFloat(document.getElementById("musharakahShare").value) / 100;
  let rent = parseFloat(document.getElementById("musharakahRent").value) / 100;
  let years = parseFloat(document.getElementById("musharakahYears").value);

  let bankShare = price * share;
  let monthlyRent = (bankShare * rent) / 12;
  let total = monthlyRent * years * 12 + bankShare;

  document.getElementById("musharakahResult").innerHTML = `
    <p>Total Payable: PKR ${total.toFixed(0).toLocaleString()}<br>
    Monthly Rent + Equity: <b>PKR ${(total / (years * 12))
      .toFixed(0)
      .toLocaleString()}</b></p>`;
}
