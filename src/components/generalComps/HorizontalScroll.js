import React from "react";

export const HorizontalScroll = React.forwardRef(
  (
    {
        style,
        className,
        maxWidth,
        overflowXScroll,
        overflowYScroll,
        children,
        ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          maxWidth: maxWidth,
          overflowX: !overflowXScroll ? "hidden" : "scroll",
          overflowY: !overflowYScroll ? "hidden" : "scroll",
          ...style,
        }}
        className={"hidescrollbar" + (className ? " " + className : "")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
