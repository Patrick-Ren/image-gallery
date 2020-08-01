import React from "react";

interface CheckMarkProps {
  selected: boolean;
}

const Checkmark: React.FC<CheckMarkProps> = ({ selected }) => (
  <div
    style={
      selected
        ? { left: 4, top: 4, position: "absolute", zIndex: 1 }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle: React.CSSProperties = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const containerStyle: React.CSSProperties = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

interface ImageSelectProps {
  src: string;
  width: number;
  height: number;
  style: React.CSSProperties;
  selected: boolean;
  onSelect: (src: string) => void;
}

const ImageSelect: React.FC<ImageSelectProps> = ({
  src,
  width,
  height,
  style,
  selected,
  onSelect,
}) => {
  //calculate x,y scale
  const sx = (100 - (30 / width) * 100) / 100;
  const sy = (100 - (30 / height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  return (
    <div
      style={{
        height: height,
        width: width,
        ...containerStyle,
        ...style,
      }}
      className={!selected ? "not-selected" : ""}
    >
      <Checkmark selected={selected ? true : false} />
      <img
        alt={src}
        src={src}
        width={width}
        height={height}
        style={
          selected
            ? {
                ...imgStyle,
                ...selectedImgStyle,
              }
            : { ...imgStyle }
        }
        onClick={() => {
          onSelect(src);
        }}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

export default ImageSelect;
