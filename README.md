# 🧠 FactCheckr — Verify What You Read

FactCheckr is a lightweight Chrome extension that helps users verify highlighted news or claims using trusted fact-checking sources. Whether you're reading a news article or social media post, FactCheckr empowers you to quickly validate information with one click.

---

## 🔍 Features

- ✅ Right-click to fact check any selected text
- ✅ Instantly search across trusted sources like:
  - Snopes, PolitiFact, Reuters, AltNews, The Hindu, and more
- ✅ Shows if the current website is:
  - ✅ Trusted  
  - ❌ Unreliable  
  - ⚠️ Mixed  
  - 🕵️ Unrated
- ✅ On unrated sites, suggests trusted links for further verification
- ✅ Optional: check the claim on Google News via a smart prompt
- 🧭 Clean popup interface with one-click search links

---

## 🚀 Installation (Unpacked)

1. Download the repo or https://drive.google.com/file/d/1OV3473CUQ4NHKrB53ycGwWq6IM3gBccV/view?usp=drivesdk and extract it
2. Go to `chrome://extensions` in your browser
3. Enable Developer mode
4. Click Load unpacked
5. Select the extracted folder

---

## 🧑‍💻 Tech Stack

- HTML, CSS, JavaScript
- Chrome Extensions API (Manifest v3)
- Uses `chrome.contextMenus`, `scripting`, `notifications`, and `storage`

---

## 🔒 Privacy

> This extension does not collect, track, or store any personal data.  
All fact-checking happens locally in your browser through public search links.

---

## 📌 Roadmap

- [ ] NLP-based claim classification (e.g. likely true / false)
- [ ] Integrate with Google Fact Check Tools API
- [ ] Cross-browser support (Firefox, Edge)
- [ ] User-configurable trusted source list

---

## 🤝 Contributing

Pull requests are welcome!  
Feel free to open an issue for suggestions or bugs.
