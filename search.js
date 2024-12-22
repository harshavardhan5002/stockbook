const SHOP1_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU07yOPsyr6iuJp0ETg28ARyJYmk5rVzJpvEFbpKEBuo-WmZUA4aOHDPkOC4e4IA/pub?output=csv";
const SHOP2_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqtVJN3lKK1CICyW6Hf0QLicFJ_f9Ub_tYBEhKCMnH5XcfpnzdPiPxHrBnZhBp8Q/pub?output=csv";
const SHOP3_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTx34Q4JxYYtjGmoHJIQ88iUaDZpNBulDVMoKrw9ANLyj7DK3RCou3RlpxSg7gJog/pub?output=csv";
const SHOP4_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgPsoj-jXIrME6ACJ64-GxFqD-psIF-p5NCYQiqVHSuhs8LpS0IOJLHBxLnUaAeQ/pub?output=csv";
const SHOP5_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT0wDcJO43PbJxpcV6JXbGWyLXOfJeWmL_4p048f0QgLnpulX4yqB9Fq_VEkrdc6g/pub?output=csv";
const SHOP6_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjGE9Xd_2D6D5Z2L8PifzIdNtOnKCv8v0JvBliN6JuAGeIsoHBYxVykzLwnT8YPw/pub?output=csv";
const SHOP7_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyiVCUiRPK7P31ykkcDMFhKuk3qSODdtncmcf6SMb03TN23BnglQXUxpW9EEMPjQ/pub?output=csv";
const SHOP8_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXCmGoHRuAzLBebTdgRs2qwvL6d7UQWFCVfh62qZm5C0bRum539MMp1_6uJ2aaJw/pub?output=csv";
const SHOP9_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTiCwVJvPeE3o1Q8fgKXkk0jVbsd4BInc32f_y7CSozMXUWiCDh1ql9mt7nJkv3rQ/pub?output=csv";
const SHOP10_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1qsWLdhNa3-DYrzL7ukCqgWPpPw8_93bOwErGidH7lAz5EePY4i3a7AurM2hErg/pub?output=csv";
const SHOP11_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFlUmfs_s2d6bh9UFuHYZW8a5M_WRf-_YAAz9g6y-hvUxoyea6qjY6HLwmm47kqw/pub?output=csv";
const SHOP12_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXtNAkczy2DSGABbfqiHPUFIOts6axyxAogty3ub6vE8vQtW0w5zY-UhsQHp341g/pub?output=csv";


let shop1Data = [], shop2Data = [], shop3Data = [], shop4Data = [], shop5Data = [];
let shop6Data = [], shop7Data = [], shop8Data = [], shop9Data = [], shop10Data = [];
let shop11Data = [], shop12Data = [];

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
