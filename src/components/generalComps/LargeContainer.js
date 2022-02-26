import React from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export default React.forwardRef(
  (
    {
      children,
      className,
      type, // h/v (horizontal/vertical)
      click,
      outsideClick,
      ...props
    },
    ref
  ) => {
    useOnClickOutside(ref,()=>outsideClick && typeof outsideClick === "function" ? outsideClick() : null)
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
