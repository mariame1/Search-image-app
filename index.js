const accessKey = "kybFIf9uDMJRC_Mb6CT0_EwtjI2jNyorqdxUrx9UegM"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("input-search");
const searchResulstEl = document.querySelector(".search-results");
const moreButtonEl = document.getElementById("more");


let inputDatas = "";
let page = 1;

async function searchTheImages() {
    const inputDatas = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputDatas}&client_id=${accessKey}`
    // console.log(url)

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    const results = data.results;
    console.log(results);

    if (page === 1) {
        searchResulstEl.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.append(image);
        imageWrapper.appendChild(imageLink);
        searchResulstEl.appendChild(imageWrapper);
    });
    page++;

    if(page > 1){
        moreButtonEl.style.display = "block";
    }
}



formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchTheImages();
});
 
moreButtonEl.addEventListener("click", ()=>{
    searchTheImages();
})