import { backendURL } from './config';

interface FilesListResponse {
  files: {
    name: string;
    mimeType: string;
    extension: string;
    uploadDate: string;
  }[];
}

export async function fileList(): Promise<FilesListResponse> {
  const res = await fetch(`${backendURL}/files`, {
    method: 'GET',
  });

  return res.json();
}
