"use client"

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import * as React from 'react';

import { fetchAllBookingsAPI } from "@/apiClient/bookingsAPI";
import { CustomersFilters } from '@/components/dashboard/bookings/customers-filters';
import { CustomersTable } from '@/components/dashboard/bookings/customers-table';
import { downloadCSV } from "@/helpers/booking";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// export const metadata = { title: `Bookings | Dashboard | Prostrategic-H` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');


  const [bookings, setBookings] = useState<any[]>([]);

  const mappedRows = bookings.map((b) => ({
    id: b._id,
    avatar: '/assets/avatar-placeholder.png',
    name: `${b.firstName} ${b.lastName}`,
    email: b.email,
    phone: b.phoneNumber,
    address: {
      city: b.city,
      country: b.country,
      state: '',
      street: '',
    },
    organization: b.organization,
    website: b.website,
    workshops: b.workshops,
    message: b.message,
    zipCode: b.zipCode,
    createdAt: new Date(b.createdAt),
  }));



  const filteredRows = mappedRows.filter((row) => {
    const search = searchTerm.toLowerCase();
    return (
      row.name?.toLowerCase().includes(search) ||
      row.email?.toLowerCase().includes(search) ||
      row.phone?.toLowerCase().includes(search) ||
      row.address?.city.toLowerCase().includes(search) ||
      row.address?.country.toLowerCase().includes(search) ||
      row.zipCode?.toLowerCase().includes(search)
    );
  });

  const paginatedCustomers = applyPagination(filteredRows, page, rowsPerPage);

const handleExportClick = () => {
  const exportData = filteredRows.map((row) => ({
    Name: row.name,
    Email: row.email,
    Phone: row.phone,
    City: row.address.city,
    Country: row.address.country,
    ZipCode: row.zipCode,
    Organization: row.organization,
    Website: row.website,
    Workshops: row.workshops,
    Message: row.message,
    CreatedAt: row.createdAt.toISOString(),
  }));

  downloadCSV(exportData, 'bookings.csv');
};



  useEffect(() => {
    const fetchBookings = async () => {
      const sendResponse = await fetchAllBookingsAPI();

      // console.log('response: ', sendResponse)

      if (sendResponse?.error) {
        toast.error(sendResponse?.error, {
          style: { border: "none", color: "red" },
        });
        return;
      }

      setBookings(sendResponse); // assumes sendResponse is the array
    };

    fetchBookings();
  }, []);



  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Booking Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {/* <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button> */}
            <Button
              color="inherit"
              startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
              onClick={handleExportClick}
            >
              Export
            </Button>
          </Stack>
        </Stack>
        {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> */}
      </Stack>
      <CustomersFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(0); // Reset to first page when searching
        }}
      />
      <CustomersTable
        count={bookings.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset to first page
        }}
      />
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): any[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
