chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log(text);
  suggest([
    {
      content: "First content",
      description: "This is description of 1st content 🧊",
    },
    {
      content: "Second content",
      description: "This is description of 2nd content 🔥",
      deletable: true,
    },
  ]);
});

chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  console.log("Entered: ", text);
});

chrome.omnibox.setDefaultSuggestion({
  description: "This is default suggestion 🃏",
});
