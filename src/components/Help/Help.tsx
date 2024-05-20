import styles from './Help.module.css';
import { Table as TableCom } from '../Elements/Table';

type Article = {
  data: string | Table;
};

type Config = {
  footer: string;
  sections: Section[];
  title: string;
};

type Heading = {
  id: number;
  name: string;
};

type HelpProps = {
  config: Config;
};

type Row = {
  data: string[];
  id: number;
};

type Section = {
  data: Article[];
  heading?: string;
  id: number;
};

type Table = {
  data: Row[];
  headings: Heading[];
  type?: string;
  width?: number;
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