import React from "react";
import { withForwardRef } from "@/lib/forwardRef";
import { cn } from "@/lib/utils";

type BoxColumnProps = React.ComponentProps<"div">;

function BoxColumn(props: BoxColumnProps) {
  const { children } = props;

  return (
    <div {...props} className={cn("flex flex-col", props.className)}>
      {children}
    </div>
  );
}

const ForwardedBoxColumn = withForwardRef<HTMLDivElement, BoxColumnProps>(
  BoxColumn,
);

export { ForwardedBoxColumn as BoxColumn };
