import styles from './Table.module.css';

type Record = {
  data: string[];
  id: number;
}

type Heading = {
  id: number;
  name: string;
}

type Config = {
  data: Record[];
  headings: Heading[];
  type?: string;
  width?: number;
}

type TableProps = {
  data: Config;
}

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
        {data.data.map((record) =>
          <tr key={`table-${record.id}`}>
            {record.data.map((item, index) =>
              <td key={`record-${index}`} style={{width: `${widthCells}`}}>{item}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}