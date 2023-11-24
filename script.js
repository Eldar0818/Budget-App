let budgetsInStorage = JSON.parse(localStorage.getItem('budgets')) || []

let addForm = document.getElementById('add-form')
let bType = document.getElementById('b-type')
let bName = document.getElementById('b-name')
let bAmount = document.getElementById('b-amount')
let bDate = document.getElementById('b-date')
let bList = document.getElementById('budgets-list')
let income = document.getElementById('income')
let expanse = document.getElementById('expanse')
let balance = document.getElementById('balance')
let clearAllBtn = document.getElementById('clear-all-btn')

function getAllValues() {
    let allIncome = budgetsInStorage.filter(budget=> budget.budget_type == "Income")
    let allExpanse = budgetsInStorage.filter(budget=> budget.budget_type == "Spending")
    let totalIncome = allIncome.reduce((sum, acc) => sum + parseInt(acc.budget_amount), 0)
    let totalExpanse = allExpanse.reduce((sum, acc) => sum + parseInt(acc.budget_amount), 0)
    let totalBalance = totalIncome - totalExpanse
    income.innerText = `${totalIncome} SEK`
    expanse.innerText = `${totalExpanse} SEK`
    balance.innerText = `${totalBalance} SEK`
}

function handleFormSubmit(e) {
    e.preventDefault()
    let rNum = Math.floor(Math.random())
    let bId = Math.floor(Math.random() * (10 + rNum))
    let data = {
        budget_id: bId + Math.random(),
        budget_type: bType.value,
        budget_name: bName.value,
        budget_amount: bAmount.value,
        budget_date: bDate.value
    }

    if(bType.value == "-" || bName.value == "" || bAmount.value == "" || bDate.value == ""){
        alert('Please fill all fields!')
    }else{
        budgetsInStorage.push(data)
        localStorage.setItem('budgets', JSON.stringify(budgetsInStorage))
        displayAllBudgets()
        getAllValues()
        bType.value = "-"
        bName.value = ""
        bAmount.value = ""
        bDate.value = ""
    }
}

function removeBudget(id) {
    let newList = budgetsInStorage.filter(budget => budget.budget_id != id)
    localStorage.setItem('budgets', JSON.stringify(newList))
    window.location.reload()
}

function clearAllBudgets() {
    localStorage.clear()
    window.location.reload()
}

function displayAllBudgets() {
    bList.innerHTML = ''
    if(budgetsInStorage.length > 0){
        budgetsInStorage.forEach(budget => {
            let dirctionOne = " from"
            let dirctionTwo = " on"
            let output = `
            <div class="list-item">
                <p>We have ${budget.budget_type === "Income" ? budget.budget_type + dirctionOne : budget.budget_type + dirctionTwo} ${budget.budget_name} about ${budget.budget_amount} kr, Date: ${budget.budget_date}</p>
                <button 
                    class="remove-btn"
                    onclick="removeBudget('${budget.budget_id}')"
                >
                    Remove
                </button>
            </div>
            `
            bList.innerHTML += output
        })
    }else{
        bList.innerHTML = '<p class="no-item-text">There is no any budget has been made yet...</p>'
    }
    return
}

addForm.addEventListener('submit', handleFormSubmit)
clearAllBtn.addEventListener('click', clearAllBudgets)

displayAllBudgets()
getAllValues()