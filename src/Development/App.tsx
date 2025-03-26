import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { ChatBox } from "../ChatBox";
import apiUrl, { socketUrl } from "./apiUrl";

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
          theme={theme ? "light" : "dark"}
          primaryColor={selectedColor}
          tokenKey="babble-ai-chat-token"
          apiUrl={apiUrl}
          socketUrl={socketUrl}
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
