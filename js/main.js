document.addEventListener("DOMContentLoaded", function () {
    const articlesContainer = document.querySelector(".articles-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const dealsContainer = document.querySelector(".deals-container");

    let articlesData = [];

    // Fetch articles from JSON file
    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            articlesData = articles;
            displayArticles(articlesData);
        })
        .catch(error => showError("Error loading articles", articlesContainer));

    function displayArticles(articles) {
        articlesContainer.innerHTML = articles.length 
            ? articles.map(articleTemplate).join("") 
            : "<p>No articles found.</p>";
    }

    function articleTemplate(article) {
        return `
            <div class="article-card">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="template.html?id=${encodeURIComponent(article.id)}" class="read-more">Read More</a>
            </div>
        `;
    }

    // Filter articles based on category
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            const filteredArticles = category === "all" 
                ? articlesData 
                : articlesData.filter(article => article.category === category);
            displayArticles(filteredArticles);
        });
    });

    // Fetch and display best deals
    fetch("data/deals.json")
        .then(response => response.json())
        .then(deals => displayDeals(deals))
        .catch(error => showError("Error loading deals", dealsContainer));

    function displayDeals(deals) {
        dealsContainer.innerHTML = deals.length 
            ? deals.map(dealTemplate).join("") 
            : "<p>No deals available.</p>";
    }

    function dealTemplate(deal) {
        return `
            <div class="deal-card">
                <img src="${deal.image}" alt="${deal.name}" loading="lazy">
                <h3>${deal.name}</h3>
                <p>${deal.description}</p>
                <span class="price">${deal.price}</span>
                <a href="${deal.affiliate_link}" target="_blank" class="buy-now">Buy Now</a>
            </div>
        `;
    }

    function showError(message, container) {
        container.innerHTML = `<p class="error">${message}</p>`;
    }
});

