import React from "react";
import { useDropzone, DropzoneState, DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils";

type DropzoneContextState = DropzoneState;

const DropzoneContext = React.createContext({} as DropzoneContextState);

const useDropzoneContext = () => {
  const ctx = React.useContext(DropzoneContext);

  if (!ctx) {
    throw new Error("No dropzone context provided");
  }

  return ctx;
};

type DropzoneProviderProps = {
  options?: DropzoneOptions;
  children: React.ReactNode;
};

function DropzoneProvider(props: DropzoneProviderProps) {
  const { options, children } = props;

  return (
    <DropzoneContext.Provider value={{ ...useDropzone({ ...options }) }}>
      <>{children}</>
    </DropzoneContext.Provider>
  );
}

type DropzoneWrapperProps = React.ComponentProps<"div">;

function DropzoneWrapper(props: DropzoneWrapperProps) {
  const { children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center align-middle items-center rounded-md",
        props.className,
      )}
    >
      {children}
    </div>
  );
}

type DropzoneRootProps = React.ComponentProps<"div">;

function DropzoneRoot(props: DropzoneRootProps) {
  const { children, ...restProps } = props;
  const { getRootProps } = useDropzoneContext();

  return (
    <div
      {...getRootProps()}
      {...restProps}
      className={cn("p-6", props.className)}
    >
      {children}
    </div>
  );
}

type DropzoneInputProps = React.ComponentProps<"input">;

function DropzoneInput(props: DropzoneInputProps) {
  const { getInputProps } = useDropzoneContext();

  return (
    <input
      {...getInputProps()}
      {...props}
      type="file"
      className={cn("", props.className)}
    />
  );
}

type DropzoneTextProps = React.ComponentProps<"p">;

function DropzoneText(props: DropzoneTextProps) {
  const { children } = props;
  return (
    <p {...props} className={cn("", props.className)}>
      {children}
    </p>
  );
}

type DropzoneFileListProps = React.ComponentProps<"ul">;

function DropzoneFileList(props: DropzoneFileListProps) {
  const { children } = props;
  return (
    <ul {...props} className={cn("", props.className)}>
      {children}
    </ul>
  );
}

type DropzoneListItemProps = React.ComponentProps<"li">;

function DropzoneListItems(props: DropzoneListItemProps) {
  const { acceptedFiles } = useDropzoneContext();

  const files = acceptedFiles.map((f) => <li key={f.path}>{f.name}</li>);

  return <>{files}</>;
}

export {
  DropzoneProvider,
  DropzoneWrapper,
  DropzoneRoot,
  DropzoneInput,
  DropzoneText,
  DropzoneFileList,
  DropzoneListItems,
};
