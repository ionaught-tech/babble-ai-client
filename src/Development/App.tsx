import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { ChatBox } from "../ChatBox";

const App = () => {
  const [selectedColor, setSelectedColor] = useState("hsl(217, 54%, 0%)");
  const [theme, setTheme] = useState(true);

  return (
    <div>
      <div
        style={{
          width: "400px",
          height: "500px",
          margin: "50px auto",
        }}
      >
        <ChatBox
          id="67e4de4ced2cb8956cea1fc9"
          theme={theme ? "light" : "dark"}
          primaryColor={selectedColor}
          themeName="light"
          disclaimerUrl=""
          liveAgent={{
            status: false,
            type: 1,
            dataCollectEnabled: false,
          }}
          freeTier={true}
        />
      </div>
      <ColorPicker setColor={setSelectedColor} color={selectedColor} />

      <input
        type="checkbox"
        checked={theme}
        onChange={() => setTheme(!theme)}
      />
    </div>
  );
};

export default App;
