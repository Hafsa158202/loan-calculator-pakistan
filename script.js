// Script.js — All calculators (safe, robust) — paste entire file and save as Script.js
(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    console.log('Script.js loaded — loan calculators ready');

    // Expose functions to global so existing inline onclick="..." still works
    window.showTab = showTab;
    window.calcLoan = calcLoan;
    window.resetForm = resetForm;
    window.compareLoans = compareLoans;
    window.calcInterest = calcInterest;
    window.calcMurabaha = calcMurabaha;
    window.calcMusharakah = calcMusharakah;

    // Make first tab active if none is active
    if(!document.querySelector('.tab-btn.active')){
      const firstBtn = document.querySelector('.tab-btn');
      if(firstBtn) firstBtn.classList.add('active');
    }
  });

  function showTab(tab){
    // hide all forms
    const forms = document.querySelectorAll('.loan-form,.comparison-form,.interest-form,.murabaha-form,.musharakah-form');
    forms.forEach(f => f.classList.remove('active'));
    // deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const map = {
      car: 'carForm',
      home: 'homeForm',
      personal: 'personalForm',
      compare: 'compareForm',
      interest: 'interestForm',
      murabaha: 'murabahaForm',
      musharakah: 'musharakahForm'
    };
    if(map[tab]){
      const target = document.getElementById(map[tab]);
      if(target) target.classList.add('active');
    }
    // set clicked button active — inline onclick may not pass event, so use document.activeElement fallback
    const clicked = document.activeElement;
    if(clicked && clicked.classList && clicked.classList.contains('tab-btn')){
      clicked.classList.add('active');
    }
  }

  // helper: format numbers
  function fmt(n,dec=2){ return Number(n).toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec}); }

  // Reset form and clear results inside it
  function resetForm(id){
    const form = document.getElementById(id);
    if(!form) return;
    form.reset();
    form.querySelectorAll('div').forEach(d => d.innerHTML = '');
  }

  // Generic loan EMI calculator for types: car, home, personal
  function calcLoan(type){
    const amountEl = document.getElementById(type + 'Amount');
    const rateEl = document.getElementById(type + 'Rate');
    const yearsEl = document.getElementById(type + 'Years');
    const out = document.getElementById(type + 'Result');

    if(!amountEl || !rateEl || !yearsEl || !out){ console.error('Missing elements for', type); return; }

    const amount = parseFloat(amountEl.value);
    const annualRate = parseFloat(rateEl.value);
    const years = parseFloat(yearsEl.value);

    if(isNaN(amount) || isNaN(annualRate) || isNaN(years) || amount <= 0 || years <= 0){
      alert('Please enter valid positive numbers for amount and tenure.');
      return;
    }

    const months = Math.round(years * 12);
    const monthlyRate = annualRate / 100 / 12;
    let emi;
    if(monthlyRate === 0){
      emi = amount / months;
    } else {
      emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;

    out.innerHTML = `<table class="summary-table">
      <tr><th>Loan Amount</th><td>PKR ${fmt(amount,0)}</td></tr>
      <tr><th>Interest Rate (annual)</th><td>${annualRate}%</td></tr>
      <tr><th>Duration</th><td>${years} years (${months} months)</td></tr>
      <tr><th>Monthly EMI</th><td><b>PKR ${fmt(emi,2)}</b></td></tr>
      <tr><th>Total Payment</th><td>PKR ${fmt(totalPayment,0)}</td></tr>
      <tr><th>Total Interest</th><td>PKR ${fmt(totalInterest,0)}</td></tr>
    </table>`;
  }

  // Compare two banks
  function compareLoans(){
    const rateA = parseFloat(document.getElementById('rateA').value);
    const rateB = parseFloat(document.getElementById('rateB').value);
    const amount = parseFloat(document.getElementById('compAmount').value);
    const years = parseFloat(document.getElementById('compYears').value);

    if(isNaN(rateA)||isNaN(rateB)||isNaN(amount)||isNaN(years)|| amount <=0 || years <=0){
      alert('Please fill all comparison fields with valid numbers.');
      return;
    }

    const months = Math.round(years * 12);
    const emiA = calcEMI(amount, rateA, months);
    const emiB = calcEMI(amount, rateB, months);

    document.getElementById('compareResult').innerHTML = `<p>Bank A EMI: <b>PKR ${fmt(emiA,2)}</b><br>Bank B EMI: <b>PKR ${fmt(emiB,2)}</b></p>`;
  }

  // Flat vs Reducing
  function calcInterest(){
    const amount = parseFloat(document.getElementById('intAmount').value);
    const rate = parseFloat(document.getElementById('intRate').value);
    const years = parseFloat(document.getElementById('intYears').value);

    if(isNaN(amount)||isNaN(rate)||isNaN(years)|| amount <=0 || years <=0){
      alert('Please fill all fields.');
      return;
    }

    const flat = (amount + amount * (rate/100) * years) / (years * 12);
    const months = Math.round(years * 12);
    const reducing = calcEMI(amount, rate, months);

    document.getElementById('intResult').innerHTML = `<p>Flat EMI: PKR ${fmt(flat,2)}<br>Reducing EMI: PKR ${fmt(reducing,2)}</p>`;
  }

  // Murabaha
  function calcMurabaha(){
    const price = parseFloat(document.getElementById('murabahaPrice').value);
    const profit = parseFloat(document.getElementById('murabahaRate').value);
    const years = parseFloat(document.getElementById('murabahaYears').value);

    if(isNaN(price)||isNaN(profit)||isNaN(years)|| price <=0 || years <=0){
      alert('Please fill all fields.');
      return;
    }

    const total = price + price * (profit/100) * years;
    const emi = total / (years * 12);

    document.getElementById('murabahaResult').innerHTML = `<p>Total Payable: PKR ${fmt(total,0)}<br>Monthly Installment: <b>PKR ${fmt(emi,2)}</b></p>`;
  }

  // Musharakah
  function calcMusharakah(){
    const price = parseFloat(document.getElementById('musharakahPrice').value);
    const share = parseFloat(document.getElementById('musharakahShare').value);
    const rent = parseFloat(document.getElementById('musharakahRent').value);
    const years = parseFloat(document.getElementById('musharakahYears').value);

    if(isNaN(price)||isNaN(share)||isNaN(rent)||isNaN(years)|| price <=0 || years <=0){
      alert('Please fill all fields.');
      return;
    }

    const bankShare = price * (share/100);
    const monthlyRent = (bankShare * (rent/100)) / 12;
    const total = monthlyRent * years * 12 + bankShare;

    document.getElementById('musharakahResult').innerHTML = `<p>Total Payable: PKR ${fmt(total,0)}<br>Monthly Rent + Equity: <b>PKR ${fmt(total/(years*12),2)}</b></p>`;
  }

  // helper to compute EMI given annual rate percent and months
  function calcEMI(amount, annualRatePercent, months){
    const r = (annualRatePercent/100) / 12;
    if(r === 0) return amount / months;
    return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }

})(); // end IIFE

