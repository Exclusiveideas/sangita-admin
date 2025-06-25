"use client";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import * as React from 'react';

import { fetchAllNewsletterAPI } from "@/apiClient/newsletterAPI";
import { CustomersFilters } from '@/components/dashboard/newsletter/customers-filters';
import { CustomersTable } from '@/components/dashboard/newsletter/customers-table';
import { downloadCSV } from "@/helpers/booking"; // Reuse the same CSV utility
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// export const metadata = { title: `Newsletter | Dashboard | Prostrategic-H` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const [subscribers, setSubscribers] = useState<any[]>([]);

  const mappedRows = subscribers.map((s) => ({
    id: s._id,
    email: s.email,
    createdAt: new Date(s.subscribedAt),
  }));

  const filteredRows = mappedRows.filter((row) => {
    const search = searchTerm.toLowerCase();
    return (
      row.email.toLowerCase().includes(search)
    );
  });

  const paginatedCustomers = applyPagination(filteredRows, page, rowsPerPage);

  const handleExportClick = () => {
    const exportData = filteredRows.map((row) => ({
      Email: row.email,
      SubscribedAt: row.createdAt.toISOString(),
    }));

    downloadCSV(exportData, 'newsletter-subscribers.csv');
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      const sendResponse = await fetchAllNewsletterAPI();

      if (sendResponse?.error) {
        toast.error(sendResponse?.error, {
          style: { border: "none", color: "red" },
        });
        return;
      }

      console.log('respo: ', sendResponse)
      setSubscribers(sendResponse);
    };

    fetchSubscribers();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Newsletter Subscribers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
              onClick={handleExportClick}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <CustomersFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(0);
        }}
      />

      <CustomersTable
        count={subscribers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): any[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
