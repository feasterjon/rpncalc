import { useEffect, useState } from 'react';
import type { Help as HelpType, Section as SectionType } from '@/types/help';
import { LoadingMessage } from '../ui/LoadingMessage';
import { storage } from '../../utils/storage';
import styles from './Help.module.css';
import { Table as TableCom } from '../ui/Table';
import axios from 'axios';

type HelpProps = {
  config: HelpType;
  darkMode?: boolean;
};

export function Help({ config, darkMode }: HelpProps) {

  const [data, setData] = useState<HelpType | null>(null);
  const [loading, setLoading] = useState(true);

  if (config.storage?.prefix) storage.prefix = config.storage?.prefix;

  useEffect(() => {

    const resource = config.api || '';

    const setStorageHelp = () => {
      const storageHelp = storage.getItem('help');
      if (storageHelp && typeof storageHelp === 'object' && !Array.isArray(storageHelp)) {
        setData(storageHelp);
        setLoading(false);
      }
    };

    if (!resource) {
      const sections: SectionType[] = config.sections || [];
      setData({
        sections: sections
      });
      setLoading(false);
      return;
    }

    if (!navigator.onLine) {
      setStorageHelp();
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(resource, {
          signal: controller.signal
        });
        const dataAttributes: HelpType = response.data.attributes;
        if (dataAttributes) {
          setData(dataAttributes);
          storage.setItem('help', dataAttributes);
          setLoading(false);
        }
        else {
          setStorageHelp();
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching data:', error);
        }
        setStorageHelp();
      }
    };

    fetchData();
    return () => controller.abort();
  }, [config]);

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