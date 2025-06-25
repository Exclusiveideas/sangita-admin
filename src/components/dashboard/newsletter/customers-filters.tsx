import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import * as React from 'react';

// customers-filters.tsx
interface CustomersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function CustomersFilters({ searchTerm, onSearchChange }: CustomersFiltersProps): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        placeholder="Search customer"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
