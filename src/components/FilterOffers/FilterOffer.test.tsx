import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FilterOffer } from './FilterOffer';
import { SortName } from '../../types/types';

describe('FilterOffer', () => {
  it('should render correctly with current filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<FilterOffer currentSort={SortName.popular} onSortChange={mockOnFilterChange} />);

    const currentFilter = screen.getByText('Popular', { selector: '.places__sorting-type' });
    expect(currentFilter).toBeInTheDocument();

    const filterOptions = screen.getByRole('list', { hidden: true });
    expect(filterOptions).toHaveClass('places__options');
    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should toggle dropdown visibility when clicked', () => {
    const mockOnFilterChange = vi.fn();

    render(<FilterOffer currentSort={SortName.popular} onSortChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText('Popular', { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const filterOptions = screen.getByRole('list');
    expect(filterOptions).toHaveClass('places__options--opened');

    fireEvent.click(dropdownToggle);

    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should call onFilterChange with the selected filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<FilterOffer currentSort={SortName.popular} onSortChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText('Popular', { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const highToLowOption = screen.getByText('Price: high to low', { selector: '.places__option' });
    fireEvent.click(highToLowOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith(SortName.highToLow);
  });

  it('should highlight the active filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<FilterOffer currentSort={SortName.highToLow} onSortChange={mockOnFilterChange} />);

    const activeFilter = screen.getByText('Price: high to low', { selector: '.places__option--active' });
    expect(activeFilter).toBeInTheDocument();
  });
});
