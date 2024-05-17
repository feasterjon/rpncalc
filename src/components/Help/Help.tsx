import styles from './Help.module.css';
import { Table as TableCom } from '../Elements/Table';

type Record = {
  data: string[];
  id: number;
}

type Heading = {
  id: number;
  name: string;
}

type Table = {
  data: Record[];
  headings: Heading[];
  type?: string;
  width?: number;
}

type Article = {
  data: string | Table;
}

type Section = {
  data: Article[];
  heading?: string;
  id: number;
}

type Config = {
  footer: string;
  sections: Section[];
  title: string;
}

type HelpProps = {
  config: Config;
}

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