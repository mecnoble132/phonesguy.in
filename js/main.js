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
        .catch(error => console.error("Error loading articles:", error));

    function displayArticles(articles) {
        articlesContainer.innerHTML = "";
        articles.forEach(article => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("article-card");
            articleCard.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="template.html?id=${article.id}" class="read-more">Read More</a>
            `;
            articlesContainer.appendChild(articleCard);
        });
    }

    // Filter articles based on category
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            if (category === "all") {
                displayArticles(articlesData);
            } else {
                const filteredArticles = articlesData.filter(article => article.category === category);
                displayArticles(filteredArticles);
            }
        });
    });

    // Fetch and display best deals
    fetch("data/deals.json")
        .then(response => response.json())
        .then(deals => {
            displayDeals(deals);
        })
        .catch(error => console.error("Error loading deals:", error));

    function displayDeals(deals) {
        dealsContainer.innerHTML = "";
        deals.forEach(deal => {
            const dealCard = document.createElement("div");
            dealCard.classList.add("deal-card");
            dealCard.innerHTML = `
                <img src="${deal.image}" alt="${deal.name}">
                <h3>${deal.name}</h3>
                <p>${deal.description}</p>
                <span class="price">${deal.price}</span>
                <a href="${deal.affiliate_link}" target="_blank" class="buy-now">Buy Now</a>
            `;
            dealsContainer.appendChild(dealCard);
        });
    }
});
