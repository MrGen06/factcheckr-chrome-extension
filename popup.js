chrome.storage.local.get("factResults", (data) => {
    const results = data.factResults || [];
    const container = document.getElementById("results");

    if (results.length === 0) {
        container.textContent = "No fact-checks found.";
    } else {
        results.forEach(claim => {
            const div = document.createElement("div");
            div.className = "claim";
            div.innerHTML = `
                <strong>${claim.text}</strong><br>
                <em>${claim.claimReview[0].textualRating}</em><br>
                <a href="${claim.claimReview[0].url}" target="_blank">Source</a>
            `;
            container.appendChild(div);
        });
    }
});