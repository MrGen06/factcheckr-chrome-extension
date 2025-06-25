// popup.js
const trusted = [
  "snopes.com", "politifact.com", "factcheck.org", "reuters.com", "apnews.com",
  "bbc.com", "npr.org", "theguardian.com", "nytimes.com", "forbes.com",
  "thehindu.com", "indianexpress.com", "thewire.in", "scroll.in", "altnews.in",
  "boomlive.in", "ndtv.com", "factly.in"
];

const questionable = [
  "sputniknews.com", "infowars.com", "naturalnews.com", "theonion.com", "fakenewswire.com",
  "beforeitsnews.com", "yournewswire.com", "newswars.com", "breitbart.com", "zerohedge.com",
  "worldtruth.tv", "dailystormer.su", "truthaboutcancer.com", "dailywire.com", "thedailysheeple.com"
];

const mixed = [
  "timesofindia.indiatimes.com", "hindustantimes.com", "firstpost.com", "cnn.com", "foxnews.com"
];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0].url.startsWith("http")) {
    document.getElementById("quick-links").innerText = "❗ Unsupported page type.";
    return;
  }

  const url = new URL(tabs[0].url);
  const domain = url.hostname.replace("www.", "");
  const credibility = document.getElementById("credibility");

  if (trusted.includes(domain)) {
    credibility.innerHTML = `<b>${domain}</b> is a <span style="color:green;">trusted source</span>`;
  } else if (questionable.includes(domain)) {
    credibility.innerHTML = `<b>${domain}</b> is considered <span style="color:red;">unreliable</span>`;
  } else if (mixed.includes(domain)) {
    credibility.innerHTML = `<b>${domain}</b> has <span style="color:orange;">mixed credibility</span>`;
  } else {
    credibility.innerHTML = `<b>${domain}</b> is <span style="color:gray;">unrated</span>`;
  }

  // If the domain is unrated, offer trusted links
  if (!trusted.includes(domain) && !questionable.includes(domain) && !mixed.includes(domain)) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => window.getSelection().toString()
    }, (res) => {
      const highlightedText = (res && res[0] && res[0].result) || "";
      if (!highlightedText || highlightedText.length < 3) return;

      chrome.runtime.sendMessage({
        action: "checkDomainCredibility",
        domain,
        highlightedText
      }, (response) => {
        const container = document.getElementById("quick-links");
        container.innerHTML = `<h4>Search on Trusted Sources:</h4>`;
        response.links.forEach(link => {
          const a = document.createElement("a");
          a.href = link.url;
          a.textContent = `${link.name}`;
          a.target = "_blank";
          container.appendChild(a);
        });
      });
    });
  }
});