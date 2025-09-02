// (client component) will contain our column definitions.
import logo from '/wxt.svg';

import { HandshakeJobDataType, jobStatusEmojis } from '@/utils/db/schema';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<HandshakeJobDataType>[] = [
  {
    accessorKey: 'companyLogoUrl',
    header: '',
    cell: ({ row }) => {
      const imgUrl = row.original.companyLogoUrl ?? logo;
      return <img src={imgUrl} alt={imgUrl} width='25' height='25' />;
    },
  },
  {
    accessorKey: 'companyName',
    header: 'Company',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string;

      return (
        <a
          href={row.original.link}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-700'
        >
          {title}
        </a>
      );
    },
  },
  {
    accessorKey: 'employmentType',
    header: 'Employment',
  },
  {
    accessorKey: 'payrate',
    header: 'Pay',
    cell: ({
      row: {
        original: { payrate },
      },
    }) =>
      payrate
        ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(payrate / 100)
        : 'n/a',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({
      row: {
        original: { status },
      },
    }) => jobStatusEmojis[status],
  },
];
