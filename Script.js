 function calcLoan(type){
  alert("calcLoan called with type: " + type);

  let amount = parseFloat(document.getElementById(type+'Amount').value);
  let rate = parseFloat(document.getElementById(type+'Rate').value)/100/12;
  let years = parseFloat(document.getElementById(type+'Years').value)*12;

  alert("Inputs -> Amount: " + amount + " | Rate: " + rate + " | Years: " + years);

  if(isNaN(amount) || isNaN(rate) || isNaN(years)) {
    alert("❌ Invalid inputs! Please check your values.");
    return;
  }

  let emi = amount * rate * Math.pow(1+rate, years) / (Math.pow(1+rate, years)-1);

  alert("✅ EMI Calculated: " + emi);

  document.getElementById(type+'Result').innerHTML =
    `<p><b>Monthly EMI:</b> PKR ${emi.toFixed(2)}</p>`;
}

function resetForm(id){
  alert("Resetting form: " + id);
  document.getElementById(id).reset();
  document.querySelector('#'+id+' div').innerHTML="";
}

function compareLoans(){
  alert("compareLoans function called");
  let rateA=parseFloat(document.getElementById('rateA').value)/100/12;
  let rateB=parseFloat(document.getElementById('rateB').value)/100/12;
  let amount=parseFloat(document.getElementById('compAmount').value);
  let months=parseFloat(document.getElementById('compYears').value)*12;

  alert("Inputs -> A: " + rateA + " | B: " + rateB + " | Amount: " + amount + " | Months: " + months);

  let emiA=amount*rateA*Math.pow(1+rateA,months)/(Math.pow(1+rateA,months)-1);
  let emiB=amount*rateB*Math.pow(1+rateB,months)/(Math.pow(1+rateB,months)-1);

  alert("Results -> Bank A EMI: " + emiA + " | Bank B EMI: " + emiB);

  document.getElementById('compareResult').innerHTML =
    `<p>Bank A EMI: PKR ${emiA.toFixed(2)}<br>Bank B EMI: PKR ${emiB.toFixed(2)}</p>`;
}





