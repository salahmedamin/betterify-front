// import { useEffect, useState } from "react";

export const Image = ({ current, index, total }) => {
//     const [image, setimage] = useState(null)
//   useEffect(() => {
//     (async () => {
//       const urlCreator = window.URL || window.webkitURL;
//       await fetch(`http://localhost:5000/media/${current}`)
//         .then(async (e) => e.blob())
//         .then((blob) => {
//           const imageUrl = urlCreator.createObjectURL(blob);
//           setimage(imageUrl);
//         });
//     })();
//   }, [current]);

  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        position: "relative",
      }}
    >

      <div
        style={{
          transition: ".4s ease all",
          width: "100%",
          height: "100%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(http://localhost:5000/media/${current})`
        }}
        alt="A description to help people"
      />
    </div>
  );
};
