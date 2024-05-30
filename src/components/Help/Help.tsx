import styles from './Help.module.css';
import { type Help } from '@/types/help';
import { Table as TableCom } from '../Elements/Table';

type HelpProps = {
  config: Help;
};

export function Help({ config }: HelpProps) {

  return (
    <>
      {config.sections.map((section) =>
        <div key={`section-${section.id}`}>
          {section.heading && (
            <div className={styles.heading}>{section.heading}</div>
          )}
          {section.data.map((article, index) =>
            <div key={`article-${index}`}>
              {typeof article.data === 'string' ?
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