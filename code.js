function updateFillBar() {
  let spent = document.getElementById("moneySpent").textContent;
  let budget = document.getElementById("budget").textContent;

  let dollarIndexSpent = spent.indexOf("$");
  let amountSpent = Number(spent.slice(dollarIndexSpent + 1));

  let dollarIndexBudget = budget.indexOf("$");
  let amountBudget = Number(budget.slice(dollarIndexBudget + 1));

  const fillBar = document.getElementById("fillBar");
  const percent = (amountSpent / amountBudget) * 100;
  fillBar.style.width = `${percent}%`;
}

function goToExpandTransactions() {
    window.location.href = "transactions.html";
}

function goToSettings(){
  
}
