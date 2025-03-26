import useCreateStyle from "../Hooks/useCreateStyle";
import { createStyleSheet } from "../Types/style";
import { Theme } from "../Utils/getTheme";

interface SuggestionMessagesProps {
  suggestedMessages: string[] | null;
  sendMessage: (message: string) => void;
}
const SuggestionMessages = ({
  suggestedMessages,
  sendMessage,
}: SuggestionMessagesProps) => {
  const style = useCreateStyle(themeStyle);

  return (
    <>
      <div
        style={style.suggestionButtonContainer}
        id="babble-ai_suggestionButtonContainer"
      >
        {suggestedMessages?.map((m) => (
          <button
            style={style.suggestionButton}
            key={m}
            onClick={() => sendMessage(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      #babble-ai_suggestionButtonContainer::-webkit-scrollbar {
          display: none;
      }
      `,
        }}
      ></style>
    </>
  );
};

const themeStyle = (theme: Theme) =>
  createStyleSheet({
    suggestionButtonContainer: {
      display: "flex",
      padding: "0 40px 5px",
      gap: "12px",
      overflowX: "scroll",
      whiteSpace: "nowrap",
    },
    suggestionButton: {
      border: "0.8px solid",
      borderRadius: "10px",
      padding: "4px 11px",
      fontWeight: "400",
      fontSize: "12px",
      cursor: "pointer",
      color: theme.incoming,
      backgroundColor: theme.chatBg,
      borderColor: theme.linkColor,
    },
  });

export default SuggestionMessages;
