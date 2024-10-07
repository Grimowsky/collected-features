import { useMutation } from '@tanstack/react-query';
import { backendURL } from './config';

async function fileUpload(file: File) {
  const fileFormData = new FormData();
  fileFormData.append('file', file);
  const response = await fetch(`${backendURL}/upload/file`, {
    method: 'POST',
    body: fileFormData,
  });

  const data = await response.json();

  return { status: response.status, data };
}

export function useFileUpload() {
  return useMutation({
    mutationFn: fileUpload,
  });
}
