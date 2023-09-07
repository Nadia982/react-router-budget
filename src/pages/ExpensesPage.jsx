//react router dom imports
import { useLoaderData } from "react-router-dom";

//helpers
import { deleteItem, fetchData } from "./../helpers";

//component imports
import Table from './../components/Table';

//library imports
import { toast } from "react-toastify";

//loader
export async function expensesLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function expensesAction({request}){
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <span class="p">({expenses.length} total)</span>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
