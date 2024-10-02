import React from "react";
import { withForwardRef } from "@/lib/forwardRef";
import { cn } from "@/lib/utils";

type BoxRowProps = React.ComponentProps<"div">;

function BoxRow(props: BoxRowProps) {
  const { children } = props;

  return (
    <div {...props} className={cn("flex", props.className)}>
      {children}
    </div>
  );
}

const ForwardedBoxRow = withForwardRef<HTMLDivElement, BoxRowProps>(BoxRow);

export { ForwardedBoxRow as BoxRow };
