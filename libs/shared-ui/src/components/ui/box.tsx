import React from "react";
import { withForwardRef } from "@/lib/forwardRef";

type BoxProps = React.ComponentProps<"div">;

function Box(props: BoxProps) {
  const { children } = props;

  return <div {...props}>{children}</div>;
}

const ForwardedBox = withForwardRef<HTMLDivElement, BoxProps>(Box);

export { ForwardedBox as Box };
