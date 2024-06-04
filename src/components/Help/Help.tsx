import type { Help as HelpType } from '@/types/help';
import styles from './Help.module.css';
import { Table as TableCom } from '../Elements/Table';

type HelpProps = {
  config: HelpType;
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