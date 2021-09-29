import { useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import { Loading } from "../../../Loading";
import Tooltip from "../../generalComps/Tooltip";

export const Round = ({
  loading,
  className,
  disabled,
  parentStyle,
  pic: {
    isModeSensitive,
    url: { activePic, inactivePic, defaultPic } = {},
    height,
    width,
  } = {},
  activeSwitchable,
  isActive,
  text: { text_default, text_active, text_inactive } = {},
  color,
  total,
  style,
  tooltip: {
    value: {
      tooltip_default,
      tooltip_active,
      tooltip_inactive,
      tooltip_loading,
    } = {},
  } = {},
}) => {
  const mode = useSelector((state) => state.mode);
  const [active, setactive] = useState(isActive);
  const [hover, sethover] = useState(false);
  return (
    <div
      onMouseOver={() => sethover(true)}
      onMouseOut={() => sethover(false)}
      onClick={async () => {
        if (disabled) return null;
        const sleep = (ms) => {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        };
        sethover(false);
        if (activeSwitchable && !loading && typeof text !== "string") {
          sleep(1000).then(() => {
            setactive(!active);
          });
        }
      }}
      className={
        "position-relative d-flex flex-column align-items-center justify-content-center " +
        className
      }
      style={parentStyle}
    >
      {tooltip_default ||
      tooltip_active ||
      tooltip_inactive ||
      tooltip_loading ? (
        <Tooltip
          bottom={"4px"}
          centerX={true}
          text={
            tooltip_default
              ? tooltip_default
              : active
              ? tooltip_active
              : tooltip_inactive
          }
          showCondition={hover && !disabled && !loading}
          style={{
            border: "1px solid " + colors.gray,
            color: colors.white,
          }}
        />
      ) : null}
      <div
        className={"d-flex align-items-center justify-content-center"}
        style={{
          width: 55,
          height: 55,
          backgroundColor: !active ? "transparent" : color,
          border: `2px solid ${active || loading ? "transparent" : color}`,
          borderRadius: "50%",
          position: "relative",
          transition: ".3s ease all",
          cursor: "pointer",
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
        onMouseOver={() => (!loading && !disabled ? sethover(true) : null)}
        onMouseOut={() => (!loading && !disabled ? sethover(false) : null)}
      >
        <div
          style={{
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(/images/post/topbar/${
              defaultPic
                ? `${
                    isModeSensitive
                      ? defaultPic + "_" + mode + ".svg"
                      : defaultPic + ".svg"
                  }`
                : active
                ? isModeSensitive
                  ? activePic + "_" + mode + ".svg"
                  : activePic + ".svg"
                : isModeSensitive
                ? inactivePic + "_" + mode + ".svg"
                : inactivePic + ".svg"
            })`,
            transition: ".3s ease all",
            height,
            width,
          }}
        >
          {loading ? (
            <Loading
              style={{
                backDropFilter: "blur(5px)",
                left: 0,
                top: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 20,
                backgroundColor: colors.gray+"80",
              }}
              spinnerStyle={{
                width: 20,
                height: 20,
              }}
              spinnerColor={colors.white}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
