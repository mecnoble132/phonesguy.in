document.addEventListener("DOMContentLoaded", function () {
    const articleContainer = document.getElementById("full-article");
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (!articleId) {
        articleContainer.innerHTML = "<p>Article not found.</p>";
        return;
    }

    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(a => a.id == articleId);
            if (!article) {
                articleContainer.innerHTML = "<p>Article not found.</p>";
                return;
            }

            articleContainer.innerHTML = `
                <h1>${article.title}</h1>
                <img src="${article.image}" alt="${article.title}">
                <p>${article.content}</p>
                <a href="${article.affiliate_link}" target="_blank" class="buy-now">Buy Now</a>
            `;
        })
        .catch(error => console.error("Error loading article:", error));
});
