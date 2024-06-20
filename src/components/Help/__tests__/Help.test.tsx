import { vi, describe, expect, test, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Help } from '../Help';
import axios from 'axios';

vi.mock('axios');

const mockConfig = {
  attributes: {
    footer: 'Help Footer',
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
    ],
    title: 'Help Title'
  },
  id: '1',
  meta: {
    name: 'Help Test',
    update: '2024-06-14'
  },
  type: 'help'
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('Help Component', () => {

  test('It renders loading message initially', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockConfig });

    render(<Help config={{ api: '/help', sections: [] }} />);

    const loadingMessageElement = screen.queryByTestId('loading-message');

    await waitFor(() => {
      expect(loadingMessageElement).toBeInTheDocument();
    });
  });

  test('It fetches data and renders correctly with given config', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockConfig });

    render(<Help config={{ api: '/help', sections: [] }} />);

    await waitFor(() => {
      expect(screen.getByText(mockConfig.attributes.title)).toBeInTheDocument();
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Data 1')).toBeInTheDocument();
      expect(screen.getByText('Data 3')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
      expect(screen.getByText(mockConfig.attributes.footer)).toBeInTheDocument();
    });
  });
});
