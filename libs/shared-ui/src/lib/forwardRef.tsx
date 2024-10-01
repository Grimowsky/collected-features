import React from "react";

function withForwardRef<T, P>(Component: React.ComponentType<P>) {
  return React.forwardRef<T, P>((props, ref) => {
    return <Component {...(props as P)} ref={ref} />;
  });
}

export { withForwardRef };
