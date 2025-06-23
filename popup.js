document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["factResults"], (result) => {
    const results = result.factResults;
    const container = document.getElementById("results");

    console.log("FACT CHECK RESULTS:", results);

    if (!results || results.length === 0) {
      container.textContent = "No fact-checks found.";
    } else {
      container.innerHTML = "";
      results.forEach(claim => {
        const review = claim.claimReview && claim.claimReview[0];
        const div = document.createElement("div");
        div.className = "claim";
        div.innerHTML = `
          <strong>${claim.text}</strong><br>
          <em>${review.textualRating}</em><br>
          <a href="${review.url}" target="_blank">Source</a>
        `;
        container.appendChild(div);
      });
    }
  });
});
