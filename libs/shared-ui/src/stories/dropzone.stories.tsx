import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropzoneProvider,
  DropzoneRoot,
  DropzoneInput,
  DropzoneText,
  DropzoneWrapper,
} from "@/components/ui/dropzone";
import { BoxRow } from "@/components/ui/box-row";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof DropzoneProvider> = {
  title: "ui/file-upload",
  render: (args) => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onChange = (filesToAdd: File[]) => {
      setFiles([...files, ...filesToAdd]);
    };

    const removeFile = (fileToRemove: File) => {
      const filteredFiles = files.filter((f) => f.name !== fileToRemove.name);
      setFiles([...filteredFiles]);
    };

    return (
      <DropzoneProvider options={{ onDrop: onChange }}>
        <DropzoneWrapper>
          <DropzoneRoot>
            <DropzoneInput
              onChange={(e) => {
                const filesToAdd = Array.from(e?.target?.files || []);
                onChange(filesToAdd);
              }}
            />
            <DropzoneText>Select or drag'n drop files to upload</DropzoneText>
          </DropzoneRoot>
        </DropzoneWrapper>
        <ul className={"mt-4"}>
          {files.length > 0 &&
            files.map((f) => (
              <BoxRow className={"gap-4 items-center"}>
                <li key={crypto.randomUUID()}>{f.name} </li>{" "}
                <Button
                  variant="outline"
                  size={"icon"}
                  onClick={() => {
                    removeFile(f);
                  }}
                >
                  <TrashIcon />
                </Button>
              </BoxRow>
            ))}
        </ul>
      </DropzoneProvider>
    );
  },
};

export default meta;

type Story = StoryObj<typeof DropzoneProvider>;

export const Default: Story = {
  args: {},
};
