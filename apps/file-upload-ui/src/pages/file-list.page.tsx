import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fileList } from '../api/file-list';

export function FileList() {
  const { data } = useQuery({ queryKey: ['file-list'], queryFn: fileList });

  console.log('@@', data);
  return <div> hello </div>;
}
