const SHOP1_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP2_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP3_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP4_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP5_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP6_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP7_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP8_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP9_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP10_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP11_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP12_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";
const SHOP13_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSehqlHu71HGxD8a3k2YeDatKlkBc9YHdrZQ9Mn8Y2oibAbKl6kcnQfTa_9gSAuFA/pub?output=csv";
const SHOP14_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTajhbk6BS35KpJ-DJGfcBE45S0vF9vPzuQOgUpWRvfb1y-a1NoJE6BPa8yUFKKUg/pub?output=csv";

let shop1Data = [], shop2Data = [], shop3Data = [], shop4Data = [], shop5Data = [];
let shop6Data = [], shop7Data = [], shop8Data = [], shop9Data = [], shop10Data = [];
let shop11Data = [], shop12Data = [], shop13Data = [], shop14Data = [];

async function fetchShopData() {
  const fetchCSV = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    return text.split("\n").map(row => row.split(","));
  };

  shop1Data = await fetchCSV(SHOP1_CSV);
  shop2Data = await fetchCSV(SHOP2_CSV);
  shop3Data = await fetchCSV(SHOP3_CSV); // For example purpose
  shop4Data = await fetchCSV(SHOP4_CSV);
  shop5Data = await fetchCSV(SHOP5_CSV); // For example purpose
  shop6Data = await fetchCSV(SHOP6_CSV);
  shop7Data = await fetchCSV(SHOP7_CSV); // For example purpose
  shop8Data = await fetchCSV(SHOP8_CSV);
  shop9Data = await fetchCSV(SHOP9_CSV); // For example purpose
  shop10Data = await fetchCSV(SHOP10_CSV);
  shop11Data = await fetchCSV(SHOP11_CSV); // For example purpose
  shop12Data = await fetchCSV(SHOP12_CSV);
  shop13Data = await fetchCSV(SHOP13_CSV); // For example purpose
  shop14Data = await fetchCSV(SHOP14_CSV);

  // Repeat for shop5Data to shop14Data...
}


document.getElementById("search-btn").addEventListener("click", () => {
  const filter = document.getElementById("filter").value;
  const query = document.getElementById("search-input").value.toLowerCase();
  
  const index = shop1Data[0].indexOf(filter); // Use SHOP1 as structure for all

  const searchResults = (data) => 
    data.filter((row, idx) => idx > 0 && row[index]?.toLowerCase().includes(query));

  const shopResults = [
    searchResults(shop1Data), searchResults(shop2Data), searchResults(shop3Data),
    searchResults(shop4Data), searchResults(shop5Data), searchResults(shop6Data),
    searchResults(shop7Data), searchResults(shop8Data), searchResults(shop9Data),
    searchResults(shop10Data), searchResults(shop11Data), searchResults(shop12Data),
    searchResults(shop13Data), searchResults(shop14Data)
  ];

  shopResults.forEach((results, i) => {
    const shopElement = document.getElementById(`shop${i + 1}`);
    const resultsContainer = shopElement.querySelector(".shop-results");

    if (results.length > 0) {
      shopElement.classList.add("found");

      resultsContainer.innerHTML = results.map(row => `<p>${row.join(" | ")}</p>`).join("");
    } else {
      shopElement.classList.remove("found");
      resultsContainer.innerHTML = "<p>No results found</p>";
    }
  });
});

function toggleResults(shopId) {
  const shopResults = document.querySelector(`#${shopId} .shop-results`);
  shopResults.classList.toggle("active");
}

window.onload = async () => {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
  await fetchShopData();
};
