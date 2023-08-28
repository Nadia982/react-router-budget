//helper functions
import { formatCurrency } from './../helpers';

const BudgetItem = ({ budget }) => {
  const { id, amount, name, color } = budget;
  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} budgeted</p>
      </div>
      <progress max={amount} value="100">
        {/* percentage */}
      </progress>
      <div className="progress-text">
        <small>...spent</small>
        <small>...remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
