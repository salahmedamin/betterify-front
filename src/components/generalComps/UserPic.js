import { useColors } from "../../colors";
import { toggleFavorite } from "../../dispatches/users/toggleFavorite";
import { toggleFollow } from "../../dispatches/users/toggleFollow";
import { useHover } from "../../hooks/useHover";
import Snippet from "./Snippet";

export const UserPic = ({
  username,
  picStyle = {},
  className = undefined,
  name = "",
  picture,
  isFavorite,
  showLowerBar = true,
  followedByViewer = false,
  onClick = null,
  showName = true,
  isOwner = false,
  isComment = false,
  style,
  hover = false,
  id,
  ...props
}) => {
  const [ref, isHovered] = useHover();
  const colors = useColors();
  return (
    <>
      <div
        ref={ref}
        className={
          (className ? className + " " : "") +
          `d-flex ${
            isComment
              ? ""
              : " flex-column align-items-center justify-content-center"
          } `
        }
        style={{
          cursor: "pointer",
          transition: ".5s ease all",
          maxWidth: 200,
          transform: "translateX(-1px)",
          zIndex: 100,
          background: hover
            ? isHovered
              ? colors.gray + "40"
              : undefined
            : undefined,
          padding: hover ? 10 : undefined,
          ...style,
        }}
        onClick={onClick}
        {...props}
      >
        <div
          //picture
          style={{
            minWidth: 50,
            minHeight: 50,
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(${picture})`,
            ...picStyle,
          }}
        />
        <div
          //name
          className="d-flex flex-column align-items-center"
          style={{
            color: colors.white,
            maxWidth: 138,
            transition: ".4s ease all",
            marginTop: 5,
          }}
        >
          {showName ? (
            <div
              style={{
                fontWeight: "bold",
                fontSize: 13,
                maxWidth: 110,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          ) : null}
          <div
            style={{
              fontWeight: "lighter",
              fontSize: 12,
              maxWidth: 110,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            @{username}
          </div>
        </div>
      </div>
      {!isOwner && showLowerBar ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          {[
            {
              pic: "following",
              status: followedByViewer,
              tooltip: {
                active: "Unfollow",
                inactive: "Follow",
                pending: "Cancel Request",
              },
              onClick: () => toggleFollow({ id }),
            },
            {
              pic: "favorite",
              status: isFavorite,
              condition: followedByViewer,
              tooltip: {
                active: "Unfavorise",
                inactive: "Favorise",
              },
              onClick: () => toggleFavorite({ id }),
            },
            {
              pic: "report",
              status: undefined,
              tooltip: "Report",
            },
          ].map((a, i) =>
            [true, undefined].includes(a.condition) ? (
              <Snippet
                key={i}
                cb={a.onClick}
                image={{
                  path: `/images/post/topbar/${a.pic}${
                    a.status === undefined
                      ? ""
                      : typeof a.status === "boolean"
                      ? !a.status
                        ? "_inactive"
                        : "_active"
                      : "_pending"
                  }.svg`,
                  height: 17,
                  width: 25,
                  imgStyle: {
                    margin: 0,
                  },
                }}
                style={{
                  width: "100%",
                  height: 20,
                  padding: 0,
                }}
                tooltip={{
                  value:
                    typeof a.tooltip === "object"
                      ? a.tooltip[
                          typeof a.status === "boolean"
                            ? a.status
                              ? "active"
                              : "inactive"
                            : "pending"
                        ]
                      : a.tooltip,
                  bottom: "5px",
                  right: typeof a.status === "string" ? "-55px" : undefined,
                  tooltip_style: {
                    color: colors.white,
                    fontSize: 10,
                    border: undefined,
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
};
