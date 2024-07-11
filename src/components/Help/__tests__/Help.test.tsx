import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { mockLocalStorage } from '../../../__mocks__/localStorage';
import { setNavigatorOnline } from '../../../__mocks__/navigator';
import { Help } from '../Help';
import axios from 'axios';

const mockLocalStorageData = {
  footer: 'Saved Help Footer',
  logo: {
    alt: 'Saved My Logo',
    src: 'images/saved-logo.png',
    width: 80
  },
  sections: [
    {
      data: [
        { id: 1, data: 'Saved Article 1' },
        { id: 2, data: 'Saved Article 2' }
      ],
      heading: 'Saved Section 1',
      id: 1
    },
    {
      data: [
        {
          data: {
            data: [
              {
                data: [
                  'Saved Data 1',
                  'Saved Data 2'
                ],
                id: 1
              },
              {
                data: [
                  'Saved Data 3',
                  'Saved Data 4'
                ],
                id: 2
              }
            ],
            headings: [
              {
                id: 1,
                name: 'Saved Heading 1'
              },
              {
                id: 2,
                name: 'Saved Heading 2'
              }
            ],
            type: 'c'
          }
        }
      ],
      heading: 'Saved Section 2',
      id: 2
    }
  ],
  title: 'Saved Help Title'
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage()
});

const setMockLocalStorageData = () => {
  localStorage.setItem('help', JSON.stringify(mockLocalStorageData));
};

vi.mock('axios');

const mockConfig = {
  attributes: {
    footer: 'Help Footer',
    logo: {
      alt: 'My Logo',
      src: 'images/logo.png',
      width: 50
    },
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

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  setNavigatorOnline(true);
});

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

      const logo = screen.getByAltText('My Logo');

      expect(logo).toHaveAttribute('src', 'images/logo.png');
      expect(logo).toHaveStyle({ width: '50%' });
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

  test('It fetches data and saves it with given config', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockConfig });

    render(<Help config={{ api: '/help', sections: [] }} />);

    await waitFor(() => {
      const storageHelp = localStorage.getItem('help');
      const savedHelp = storageHelp ? JSON.parse(storageHelp) : {};
      expect(savedHelp.footer).toBe('Help Footer');
      expect(savedHelp.footer).toBe('Help Footer');
      expect(savedHelp.title).toBe('Help Title');
      expect(savedHelp.logo.alt).toBe('My Logo');
      expect(savedHelp.sections[0].heading).toBe('Section 1');
      expect(savedHelp.sections[0].data[0].data).toBe('Article 1');
    });
  });

  test('It renders loading message when offline and no saved data', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockConfig });
    setNavigatorOnline(false);

    render(<Help config={{ api: '/help', sections: [] }} />);

    await waitFor(() => {
      expect(screen.getByTestId('loading-message')).toBeInTheDocument();
      expect(screen.queryByText(mockLocalStorageData.title)).toBeNull();
      expect(screen.queryByText('Section')).toBeNull();
    });
  });

  test('It renders correctly when offline and with saved data', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockConfig });
    setMockLocalStorageData();
    setNavigatorOnline(false);

    render(<Help config={{ api: '/help', sections: [] }} />);

    await waitFor(() => {

      const logo = screen.getByAltText('Saved My Logo');

      expect(logo).toHaveAttribute('src', 'images/saved-logo.png');
      expect(logo).toHaveStyle({ width: '80%' });
      expect(screen.getByText(mockLocalStorageData.title)).toBeInTheDocument();
      expect(screen.getByText('Saved Section 1')).toBeInTheDocument();
      expect(screen.getByText('Saved Article 1')).toBeInTheDocument();
      expect(screen.getByText('Saved Data 1')).toBeInTheDocument();
      expect(screen.getByText('Saved Heading 2')).toBeInTheDocument();
      expect(screen.getByText('Saved Section 2')).toBeInTheDocument();
      expect(screen.getByText('Saved Article 2')).toBeInTheDocument();
      expect(screen.getByText(mockLocalStorageData.footer)).toBeInTheDocument();
    });
  });
});
