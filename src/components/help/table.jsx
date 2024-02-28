import styles from './table.module.css';

export function Table(props) {

  const width = props.data.width || '100%',
    widthCells = props.data.headings?.length ? `${Math.floor(100 / props.data.headings.length)}%` : '100;';

  const type = props.data.type ? `table${props.data.type.toUpperCase()}` : '';

  return (
    <table className={`${styles.table} ${type && styles[type]}`} style={{width: `${width}`}}>
      <thead>
        <tr>
          {props.data.headings.map((heading) => 
            <th key={`heading-${heading.id}`} style={{width: `${widthCells}`}}>{heading.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.data.data.map((record) =>
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