// === Loan Calculator Script ===
// Ye script automatically monthly payment calculate karega

function calculateLoan() {
  // Input values get karo
  let amount = parseFloat(document.getElementById("loan-amount").value);
  let rate = parseFloat(document.getElementById("interest-rate").value);
  let years = parseFloat(document.getElementById("loan-years").value);

  // Agar koi input missing hai
  if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
    alert("Please enter all values (loan amount, rate, years)");
    return;
  }

  // Convert annual rate into monthly rate
  let monthlyRate = (rate / 100) / 12;
  let months = years * 12;

  // EMI formula
  let emi = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  // Total interest & total payment
  let totalPayment = emi * months;
  let totalInterest = totalPayment - amount;

  // Result show karo
  document.getElementById("result").innerHTML = `
    <table class="summary-table">
      <tr><th>Loan Amount</th><td>PKR ${amount.toLocaleString()}</td></tr>
      <tr><th>Interest Rate</th><td>${rate}%</td></tr>
      <tr><th>Duration</th><td>${years} years (${months} months)</td></tr>
      <tr><th>Monthly Payment</th><td><b>PKR ${emi.toFixed(0).toLocaleString()}</b></td></tr>
      <tr><th>Total Payment</th><td>PKR ${totalPayment.toFixed(0).toLocaleString()}</td></tr>
      <tr><th>Total Interest</th><td>PKR ${totalInterest.toFixed(0).toLocaleString()}</td></tr>
    </table>
  `;
}
