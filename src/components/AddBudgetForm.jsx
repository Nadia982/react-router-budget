//react router dom imports
import { Form } from 'react-router-dom';

//library imports
import { CurrencyPoundIcon } from '@heroicons/react/24/solid';

const AddBudgetForm = () => {

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <Form
        method="post"
        className='grid-sm'> 
            <div className="grid-xs">
                <label htmlFor="newBudget" className="">Budget Name</label>
                <input type="text" name="newBudget" id="newBudget" placeholder='e.g. Groceries' required/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g. £150" required inputMode="decimal"/>
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button type="submit" className='btn btn--dark'>
                <span>Create budget</span>
                <CurrencyPoundIcon width={20}/>
            </button>
        </Form>
    </div>
  )
}

export default AddBudgetForm