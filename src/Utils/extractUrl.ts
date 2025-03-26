const extractUrl = (str: string) => {
  const regexp = /(https?:\/\/[^\s]+)/g;

  if (str && typeof str !== "string") {
    throw new TypeError(
      `The str argument should be a string, got ${typeof str}`,
    );
  }

  if (str) {
    const matches = [...str.matchAll(regexp)]; // Extract all link matches from the message

    let lastIndex = 0; // Keep track of the last index of the text in the message

    const messages = []; // Initialize an array to hold the message and link objects

    for (const match of matches) {
      const linkIndex = match.index || 0; // Get the index of the link in the message
      const text = str.slice(lastIndex, linkIndex); // Get the text before the link

      if (text.length > 0) {
        messages.push({ type: "text", message: text }); // Add the text object to the array
      }

      messages.push({ type: "link", message: match[0] }); // Add the link object to the array

      lastIndex = linkIndex + match[0].length; // Update the last index of the text in the message
    }

    const remainingText = str.slice(lastIndex); // Get any remaining text in the message

    if (remainingText.length > 0) {
      messages.push({ type: "text", message: remainingText }); // Add the remaining text object to the array
    }
    return messages;
  } else return [];
};

export default extractUrl;
