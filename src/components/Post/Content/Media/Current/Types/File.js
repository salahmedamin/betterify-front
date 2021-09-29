// import { useEffect, useState } from "react";

export const File = ({ index, total, name, size }) => {
  const finalSize = {
    kb: size/1024,
    mb: size/1024/1024,
    gb: size/1024/1024/1024
  }
  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"
      }}
    >

      <div
        style={{
          width: "40%",
          height: "60%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/images/post/content/file.svg)`
        }}
      />
      <div style={{color: "white"}}>
        <span style={{
          maxWidth: 0, 
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{name?.split(".").filter((a,i)=>i<name?.split(".").length-1).join(".")}</span>.{name?.split(".")[name?.split(".").length-1]} - {
          finalSize.gb > 1 ? finalSize.gb.toFixed(2)+"GB"
          :
          finalSize.mb > 1 ? finalSize.mb.toFixed(2)+"MB"
          :
          finalSize.kb > 1 ? finalSize.kb.toFixed(2)+"KB"
          :
          size
        }
      </div>
    </div>
  );
};
