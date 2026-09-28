'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { updateInquiryStatus } from '@/actions/inquiries';
import { CONTACT_INQUIRY_STATUSES, CONTACT_INQUIRY_STATUS_LABELS } from '@/lib/constants';
import type { IContactInquiry, ContactInquiryStatus } from '@/types';

interface InquiriesListProps {
  data: { items: IContactInquiry[]; page: number; totalPages: number };
  searchParams: Record<string, string>;
}

export function InquiriesList({ data, searchParams }: InquiriesListProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<IContactInquiry | null>(null);
  const [status, setStatus] = useState<ContactInquiryStatus>('new');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const openDetail = (inquiry: IContactInquiry) => {
    setSelected(inquiry);
    setStatus(inquiry.status);
    setNotes(inquiry.adminNotes ?? '');
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const result = await updateInquiryStatus(String(selected._id), status, notes);
    setSaving(false);

    if (result.success) {
      toast.success('Inquiry updated');
      setSelected(null);
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update');
    }
  };

  return (
    <div className="space-y-4">
      <form className="flex gap-2">
        <input name="search" defaultValue={searchParams.search} placeholder="Search inquiries..." className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
        <select name="status" defaultValue={searchParams.status} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {CONTACT_INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{CONTACT_INQUIRY_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white">Filter</button>
      </form>

      <DataTable<IContactInquiry>
        data={data.items}
        keyExtractor={(row) => String(row._id)}
        onRowClick={openDetail}
        pagination={{ page: data.page, totalPages: data.totalPages, basePath: '/admin/inquiries', searchParams }}
        columns={[
          { key: 'name', header: 'Name', cell: (row) => row.name },
          { key: 'email', header: 'Email', cell: (row) => row.email },
          { key: 'subject', header: 'Subject', cell: (row) => row.subject ?? '—' },
          { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
          { key: 'date', header: 'Date', cell: (row) => new Date(row.createdAt).toLocaleDateString('en-CA') },
        ]}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-[#241920]">{selected.name}</h3>
            <p className="text-sm text-gray-500">{selected.email}</p>
            {selected.phone && <p className="text-sm text-gray-500">{selected.phone}</p>}
            {selected.subject && (
              <p className="mt-3 text-sm font-medium">Subject: {selected.subject}</p>
            )}
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">{selected.message}</p>

            <div className="mt-6 space-y-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContactInquiryStatus)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                {CONTACT_INQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>{CONTACT_INQUIRY_STATUS_LABELS[s]}</option>
                ))}
              </select>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Admin notes..."
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
