'use client';

import { useTransition } from 'react';
import { deleteBrand } from '@/actions/brands';

export default function DeleteBrandButton({ id }: { id: string }) {
  const [, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm('Delete this brand?')) return;

    const formData = new FormData();
    formData.append('id', id);

    startTransition(() => {
      deleteBrand(formData);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-red-600 hover:underline font-medium"
    >
      Delete
    </button>
  );
}
