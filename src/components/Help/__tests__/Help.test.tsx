import { render, screen } from '@testing-library/react';
import { Help } from '../Help';

const mockConfig = {
  sections: [
    {
      data: [
        { id: 1, data: 'Article 1' },
        { id: 2, data: 'Article 2' }
      ],
      heading: 'Section 1',
      id: 1
    },
    {
      data: [
        {
          data: {
            data: [
              {
                data: [
                  'Data 1',
                  'Data 2'
                ],
                id: 1
              },
              {
                data: [
                  'Data 3',
                  'Data 4'
                ],
                id: 2
              }
            ],
            headings: [
              {
                id: 1,
                name: 'Heading 1'
              },
              {
                id: 2,
                name: 'Heading 2'
              }
            ],
            type: 'c'
          }
        }
      ],
      heading: 'Section 2',
      id: 2
    }
  ]
};

describe('Help Component', () => {
  test('It renders correctly with given config', () => {
    render(<Help config={mockConfig} />);

    // Assert that each section heading and article is rendered
    mockConfig.sections.forEach(section => {
      if (section.heading) {
        expect(screen.getByText(section.heading)).toBeInTheDocument();
      }
      section.data.forEach(article => {
        if (typeof article.data === 'string') {
          expect(screen.getByText(article.data)).toBeInTheDocument();
        }
        else {
          article.data.headings.forEach(heading => {
            expect(screen.getByText(heading.name)).toBeInTheDocument();
          });
          article.data.data.forEach(row => {
            row.data.forEach(cell => {
              expect(screen.getByText(cell)).toBeInTheDocument();
            });
          });
        }
      });
    });
  });
});
