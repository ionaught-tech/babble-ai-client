import { useState } from "react";
import { SketchPicker } from "react-color";

interface PropsTypes {
  setColor: (arg0: string) => void;
  color: string;
}

const ColorPicker = ({ setColor }: PropsTypes) => {
  const [colorPickerColor, setColorPickerColor] = useState("");

  const handleColorChange = (ColorResult: {
    hex: string;
    hsl: { s: number; h: number; l: number };
  }) => {
    const { hsl } = ColorResult;
    const { h, s, l } = hsl;

    const hslString = `hsl(${parseInt(h + "")}, ${parseInt(
      s * 100 + "",
    )}%, ${parseInt(l * 100 + "")}%)`;
    setColorPickerColor(ColorResult.hex);
    setColor(hslString);
  };

  return (
    <div style={{ position: "absolute", top: "0", left: "0" }}>
      <SketchPicker color={colorPickerColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
