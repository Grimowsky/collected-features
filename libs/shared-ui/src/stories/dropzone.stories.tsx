import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropzoneProvider,
  DropzoneRoot,
  DropzoneInput,
  DropzoneText,
  DropzoneFileList,
  DropzoneWrapper,
} from "@/components/ui/dropzone";

const meta: Meta<typeof DropzoneProvider> = {
  title: "ui/file-upload",
  render: (args) => (
    <DropzoneProvider>
      <DropzoneWrapper>
        <DropzoneRoot>
          <DropzoneInput />
          <DropzoneText>Select or drag'n drop files to upload</DropzoneText>
        </DropzoneRoot>
      </DropzoneWrapper>
      <DropzoneFileList />
    </DropzoneProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof DropzoneProvider>;

export const Default: Story = {
  args: {},
};
