/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Load transactions from localStorage or start with an empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction
function addTransaction(event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const note = document.getElementById("note").value;

  if (!amount || !category || !date) {
    alert("Please fill all required fields.");
    return;
  }

  const transaction = {
    amount: parseFloat(amount),
    type,
    category,
    date,
    note
  };

  transactions.push(transaction);
  saveTransactions();
  document.getElementById("transaction-form").reset();
  showTransactions();
}

// Display all transactions on the page
function showTransactions() {
  const list = document.getElementById("transaction-list");
  if (!list) return;

  list.innerHTML = "";
  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.date} | ₹${t.amount} | ${t.type} | ${t.category} ${t.note ? "- " + t.note : ""}`;
    list.appendChild(li);
  });
}

// Show summary (on summary.html)
function showSummary() {
  if (!document.getElementById("summary")) return;

  let income = 0, expense = 0;
  transactions.forEach((t) => {
    if (t.type === "Income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("total-income").textContent = income;
  document.getElementById("total-expense").textContent = expense;
  document.getElementById("balance").textContent = income - expense;
}

// Setup event listeners after page loads
window.onload = function () {
  const form = document.getElementById("transaction-form");
  if (form) {
    form.addEventListener("submit", addTransaction);
    showTransactions();
  }

  showSummary();
};
