import React, { useRef, useState } from "react";
import { colors } from "../../colors";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import Snippet from "./Snippet";

export const DropDown = ({
  options,
  initHeight,
  parentClassName = "",
  parentStyle,
  holderStyle,
  optionOnClick = undefined,
  onClick = undefined,
  _selected = undefined,
  _setselected = undefined,
  selectedText,
  groups = [],
}) => {
    
  const [selected, setselected] = useState(groups.length === 0 ? 0 : {
    groupID:"date",
    index: 0
  });
  const [expand, setexpand] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => (expand ? setexpand(false) : undefined));
  const isSelected = (i,groupID) =>{
    if(groups.length === 0) return (typeof _selected === "boolean" ? _selected : selected) === i
    else {
        // console.log(selected, groupID, i)
        // console.log(i === selected.index,selected.groupID)
        return typeof _selected === "object" ? _selected.groupID?.toLowerCase() === groupID && i === _selected.index
        : selected.groupID?.toLowerCase() === groupID && i === selected.index
    }
  }
  return (
    <div
      style={{
        position: !parentStyle.position ? "relative" : undefined,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        onClick={() => setexpand(true)}
        style={{
          ...parentStyle,
          height: initHeight,
          overflow: "hidden",
          //   background: colors.blue,
          padding: 10,
          boxSizing:"border-box",
          color: colors.white,
          borderRadius: 5,
          borderBottomRightRadius: expand ? 0 : 5,
          borderBottomLeftRadius: expand ? 0 : 5
        }}
      >
          {
              selectedText
          }
      </div>
      <div
        ref={ref}
        style={{
          top: "100%",
          maxHeight: expand ? 150 : 0,
          visibility: expand ? "visible" : "hidden",
          opacity: expand ? 1 : 0,
          overflow: expand ? "scroll" : "hidden",
          overflowX: "hidden",
          transition: ".3s ease all",
          display: "flex",
          flexDirection: "column",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          ...parentStyle,
        }}
        className={parentClassName}
        onClick={() => {
          setexpand(!expand);
          if (typeof onClick === "function") onClick();
        }}
      >
        {groups.length > 0
          ? groups.map((a, i) => {
              return (
                <div style={{padding: 10,boxSizing:"border-box"}} key={i}>
                  <Snippet
                    bgColor={colors.gray+"80"}
                    color={colors.white}
                    text={a.name}
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                  />
                  <div>
                    {options
                      .filter((e) => a.id === e.groupID)
                      .map((e, i) => (
                        <div
                          key={i}
                          style={{
                            background: isSelected(i, a.id )
                              ? colors.blue+"80"
                              : i % 2 === 0
                              ? colors.black
                              : colors.gray + "90",
                            color: colors.white,
                            width: "100%",
                            padding: 8,
                            //   color: colors.white,
                            display: e.image ? "flex" : undefined,
                            justifyContent: e.image ? "space-around" : undefined,
                            ...holderStyle,
                          }}
                          onClick={() => {
                            if (!expand) return;
                            setexpand(false);
                            if (typeof optionOnClick === "function")
                              optionOnClick();
                            if (typeof _setselected === "function")
                              _setselected(!groups.length ? i : {
                                  groupID: a.id?.toLowerCase(),
                                  index: i
                              });
                            else setselected(!groups.length ? i : {
                                groupID: a.id?.toLowerCase(),
                                index: i
                            });
                          }}
                        >
                          {!e.image ? e.name : 
                            <>
                                <div
                                    style={{
                                        backgroundSize: "contain",
                                        backgroundRepeat:"no-repeat",
                                        backgroundPosition:"center",
                                        backgroundImage: `url(${e.image})`,
                                        height: initHeight/2,
                                        width: initHeight/2
                                    }}
                                />
                                <div>{e.name}</div>
                            </>
                          }
                        </div>
                      ))}
                  </div>
                </div>
              );
            })
          : null}
        {groups.length === 0
          ? options?.map((a, i) => (
              <div
                key={i}
                style={{
                  background: isSelected(i)
                    ? colors.blue
                    : i % 2 === 0
                    ? colors.black
                    : colors.gray + "30",
                  color: colors.white,
                  width: "100%",
                  //   color: colors.white,
                  ...holderStyle,
                }}
                onClick={() => {
                  if (!expand) return;
                  setexpand(false);
                  if (typeof optionOnClick === "function") optionOnClick();
                  if (typeof _setselected === "function") _setselected(i);
                  else setselected(i);
                }}
              >
                {a}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
