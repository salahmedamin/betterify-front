import { useEffect } from "react";

export const useOnClickOutside = (ref, handler)=>{
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref || ref.current?.contains(event.target)) {
            return
          }
          handler(event)
        };
        document.addEventListener("click", listener)
        return () => {
          document.removeEventListener("click", listener)
        }
      },
      [ref, handler]
    )
  }