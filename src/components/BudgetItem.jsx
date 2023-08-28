//helper functions
import { formatCurrency, formatPercentage } from './../helpers';
import { calculateSpentByBudget } from './../helpers';

const BudgetItem = ({ budget }) => {
  const { id, amount, name, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} budgeted</p>
      </div>
      <progress max={amount} min="0" value={spent}>
        {formatPercentage(spent/amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount-spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
