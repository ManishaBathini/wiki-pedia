let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;


    //1. div container --result-item
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEl.appendChild(resultItem);

    //2. Anchor Title --result-title
    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultTitle.textContent = title;
    resultItem.appendChild(resultTitle);

    //3. Title break
    let titleBreak = document.createElement("br");
    resultItem.appendChild(titleBreak);

    //4. Anchor URL --result-url
    let resultUrl = document.createElement("a");
    resultUrl.classList.add("result-url");
    resultUrl.href = link;
    resultUrl.traget = "_blank";
    resultUrl.textContent = link;
    resultItem.appendChild(resultUrl);

    //5.line break 
    let lineBreak = document.createElement("br");
    resultItem.appendChild(lineBreak);

    //6. Paragraph Description --line-description 
    let lineDescription = document.createElement("p");
    lineDescription.classList.add("line-description");
    lineDescription.textContent = description;
    resultItem.appendChild(lineDescription);


}

function displayResults(searchResults) {
    spinnerEl.classList.toggle('d-none');

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle('d-none');

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }

}
searchInputEl.addEventListener('keydown', searchWikipedia);