//react router dom imports
import { Link, useLoaderData } from "react-router-dom";

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "./../components/AddBudgetForm";
import AddExpenseForm from "./../components/AddExpenseForm";
import BudgetItem from "./../components/BudgetItem";
import Table from "./../components/Table";

//library imports
import { toast } from "react-toastify";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }
  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });

      return toast.success(
        `${
          values.newBudget.charAt(0).toUpperCase() + values.newBudget.slice(1)
        } budget created`
      );
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  
  if (_action === "createExpense") {
    createExpense({
      name: values.newExpense,
      amount: values.newExpenseAmount,
      budgetId: values.newExpenseBudget,
    });
    try {
      //create an expense
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    deleteItem({
      key: "expenses",
      id: values.expenseId
    });
    try {
      //create an expense
      return toast.success(`Expense deleted`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <div className="flex-lg">
                      <h2>Recent Expenses</h2>
                      {expenses.length > 8 && (
                        <Link to="expenses" className="btn btn--dark inline">
                          View all expenses
                        </Link>
                      )}
                    </div>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the key to financial freedom.</p>
                <p>Create a budget to get started.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
