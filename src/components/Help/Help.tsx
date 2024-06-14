import { useEffect, useState } from 'react';
import type { Help as HelpType, Section as SectionType } from '@/types/help';
import { LoadingMessage } from '../Elements/LoadingMessage';
import styles from './Help.module.css';
import { Table as TableCom } from '../Elements/Table';
import axios from 'axios';

type HelpProps = {
  config: HelpType;
  darkMode?: boolean;
};

export function Help({ config, darkMode }: HelpProps) {

  const [data, setData] = useState<HelpType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const resource = config.api || '';

    if (!resource) {
      const sections: SectionType[] = config.sections || [];
      setData({
        sections: sections
      });
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(resource, {
          signal: controller.signal
        });
        setData(response.data as HelpType);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [config]);

  return (
    <LoadingMessage darkMode={darkMode} loading={loading}>
      {data?.title && (
        <div className={styles.header}>
          <div className={styles.title}>
            {data.title}
          </div>
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