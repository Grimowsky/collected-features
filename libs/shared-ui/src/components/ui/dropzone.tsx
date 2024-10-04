import React from "react";
import { useDropzone, DropzoneState } from "react-dropzone";

type DropzoneContextState = DropzoneState;

const DropzoneContext = React.createContext({} as DropzoneContextState);

const useDropzoneContext = () => {
  const ctx = React.useContext(DropzoneContext);

  if (!ctx) {
    throw new Error("No dropzone context provided");
  }

  return ctx;
};

type DropzoneProviderProps = React.ComponentProps<"section">;

function DropzoneProvider(props: DropzoneProviderProps) {
  const { children } = props;

  return (
    <DropzoneContext.Provider value={{ ...useDropzone() }}>
      <section
        className={
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md flex justify-center align-middle"
        }
      >
        {children}
      </section>
    </DropzoneContext.Provider>
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

export { DropzoneProvider, DropzoneRoot, DropzoneInput, DropzoneText };
