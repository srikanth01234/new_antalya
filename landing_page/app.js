/**
 * ANTALYA RESTAURANT - LANDING PAGE CONTROLLER
 * Direct redirection to branch sites, no popup dialogs.
 */

// ── Branch Configuration Data (Burlington, Kitchener, London) ──
const BRANCHES = [
  {
    id: "burlington",
    index: "01",
    title: "Burlington",
    address: "1860 Appleby Line,<br />Burlington, ON L7L 7H7",
    addressPlain: "1860 Appleby Line, Burlington, ON L7L 7H7",
    description: "A warm and inviting space to enjoy our signature Turkish dishes.",
    image: "assets/burlington.jpg",
    folder: "burlington-antalya",
    devPort: 3000,
    devUrl: "http://localhost:3000"
  },
  {
    id: "kitchener",
    index: "02",
    title: "Kitchener",
    address: "1187 Fischer-Hallman Rd #A35,<br />Kitchener, ON N2E 4H9",
    addressPlain: "1187 Fischer-Hallman Rd #A35, Kitchener, ON N2E 4H9",
    description: "Modern and inviting dining experience featuring our authentic charcoal-grilled Turkish specialties.",
    image: "assets/kitchener.jpg",
    folder: "kitchener-antalya",
    devPort: 3001,
    devUrl: "http://localhost:3001"
  },
  {
    id: "london",
    index: "03",
    title: "London",
    address: "660 Richmond St,<br />London, ON N6A 3G8",
    addressPlain: "660 Richmond St, London, ON N6A 3G8",
    description: "Experience Antalya's authentic Turkish cuisine and warm hospitality in the heart of London, Ontario.",
    image: "assets/london.jpg",
    folder: "london-antalya",
    devPort: 3002,
    devUrl: "http://localhost:3002"
  }
];

// Active State
let currentBranchIndex = 0;

// DOM Elements
const mainBranchImage = document.getElementById("mainBranchImage");
const branchDetailIndex = document.getElementById("branchDetailIndex");
const branchDetailTitle = document.getElementById("branchDetailTitle");
const branchDetailAddress = document.getElementById("branchDetailAddress");
const branchDetailDescription = document.getElementById("branchDetailDescription");
const photoCounter = document.getElementById("photoCounter");

const branchTabs = document.querySelectorAll(".branch-tab-pill");
const mapPins = document.querySelectorAll(".map-pin");

const prevBranchBtn = document.getElementById("prevBranchBtn");
const nextBranchBtn = document.getElementById("nextBranchBtn");
const openFolderBtn = document.getElementById("openFolderBtn");
const visitRestaurantBtn = document.getElementById("visitRestaurantBtn");
const findLocationBtn = document.getElementById("findLocationBtn");

/**
 * Switch Branch Display
 * @param {number} newIndex
 */
function selectBranch(newIndex) {
  if (newIndex < 0) newIndex = BRANCHES.length - 1;
  if (newIndex >= BRANCHES.length) newIndex = 0;

  currentBranchIndex = newIndex;
  const branch = BRANCHES[currentBranchIndex];

  // 1. Update Tabs Active State
  branchTabs.forEach((tab, idx) => {
    const isSelected = idx === currentBranchIndex;
    tab.classList.toggle("active", isSelected);
    tab.setAttribute("aria-selected", isSelected ? "true" : "false");
  });

  // 2. Update Map Pins Active State
  mapPins.forEach((pin, idx) => {
    pin.classList.toggle("active", idx === currentBranchIndex);
  });

  // 3. Smooth Crossfade Main Image
  if (mainBranchImage) {
    mainBranchImage.classList.add("fade-out");
    setTimeout(() => {
      mainBranchImage.src = branch.image;
      mainBranchImage.alt = `${branch.title} Antalya Restaurant Interior`;
      mainBranchImage.onload = () => {
        mainBranchImage.classList.remove("fade-out");
      };
      // Fallback if cached
      mainBranchImage.classList.remove("fade-out");
    }, 150);
  }

  // 4. Update Details Panel
  if (branchDetailIndex) branchDetailIndex.textContent = branch.index;
  if (branchDetailTitle) branchDetailTitle.textContent = branch.title;
  if (branchDetailAddress) branchDetailAddress.innerHTML = branch.address;
  if (branchDetailDescription) branchDetailDescription.textContent = branch.description;

  // 5. Update Photo Counter (01 / 03)
  if (photoCounter) {
    photoCounter.textContent = `${branch.index} / 03`;
  }
}

/**
 * DIRECT REDIRECT to branch website - NO POPUP!
 * @param {Object} branch
 */
function redirectToBranch(branch) {
  if (!branch) branch = BRANCHES[currentBranchIndex];
  // Redirect directly to the branch dev URL / website
  window.location.href = branch.devUrl;
}

// ── Event Listeners ──

// Branch Tab Pills
branchTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const branchIndex = parseInt(tab.getAttribute("data-branch-index"), 10);
    const isArrow = e.target.closest(".pill-arrow");
    const isCurrent = tab.classList.contains("active");

    if (isArrow || isCurrent) {
      // If arrow clicked or already active tab clicked, redirect directly!
      redirectToBranch(BRANCHES[branchIndex]);
    } else {
      selectBranch(branchIndex);
    }
  });

  tab.addEventListener("dblclick", () => {
    const branchIndex = parseInt(tab.getAttribute("data-branch-index"), 10);
    redirectToBranch(BRANCHES[branchIndex]);
  });
});

// Map Location Pins
mapPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    const branchIndex = parseInt(pin.getAttribute("data-branch"), 10);
    selectBranch(branchIndex);
    const showcase = document.getElementById("branchShowcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// Carousel Navigation Arrows
if (prevBranchBtn) {
  prevBranchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectBranch(currentBranchIndex - 1);
  });
}

if (nextBranchBtn) {
  nextBranchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectBranch(currentBranchIndex + 1);
  });
}

// Visit Restaurant CTA Button -> Directly Redirects to Branch Website
if (visitRestaurantBtn) {
  visitRestaurantBtn.addEventListener("click", () => {
    redirectToBranch(BRANCHES[currentBranchIndex]);
  });
}

// Open / External icon button on photo -> Directly Redirects
if (openFolderBtn) {
  openFolderBtn.addEventListener("click", () => {
    redirectToBranch(BRANCHES[currentBranchIndex]);
  });
}

// "FIND A LOCATION NEAR YOU" Button
if (findLocationBtn) {
  findLocationBtn.addEventListener("click", () => {
    const showcase = document.getElementById("branchShowcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    selectBranch(currentBranchIndex - 1);
  } else if (e.key === "ArrowRight") {
    selectBranch(currentBranchIndex + 1);
  } else if (e.key === "Enter") {
    redirectToBranch(BRANCHES[currentBranchIndex]);
  }
});

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  selectBranch(0);
});
