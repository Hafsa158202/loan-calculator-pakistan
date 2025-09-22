  document.addEventListener('DOMContentLoaded', function () {
  alert("✅ Script.js loaded successfully!");

  function showTab(tab, event) {
    alert("Switching to tab: " + tab);
    document.querySelectorAll('.loan-form,.comparison-form,.interest-form,.murabaha-form,.musharakah-form')
      .forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (tab === 'car') document.getElementById('carForm').classList.add('active');
    if (tab === 'home') document.getElementById('homeForm').classList.add('active');
    if (tab === 'personal') document.getElementById('personalForm').classList.add('active');
    if (tab === 'compare') document.getElementById('compareForm').classList.add('active');
    if (tab === 'interest') document.getElementById('interestForm').classList.add('active');
    if (tab === 'murabaha') document.getElementById('murabahaForm').classList.add('active');
    if (tab === 'musharakah') document.getElementById('musharakahForm').classList.add('active');
    if (event) event.target.classList.add('active');
  }
  window.showTab = showTab;

  function calcLoan(type) {
    alert("Calculating " + type + " loan...");
    let amount = parseFloat(document.getElementById(type + 'Amount').value);
    let rate = parseFloat(document.getElementById(type + 'Rate').value) / 100 / 12;
    let years = parseFloat(document.getElementById(type + 'Years').value) * 12;
    if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
      alert("⚠️ Missing input values!");
      return;
    }
    let emi = amount * rate * Math.pow(1 + rate, years) / (Math.pow(1 + rate, years) - 1);
    document.getElementById(type + 'Result').innerHTML =
      `<p><b>Monthly EMI:</b> PKR ${emi.toFixed(2)}</p>`;
    alert("✅ EMI calculated: " + emi.toFixed(2));
  }
  window.calcLoan = calcLoan;

  function resetForm(id) {
    alert("Resetting form: " + id);
    document.getElementById(id).reset();
    let div = document.querySelector('#' + id + ' div');
    if (div) div.innerHTML = "";
  }
  window.resetForm = resetForm;

  function compareLoans() {
    alert("Comparing Bank A vs Bank B...");
    let rateA = parseFloat(document.getElementById('rateA').value) / 100 / 12;
    let rateB = parseFloat(document.getElementById('rateB').value) / 100 / 12;
    let amount = parseFloat(document.getElementById('compAmount').value);
    let months = parseFloat(document.getElementById('compYears').value) * 12;
    if (isNaN(rateA) || isNaN(rateB) || isNaN(amount) || isNaN(months)) {
      alert("⚠️ Missing input values!");
      return;
    }
    let emiA = amount * rateA * Math.pow(1 + rateA, months) / (Math.pow(1 + rateA, months) - 1);
    let emiB = amount * rateB * Math.pow(1 + rateB, months) / (Math.pow(1 + rateB, months) - 1);
    document.getElementById('compareResult').innerHTML =
      `<p>Bank A EMI: PKR ${emiA.toFixed(2)}<br>Bank B EMI: PKR ${emiB.toFixed(2)}</p>`;
    alert("✅ Comparison done!");
  }
  window.compareLoans = compareLoans;

  function calcInterest() {
    alert("Calculating Flat vs Reducing...");
    let amount = parseFloat(document.getElementById('intAmount').value);
    let rate = parseFloat(document.getElementById('intRate').value) / 100;
    let years = parseFloat(document.getElementById('intYears').value);
    if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
      alert("⚠️ Missing input values!");
      return;
    }
    let flat = (amount + amount * rate * years) / (years * 12);
    let r = rate / 12, n = years * 12;
    let reducing = amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('intResult').innerHTML =
      `<p>Flat EMI: PKR ${flat.toFixed(2)}<br>Reducing EMI: PKR ${reducing.toFixed(2)}</p>`;
    alert("✅ Interest calculated!");
  }
  window.calcInterest = calcInterest;

  function calcMurabaha() {
    alert("Calculating Murabaha...");
    let price = parseFloat(document.getElementById('murabahaPrice').value);
    let profit = parseFloat(document.getElementById('murabahaRate').value) / 100;
    let years = parseFloat(document.getElementById('murabahaYears').value);
    if (isNaN(price) || isNaN(profit) || isNaN(years)) {
      alert("⚠️ Missing input values!");
      return;
    }
    let total = price + price * profit * years;
    let emi = total / (years * 12);
    document.getElementById('murabahaResult').innerHTML =
      `<p>Total Payable: PKR ${total.toFixed(2)}<br>Monthly Installment: PKR ${emi.toFixed(2)}</p>`;
    alert("✅ Murabaha calculated!");
  }
  window.calcMurabaha = calcMurabaha;

  function calcMusharakah() {
    alert("Calculating Musharakah...");
    let price = parseFloat(document.getElementById('musharakahPrice').value);
    let share = parseFloat(document.getElementById('musharakahShare').value) / 100;
    let rent = parseFloat(document.getElementById('musharakahRent').value) / 100;
    let years = parseFloat(document.getElementById('musharakahYears').value);
    if (isNaN(price) || isNaN(share) || isNaN(rent) || isNaN(years)) {
      alert("⚠️ Missing input values!");
      return;
    }
    let bankShare = price * share;
    let monthlyRent = bankShare * rent / 12;
    let total = monthlyRent * years * 12 + bankShare;
    document.getElementById('musharakahResult').innerHTML =
      `<p>Total Payable: PKR ${total.toFixed(2)}<br>Monthly Rent+Equity: PKR ${(total / (years * 12)).toFixed(2)}</p>`;
    alert("✅ Musharakah calculated!");
  }
  window.calcMusharakah = calcMusharakah;
});



