import styles from './Table.module.css';
import type { Table } from '@/types/table';

type TableProps = {
  data: Table;
};

export function Table({ data }: TableProps) {

  const width = data.width || 100,
    widthCells = data.headings?.length ? `${Math.floor(100 / data.headings.length)}%` : '100;';

  const type = data.type ? `table${data.type.toUpperCase()}` : '';


  return (
    <table className={`${styles.table} ${type ? styles[type] : ''} ${styles.vars}`} style={{width: `${width}%`}}>
      <thead>
        <tr>
          {data.headings.map((heading) => 
            <th key={`heading-${heading.id}`} style={{width: `${widthCells}`}}>{heading.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.data.map((row) =>
          <tr key={`table-${row.id}`}>
            {row.data.map((item, index) =>
              <td key={`row-data-${index}`} style={{width: `${widthCells}`}}>{item}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}