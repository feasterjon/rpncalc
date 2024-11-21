import type { Help as HelpType } from '@/types/help';
import { LoadingMessage } from '../ui/LoadingMessage';
import styles from './Help.module.css';
import { Table as TableCom } from '../ui/Table';

type HelpProps = {
  config?: HelpType;
  darkMode?: boolean;
};

export function Help({ config, darkMode }: HelpProps) {

  let loading = true;

  const data = config?.data?.attributes;

  if (typeof data === 'object') loading = false;

  return (
    <LoadingMessage darkMode={darkMode} loading={loading}>
      {(data?.title || data?.logo?.src) && (
        <div className={styles.header}>
          {data?.logo && (
            <div className={styles.logo}>
              <img
                alt={data.logo.alt}
                loading="lazy"
                src={data.logo.src}
                style={{
                  width: data.logo.width ? `${data.logo.width}%` : `100%`
                }}
              />
            </div>
          )}
          {data?.title && (
            <div className={`
              ${styles.title}
              ${data?.logo?.src ? styles.spaceLeft : ''}
            `}>
              {data.title}
            </div>
          )}
        </div>
      )}
      {data?.sections?.map((section) =>
        <div key={`section-${section.id}`}>
          {section.heading && (
            <div className={styles.heading}>{section.heading}</div>
          )}
          {section.data?.map((article, index) =>
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
      {data?.footer && (
        <div className={styles.footer}>
          <div className={styles.content}>{data.footer}</div>
        </div>
      )}
    </LoadingMessage>
  );
}