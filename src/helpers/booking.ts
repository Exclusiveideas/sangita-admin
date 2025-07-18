export function downloadCSV(data: any[], filename: string = 'export.csv') {
  if (!data.length) return;

  const header = Object.keys(data[0]).join(',');
  const rows = data.map(row =>
    Object.values(row)
      .map(value => `"${String(value).replace(/"/g, '""')}"`) // Escape quotes
      .join(',')
  );

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
