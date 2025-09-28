// DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const selectScreen = document.getElementById("select-screen");
const reportScreen = document.getElementById("report-screen");

const mandalSelect = document.getElementById("mandal-select");
const tbody = document.querySelector("#report-table tbody");

// Mandals & Villages data with specified unsafe counts
const data = [
  {
    mandal: "Tadepalligudem",
    villages: [
      { village: "Apparaopeta", pH: 6.5, turbidity: 1.2, tds: 500 },
      { village: "Arugolanu", pH: 9.0, turbidity: 6.5, tds: 1200 }, // unsafe
      { village: "Arulla", pH: 6.8, turbidity: 1.0, tds: 480 },
      { village: "Jagannadhapuram", pH: 5.9, turbidity: 7.0, tds: 1050 }, // unsafe
      { village: "Jaggannapeta", pH: 6.9, turbidity: 1.3, tds: 490 },
      { village: "Kadiyedda", pH: 7.1, turbidity: 0.7, tds: 460 },
      { village: "Kommugudem", pH: 6.4, turbidity: 5.5, tds: 1020 }, // unsafe
      { village: "Kondruprolu", pH: 7.3, turbidity: 0.6, tds: 440 },
      { village: "Krishnayapalem", pH: 6.6, turbidity: 1.4, tds: 510 },
      { village: "Kunavaram", pH: 5.8, turbidity: 6.2, tds: 1100 } // unsafe
    ]
  },
  {
    mandal: "Eluru",
    villages: [
      { village: "Chataparru", pH: 6.8, turbidity: 2.5, tds: 600 },
      { village: "Chodimella", pH: 7.2, turbidity: 1.8, tds: 550 },
      { village: "Eluru", pH: 7.4, turbidity: 1.2, tds: 500 },
      { village: "Gudivakalanka", pH: 6.9, turbidity: 3.0, tds: 650 },
      { village: "Jalipudi", pH: 7.1, turbidity: 2.2, tds: 580 },
      { village: "Kalakurru", pH: 9.2, turbidity: 6.5, tds: 1250 }, // unsafe
      { village: "Katlampudi", pH: 7.0, turbidity: 1.5, tds: 570 },
      { village: "Kokkirailanka", pH: 8.8, turbidity: 5.5, tds: 1020 }, // unsafe
      { village: "Komadavole", pH: 7.3, turbidity: 1.0, tds: 540 },
      { village: "Komatilanka", pH: 6.9, turbidity: 2.5, tds: 650 },
      { village: "Madepalle", pH: 5.8, turbidity: 6.0, tds: 1150 }, // unsafe
      { village: "Malkapuram", pH: 6.8, turbidity: 2.0, tds: 610 },
      { village: "Manuru", pH: 7.1, turbidity: 1.5, tds: 580 },
      { village: "Ponangi", pH: 6.9, turbidity: 2.3, tds: 640 },
      { village: "Prathikollanka", pH: 9.1, turbidity: 5.8, tds: 1200 } // unsafe
    ]
  },
  {
    mandal: "Unguturu",
    villages: [
      { village: "Amudalapalle", pH: 6.8, turbidity: 2.5, tds: 600 },
      { village: "Atkuru", pH: 7.2, turbidity: 1.8, tds: 550 },
      { village: "Bokinala", pH: 5.9, turbidity: 6.5, tds: 1100 }, // unsafe
      { village: "Chagantipadu", pH: 7.1, turbidity: 2.3, tds: 580 },
      { village: "Chikinala", pH: 6.7, turbidity: 2.8, tds: 650 },
      { village: "Elukapadu", pH: 7.0, turbidity: 1.5, tds: 590 },
      { village: "Garapadu", pH: 6.8, turbidity: 2.0, tds: 610 },
      { village: "Indupalle", pH: 7.3, turbidity: 1.2, tds: 540 },
      { village: "Koyyagurapadu", pH: 6.9, turbidity: 2.5, tds: 630 },
      { village: "Vijayapadu", pH: 9.0, turbidity: 6.0, tds: 1200 } // unsafe
    ]
  },
  {
    mandal: "Bhimadole",
    villages: [
      { village: "Agadallanka", pH: 6.8, turbidity: 2.5, tds: 600 },
      { village: "Amberpeta", pH: 7.2, turbidity: 1.8, tds: 550 },
      { village: "Bhimadole", pH: 7.4, turbidity: 1.2, tds: 500 },
      { village: "Chettunnapadu", pH: 5.5, turbidity: 6.8, tds: 1300 }, // unsafe
      { village: "Duddepudi", pH: 7.1, turbidity: 1.5, tds: 580 },
      { village: "Mallavaram", pH: 9.2, turbidity: 7.0, tds: 1250 } // unsafe
    ]
  }
];

// Check if water is safe
function isSafe(entry) {
  return entry.pH >= 6.5 && entry.pH <= 8.5 &&
         entry.turbidity <= 5 &&
         entry.tds <= 1000;
}

// Reset to Welcome screen
window.onload = () => {
  welcomeScreen.classList.remove("active");
  selectScreen.classList.remove("active");
  reportScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
};

// Populate mandal dropdown
data.forEach(m => {
  let option = document.createElement("option");
  option.value = m.mandal;
  option.textContent = m.mandal;
  mandalSelect.appendChild(option);
});

// Start button
document.getElementById("start-btn").onclick = () => {
  welcomeScreen.classList.remove("active");
  selectScreen.classList.add("active");
};

// Show report button
document.getElementById("show-report-btn").onclick = () => {
  const selectedMandal = mandalSelect.value;
  if (!selectedMandal) {
    alert("Please select a mandal!");
    return;
  }

  const mandalData = data.find(m => m.mandal === selectedMandal);

  // Sort: Unsafe first
  const sortedVillages = [...mandalData.villages].sort((a,b) => isSafe(a) - isSafe(b));

  tbody.innerHTML = "";

  let unsafeCounter = 0;
  let maxAffected = 100;

  sortedVillages.forEach((entry, index) => {
    const safe = isSafe(entry);
    const row = document.createElement("tr");
    row.className = safe ? "safe" : "unsafe";

    let action = "";
    if (!safe) {
      if (unsafeCounter === 0) action = "Immediate action needed";
      else action = `Action in ${unsafeCounter * 2} days`;
      unsafeCounter++;
    } else {
      action = "No need";
    }

    let affected = safe ? 0 : maxAffected - (unsafeCounter - 1) * 20;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.village}</td>
      <td>${entry.pH}</td>
      <td>${entry.turbidity}</td>
      <td>${entry.tds}</td>
      <td>${safe ? '✅ Safe' : '⚠️ Unsafe'}</td>
      <td>${affected}</td>
      <td>${action}</td>
    `;
    tbody.appendChild(row);
  });

  selectScreen.classList.remove("active");
  reportScreen.classList.add("active");
};

// Back button
document.getElementById("back-btn").onclick = () => {
  reportScreen.classList.remove("active");
  selectScreen.classList.add("active");
};
