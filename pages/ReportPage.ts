import { PageObject } from './Page';

export default class ReportPage extends PageObject {
  readonly customIncomeCheckbox = this.page.getByRole('checkbox', { name: 'Custom income' });
  readonly incomeInput = this.page.getByRole('spinbutton', { name: 'Enter custom income Enter' });

  getReportFieldData = async (fieldName: 'Total income' | 'Taxes to pay' | 'Revenue' | 'Total gifted in lottery' | 'Orders made' | 'Prints done') => {
    return this.page.getByRole('cell', { name: fieldName }).locator('+td').innerText();
  };
};