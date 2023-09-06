//wait between 0 and 800 milliseconds (used for the submit button)
export const wait = () => new Promise((res) => setTimeout(res, Math.random() * 800))

//generate random color 
export const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 35%`
}

//Local storage functions
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//create budget 
export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, 
        color: generateRandomColor()    
    }
        const existingBudgets = fetchData("budgets") ?? [];
        return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

//delete item from local storage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter(item => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//create an expense 
export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, 
        budgetId: budgetId,    
    }
        const existingExpenses = fetchData("expenses") ?? [];
        return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        //check if expense ID matches the budget ID. 
        if(expense.budgetId !== budgetId) return acc;
        //add the current amount to my total
        return acc += expense.amount;

    }, 0)
    return budgetSpent;
}

//Get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter(item => item[key] === value);
}

//FORMATTING

//Format date
export const formatDate = (epoch) => new Date(epoch).toLocaleDateString();

//Format percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent", 
        minimumFractionDigits: 0, 
    })
}

//Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString("en-GB", {
        style: "currency", 
        currency: "GBP"
    });
}

