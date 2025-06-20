// When the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "factcheck",
        title: "Check Fact",
        contexts: ["selection"] // Only show when text is selected  
    });
});

// When the context item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "factcheck") {
        const selectedText = info.selectionText;

        // Call the Fact Check API
        fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(selectedText)}&key=AIzaSyAvJ3gwzgkqOsJMQ7KTn1-mM4aUjw22NY8`)
        .then(response => response.json())
        .then(data => {
            chrome.storage.local.set({factResults: data.claims || []});
            console.log("Fact check results saved.");
        })
        .catch(error => {
            console.error("Error fetching from Fact Check API:", error);
        });
    }
});