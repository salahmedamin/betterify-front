import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../colors";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const EnlargeOnEvent = React.forwardRef(
  (
    {
      style,
      useOnWidth = false,
      useOnHeight = false,
      event: { click = false, hover = false } = {},
      cb = undefined,
      children,
      allowOverflowOnEnlarge=false,
      setvalue=undefined,
      value=undefined,
      shrinkOnClickOutside=false
    },
    {
      ref1, //parent
      ref2  //element to be visible when no expand
    }={}
  ) => {
    const ref = useRef()
    const [enlarge, setenlarge] = useState(false);
    const [_ref_width, set_ref_width] = useState(undefined)
    const [_ref_height, set_ref_height] = useState(undefined)
    const [noMoreWidth, setnoMoreWidth] = useState(undefined)
    const [noMoreHeight, setnoMoreHeight] = useState(undefined)
    
    useOnClickOutside(ref,()=>shrinkOnClickOutside ? setenlarge(false) : undefined)

    useEffect(() => {
      if(typeof setvalue === "function") setvalue(enlarge)
    }, [enlarge, setvalue])

    useEffect(() => {
      if(value!==undefined) setenlarge(value)
    }, [value])

    useEffect(() => {
      if(ref2?.current){
        setnoMoreWidth(ref2?.current?.getBoundingClientRect().width)
        setnoMoreHeight(ref2?.current?.getBoundingClientRect().height)
      }
    }, [ref2])

    useEffect(() => {
      const listen = ()=>setenlarge(!enlarge)
      if(ref2?.current && click){
        ref2?.current?.addEventListener("click", listen)
      }
      if(ref1?.current){
        set_ref_height(ref1?.current?.getBoundingClientRect().height)
        set_ref_width(ref1?.current?.getBoundingClientRect().width)
    }
    const copyRef2 = ref2?.current
      return () => {
        if(click) copyRef2?.removeEventListener("click", listen)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref1,ref2, enlarge])

    return (
      <div
        ref={ref}
        style={{
          transition: ".3s ease all",
          maxWidth: useOnWidth ? (value===false ? noMoreWidth : !enlarge ? noMoreWidth : _ref_width) : undefined,
          maxHeight: useOnHeight ? (value === false ? noMoreHeight : !enlarge ? noMoreHeight : _ref_height) : undefined,
          width: useOnWidth ? (value===false ? "auto" : !enlarge ? "auto" : _ref_width) :undefined,
          height: useOnHeight ? (value===false ? "auto" : !enlarge ? "auto" : _ref_height) : undefined,
          overflow: allowOverflowOnEnlarge && (value===true || enlarge) ? "visible" : "hidden",
          position: style?.position ?? "relative",
          background: (value===true || enlarge) ? colors.gray+"40" : style?.background,
          boxSizing: "content-box",
          ...style,
        }}
        onClick={
          click
            ? () => {
                if(typeof cb === "function") cb();
              }
            : undefined
        }
        onMouseOver={
          hover
            ? () => {
                setenlarge(true);
                if(typeof cb === "function") cb();
              }
            : undefined
        }
        onMouseOut={
          hover
            ? () => {
                setenlarge(false);
              }
            : undefined
        }
      >
        {children}
      </div>
    );
  }
);
