import React from "react";
import { useDropzone, DropzoneState, DropzoneOptions } from "react-dropzone";

type DropzoneContextState = DropzoneState;

const DropzoneContext = React.createContext({} as DropzoneContextState);

const useDropzoneContext = () => {
  const ctx = React.useContext(DropzoneContext);

  if (!ctx) {
    throw new Error("No dropzone context provided");
  }

  return ctx;
};

type DropzoneProviderProps = React.ComponentProps<"div"> & {
  options?: DropzoneOptions;
};

function DropzoneProvider(props: DropzoneProviderProps) {
  const { children } = props;

  return (
    <DropzoneContext.Provider value={{ ...useDropzone() }}>
      <div>{children}</div>
    </DropzoneContext.Provider>
  );
}

type DropzoneWrapperProps = React.ComponentProps<"div">;

function DropzoneWrapper(props: DropzoneWrapperProps) {
  const { children } = props;

  return (
    <div
      className={
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center align-middle rounded-md"
      }
    >
      {children}
    </div>
  );
}

type DropzoneRootProps = React.ComponentProps<"div">;

function DropzoneRoot(props: DropzoneRootProps) {
  const { children } = props;
  const { getRootProps } = useDropzoneContext();

  return (
    <div {...getRootProps()} className={"p-6"}>
      {children}
    </div>
  );
}

type DropzoneInputProps = React.ComponentProps<"input">;

function DropzoneInput(props: DropzoneInputProps) {
  const { getInputProps } = useDropzoneContext();
  return <input {...getInputProps()} />;
}

type DropzoneTextProps = React.ComponentProps<"p">;

function DropzoneText(props: DropzoneTextProps) {
  const { children } = props;
  return <p {...props}>{children}</p>;
}

type DropzoneFileListProps = React.ComponentProps<"ul">;

function DropzoneFileList(props: DropzoneFileListProps) {
  const { acceptedFiles } = useDropzoneContext();

  const files = acceptedFiles.map((f) => <li key={f.path}>{f.name}</li>);

  return <ul {...props}> {files}</ul>;
}

export {
  DropzoneProvider,
  DropzoneWrapper,
  DropzoneRoot,
  DropzoneInput,
  DropzoneText,
  DropzoneFileList,
};
