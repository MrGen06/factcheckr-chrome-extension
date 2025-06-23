chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "factcheck",
    title: "Check Fact",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "factcheck") {
    const selectedText = info.selectionText;
    const apiKey = "AIzaSyAvJ3gwzgkqOsJMQ7KTn1-mM4aUjw22NY8"; // your key here

    fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(selectedText)}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const claims = data.claims || [];
        chrome.storage.local.set({ factResults: claims }, () => {
          console.log("Fact check results saved:", claims);
        });
      })
      .catch(err => console.error("API error:", err));
  }
});

