import { JobSelectType, payTypeList } from '@/utils/db/schema';

const shortPayTable: { [K in (typeof payTypeList)[number]]: string } = {
  'Hourly Wage': 'hr',
  'Annual Salary': 'yr',
  'Monthly Stipend': 'mo',
};

export function PayRate({
  payrate,
  payType,
}: Pick<JobSelectType, 'payrate' | 'payType'>) {
  {
    if (!payrate) return 'N/A';

    const pay = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(payrate / 100);

    return `${pay}${payType && shortPayTable?.[payType] ? `/${shortPayTable[payType]}` : ''}`;
  }
}
