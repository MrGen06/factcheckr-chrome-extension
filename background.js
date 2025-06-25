let lastQuery = "";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "factcheck",
    title: "Check Fact",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = (info.selectionText || "").trim();
  if (!selectedText) return;
  lastQuery = selectedText;

  const trustedSources = [
    "snopes.com", "politifact.com", "factcheck.org", "reuters.com",
    "apnews.com", "bbc.com", "npr.org", "theguardian.com", "nytimes.com",
    "forbes.com", "thehindu.com", "indianexpress.com", "thewire.in",
    "scroll.in", "altnews.in", "boomlive.in", "ndtv.com", "factly.in"
  ];

  const siteQuery = trustedSources.map(site => `site:${site}`).join(" OR ");
  const fullQuery = `${selectedText} ${siteQuery}`;
  const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;

  // Open search tab then show notification
  chrome.tabs.create({ url: googleSearchURL }, () => {
    setTimeout(() => {
      chrome.notifications.create("newsPrompt", {
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "Want more results?",
        message: "Would you like to check Google News for this claim?",
        buttons: [{ title: "Yes, show me" }],
        priority: 1
      });
    }, 1500);
  });
});

// Handle notification button click
chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId === "newsPrompt" && btnIdx === 0) {
    const newsUrl = `https://news.google.com/search?q=${encodeURIComponent(lastQuery)}`;
    chrome.tabs.create({ url: newsUrl });
    chrome.notifications.clear("newsPrompt");
  }
});

// Optionally clear notification on close
chrome.notifications.onClosed.addListener((notifId) => {
  if (notifId === "newsPrompt") {
    chrome.notifications.clear("newsPrompt");
  }
});

// New: On popup open, check if domain is unrated and inject links to trusted sites
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkDomainCredibility" && message.domain && message.highlightedText) {
    const trustedSources = [
      "snopes.com", "politifact.com", "factcheck.org", "reuters.com",
      "apnews.com", "bbc.com", "npr.org", "theguardian.com", "nytimes.com",
      "forbes.com", "thehindu.com", "indianexpress.com", "thewire.in",
      "scroll.in", "altnews.in", "boomlive.in", "ndtv.com", "factly.in"
    ];

    const domain = message.domain;
    const text = message.highlightedText;
    const links = trustedSources.map(site => {
      return {
        name: site,
        url: `https://www.google.com/search?q=site:${site}+${encodeURIComponent(text)}`
      };
    });

    const credibility = trustedSources.includes(domain) ? "trusted" :
                        ["sputniknews.com", "infowars.com"].includes(domain) ? "unreliable" : "unrated";

    sendResponse({ credibility, links });
  }
});
