import React from "react";

export default React.forwardRef(
  (
    {
      children,
      className,
      type, // h/v (horizontal/vertical)
      click,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`d-flex${type === "v" ? " flex-column" : ""} ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
