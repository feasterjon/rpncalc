import { render, screen } from '@testing-library/react';
import { Table } from '../Table';

const mockData = {
  width: 100,
  headings: [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Age' },
    { id: 3, name: 'Country' }
  ],
  data: [
    { id: 1, data: ['Clare', '30', 'USA'] },
    { id: 2, data: ['David', '25', 'Germany'] },
    { id: 3, data: ['Nick', '35', 'UK'] },
    { id: 4, data: ['Richard', '20', 'Switzerland'] },
    { id: 5, data: ['Roger', '40', 'Japan'] }
  ],
  type: 'b'
};

describe('Table Component', () => {
  test('renders table with correct data', () => {
    render(<Table data={mockData} />);

    // Assert table is rendered
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Assert table class is assigned
    expect(screen.getByRole('table')).toHaveClass('tableB');

    // Assert headings are rendered
    const headingCells = screen.getAllByRole('columnheader');
    expect(headingCells).toHaveLength(mockData.headings.length);
    expect(headingCells[0]).toHaveTextContent('Name');
    expect(headingCells[1]).toHaveTextContent('Age');
    expect(headingCells[2]).toHaveTextContent('Country');

    // Assert data rows are rendered
    const dataRows = screen.getAllByRole('row');
    expect(dataRows).toHaveLength(mockData.data.length + 1); // +1 for the header row

    // Assert data cells are rendered
    const dataCells = screen.getAllByRole('cell');
    expect(dataCells).toHaveLength(mockData.headings.length * mockData.data.length); // Total data cells in the table
    expect(dataCells[0]).toHaveTextContent('Clare');
    expect(dataCells[1]).toHaveTextContent('30');
    expect(dataCells[2]).toHaveTextContent('USA');
  });
});
