import React from 'react';
import { Box } from '@shared-ui/components/ui/box';
import {
  DropzoneInput,
  DropzoneProvider,
  DropzoneRoot,
  DropzoneText,
  DropzoneWrapper,
} from '@shared-ui/components/ui/dropzone';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { Button } from '@shared-ui/components/ui/button';
import { TrashIcon, FileIcon } from '@radix-ui/react-icons';
import { AspectRatio } from '@shared-ui/components/ui/aspect-ratio';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';

type FileListProps = {
  files: File[];
  removeFile: (f: File) => void;
};

function FileList(props: FileListProps) {
  const { files, removeFile } = props;
  return (
    <ul className={'mt-4'}>
      {files.length > 0 &&
        files.map((f) => (
          <BoxRow className={'gap-4 items-center'}>
            <li key={crypto.randomUUID()}>{f.name} </li>
            <Button
              variant="outline"
              size={'icon'}
              onClick={() => {
                removeFile(f);
              }}
            >
              <TrashIcon />
            </Button>
          </BoxRow>
        ))}
    </ul>
  );
}

export function UploadPage() {
  const [files, setFiles] = React.useState<File[]>([]);

  const onChange = (filesToAdd: File[]) => {
    setFiles([...files, ...filesToAdd]);
  };

  const removeFile = (fileToRemove: File) => {
    const filteredFiles = files.filter((f) => f.name !== fileToRemove.name);
    setFiles([...filteredFiles]);
  };
  return (
    <Box className={'flex justify-center items-center w-full h-screen'}>
      <BoxColumn>
        <DropzoneProvider options={{ onDrop: onChange }}>
          <Box className={'w-[500px]'}>
            <AspectRatio ratio={2}>
              <DropzoneWrapper
                className={'w-full h-full border-dashed rounded-xl'}
              >
                <DropzoneRoot>
                  <DropzoneInput
                    onChange={(e) => {
                      const filesToAdd = Array.from(e?.target?.files || []);
                      onChange(filesToAdd);
                    }}
                  />
                  <BoxColumn className={'items-center justify-center gap-8'}>
                    <FileIcon
                      width={45}
                      height={45}
                      className={'text-primary'}
                    />
                    <DropzoneText>Select or drag files to upload</DropzoneText>
                  </BoxColumn>
                </DropzoneRoot>
              </DropzoneWrapper>
            </AspectRatio>
          </Box>
        </DropzoneProvider>
        <FileList {...{ files, removeFile }} />
      </BoxColumn>
    </Box>
  );
}
