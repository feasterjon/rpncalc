import styles from './index.module.css';
import { Table as TableCom } from './table';

export function Help(props) {

  const config = props.config || {};

  return (
    <>
      {config.sections.map((section) =>
        <div key={`section-${section.id}`}>
          {section.heading && (
            <div className={styles.heading}>{section.heading}</div>
          )}
          {section.data.map((article) =>
            <div key={`article-${article.id}`}>
              {article.type === 'text' ?
                <p>{article.data}</p>
              :
                <TableCom data={article.data} />
              }
            </div>
          )}
        </div>
      )}
    </>
  );
}