import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fileList } from '../api/file-list';
import { Card } from '@shared-ui/components/ui/card';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { Box } from '@shared-ui/components/ui/box';

function formatUploadDate(uploadDate: string) {
  return new Date(uploadDate).toISOString().slice(0, 16).replace('T', ':');
}

function trimFileName(name: string, size: number): string {
  const [fileName, ...extParts] = name.split('.');
  const extension = extParts.join('.');
  return fileName.length > size
    ? `${fileName.slice(0, size)}...${extension}`
    : name;
}
``;

export function FileList() {
  const { data } = useQuery({ queryKey: ['file-list'], queryFn: fileList });
  const files = data?.files;

  if (!files) {
    return <div> no files</div>;
  }
  return (
    <Box className={'w-full h-screen flex justify-center py-10'}>
      <BoxColumn className={'w-1/2 h-full gap-4'}>
        {files.map((f) => (
          <Card className={'w-full min-h-32'}>
            <BoxRow className={'p-6 gap-2 w-full h-full items-center'}>
              <Box className={'w-3/4'}>{trimFileName(f.name, 55)}</Box>
              <Box>{formatUploadDate(f.uploadDate)}</Box>
            </BoxRow>
          </Card>
        ))}
      </BoxColumn>
    </Box>
  );
}
