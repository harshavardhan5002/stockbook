const EMPLOYEE_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcer6YbjH8sFDvC9Ss65i6qVw0awNPiVNg02EyO_qNU4a3vg1Ux9SrQjDVpux0Pw/pub?output=csv";
let employeeData = [];

// Fetch and parse employee data
async function fetchEmployeeData() {
  const response = await fetch(EMPLOYEE_CSV);
  const text = await response.text();

  // Split data by rows, then by comma, and clean spaces (trim)
  employeeData = text
    .split("\n")
    .map(row => row.split(",").map(cell => cell.trim())) // Split on commas, trim extra spaces
    .filter(row => row.length > 1 && row[0] && row[1]); // Remove invalid rows
}

// Load saved credentials if "Remember Me" was checked
window.onload = async () => {
  await fetchEmployeeData();

  const rememberedEID = localStorage.getItem("rememberedEID");
  const rememberedPassword = localStorage.getItem("rememberedPassword");

  if (rememberedEID && rememberedPassword) {
    document.getElementById("eid").value = rememberedEID;
    document.getElementById("password").value = rememberedPassword;
    document.getElementById("remember").checked = true;
  }
};

// Login button functionality
document.getElementById("login-btn").addEventListener("click", () => {
  const eid = document.getElementById("eid").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check for empty fields
  if (!eid || !password) {
    document.getElementById("login-error").textContent = "Please enter both fields!";
    return;
  }

  // Match credentials
  const user = employeeData.find(row => row[0] === eid && row[1] === password);

  if (user) {
    // Save credentials if "Remember Me" is checked
    if (document.getElementById("remember").checked) {
      localStorage.setItem("rememberedEID", eid);
      localStorage.setItem("rememberedPassword", password);
    } else {
      // Clear remembered credentials if "Remember Me" is unchecked
      localStorage.removeItem("rememberedEID");
      localStorage.removeItem("rememberedPassword");
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "search.html"; // Redirect to search page
  } else {
    document.getElementById("login-error").textContent = "Invalid credentials!";
  }
});
