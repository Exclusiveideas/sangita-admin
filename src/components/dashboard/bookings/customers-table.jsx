'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';

import { useSelection } from '@/hooks/use-selection';


export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
}) {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Workshops</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Signed Up</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (<TableRow hover key={row.id} selected={isSelected}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onChange={(event) => {
                      if (event.target.checked) {
                        selectOne(row.id);
                      } else {
                        deselectOne(row.id);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Avatar src={row.avatar} />
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  {row.address.city}, {row.address.country}
                </TableCell>
                <TableCell>{row.zipCode || '—'}</TableCell>
                <TableCell>{row.organization || '—'}</TableCell>
                <TableCell>{row.website || '—'}</TableCell>
                <TableCell>{row.workshops || '—'}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', maxWidth: 200 }}>
                    {row.message || '—'}
                  </Typography>
                </TableCell>
                <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
              </TableRow>

              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
