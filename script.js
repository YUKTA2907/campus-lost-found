// ==========================================
// CAMPUS LOST & FOUND
// ==========================================


// ==========================================
// DEFAULT SAMPLE DATA
// ==========================================

const defaultItems = [

    {
        id: 1,
        type: "lost",
        name: "Black Wallet",
        category: "Accessories",
        description: "Black leather wallet with college ID inside.",
        location: "Library",
        date: "2026-10-07",
        contact: "9876543210",
        imageURL: "",
        status: "active"
    },

    {
        id: 2,
        type: "found",
        name: "Blue Water Bottle",
        category: "Other",
        description: "Blue water bottle found near Block C.",
        location: "Block C",
        date: "2026-10-07",
        contact: "9876500000",
        imageURL: "",
        status: "active"
    },

    {
        id: 3,
        type: "lost",
        name: "Calculator",
        category: "Electronics",
        description: "Black scientific calculator lost near the CS Block.",
        location: "CS Block",
        date: "2026-10-06",
        contact: "9876511111",
        imageURL: "",
        status: "active"
    }

];


// ==========================================
// LOAD ITEMS
// ==========================================

let items = [];

const storedItems = localStorage.getItem("campusLostFoundItems");

if (storedItems) {

    try {

        items = JSON.parse(storedItems);

    } catch (error) {

        console.error("Could not read saved items:", error);

        items = [...defaultItems];

    }

} else {

    items = [...defaultItems];

    saveItems();

}


// ==========================================
// DOM ELEMENTS
// ==========================================

const itemsContainer =
    document.getElementById("itemsContainer");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const emptyState =
    document.getElementById("emptyState");

const reportForm =
    document.getElementById("reportForm");

const reportLostBtn =
    document.getElementById("reportLostBtn");

const reportFoundBtn =
    document.getElementById("reportFoundBtn");

const toast =
    document.getElementById("toast");

const itemModal =
    document.getElementById("itemModal");

const modalBody =
    document.getElementById("modalBody");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.getElementById("modalOverlay");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileNav =
    document.getElementById("mobileNav");


// ==========================================
// SAVE ITEMS
// ==========================================

function saveItems() {

    localStorage.setItem(
        "campusLostFoundItems",
        JSON.stringify(items)
    );

}


// ==========================================
// CATEGORY ICON
// ==========================================

function getCategoryIcon(category) {

    const icons = {

        Electronics: "📱",
        Documents: "📄",
        Accessories: "👛",
        Books: "📚",
        Clothing: "👕",
        Keys: "🔑",
        Bags: "🎒",
        Other: "📦"

    };

    return icons[category] || "📦";

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {

    if (!dateString) {
        return "Date unavailable";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null ? "" : String(value);

    return div.innerHTML;

}


// ==========================================
// DISPLAY ITEMS
// ==========================================

function displayItems(itemsToDisplay) {

    itemsContainer.innerHTML = "";

    if (itemsToDisplay.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";


    itemsToDisplay.forEach(item => {

        const card =
            document.createElement("article");

        card.className =
            "item-card";


        const imageContent =
            item.imageURL

            ? `
                <img
                    src="${escapeHTML(item.imageURL)}"
                    alt="${escapeHTML(item.name)}"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='block';
                    "
                >

                <div
                    class="item-placeholder"
                    style="display:none"
                >
                    ${getCategoryIcon(item.category)}
                </div>
              `

            : `
                <div class="item-placeholder">
                    ${getCategoryIcon(item.category)}
                </div>
              `;


        card.innerHTML = `

            <div class="item-image">

                ${imageContent}

                <span
                    class="
                        status-badge
                        ${
                            item.type === "lost"
                                ? "status-lost"
                                : "status-found"
                        }
                    "
                >

                    ${
                        item.type === "lost"
                            ? "Lost"
                            : "Found"
                    }

                </span>

            </div>


            <div class="item-content">

                <span class="item-category">

                    ${escapeHTML(item.category)}

                </span>


                <h3>

                    ${escapeHTML(item.name)}

                </h3>


                <p class="item-description">

                    ${escapeHTML(item.description)}

                </p>


                <div class="item-info">

                    <span>
                        📍 ${escapeHTML(item.location)}
                    </span>

                    <span>
                        📅 ${formatDate(item.date)}
                    </span>

                </div>


                <button
                    class="view-btn"
                    data-id="${item.id}"
                >
                    View Details
                </button>

            </div>

        `;


        itemsContainer.appendChild(card);

    });


    document
        .querySelectorAll(".view-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openItemModal(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}


// ==========================================
// FILTER ITEMS
// ==========================================

function filterItems() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedType =
        typeFilter.value;

    const selectedCategory =
        categoryFilter.value;


    const filteredItems =
        items.filter(item => {

            const matchesSearch =

                item.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                item.description
                    .toLowerCase()
                    .includes(searchValue)

                ||

                item.location
                    .toLowerCase()
                    .includes(searchValue)

                ||

                item.category
                    .toLowerCase()
                    .includes(searchValue);


            const matchesType =

                selectedType === "all"

                ||

                item.type === selectedType;


            const matchesCategory =

                selectedCategory === "all"

                ||

                item.category === selectedCategory;


            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );

        });


    displayItems(filteredItems);

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStats() {

    const total =
        items.length;

    const lost =
        items.filter(
            item => item.type === "lost"
        ).length;

    const found =
        items.filter(
            item => item.type === "found"
        ).length;

    const returned =
        items.filter(
            item => item.status === "returned"
        ).length;


    document.getElementById(
        "totalItems"
    ).textContent = total;


    document.getElementById(
        "lostCount"
    ).textContent = lost;


    document.getElementById(
        "foundCount"
    ).textContent = found;


    document.getElementById(
        "returnedCount"
    ).textContent = returned;

}


// ==========================================
// REPORT FORM
// ==========================================

reportForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const selectedType =
            document.querySelector(
                'input[name="type"]:checked'
            ).value;


        const newItem = {

            id: Date.now(),

            type: selectedType,

            name:
                document
                    .getElementById("itemName")
                    .value
                    .trim(),

            category:
                document
                    .getElementById("itemCategory")
                    .value,

            description:
                document
                    .getElementById("itemDescription")
                    .value
                    .trim(),

            location:
                document
                    .getElementById("itemLocation")
                    .value
                    .trim(),

            date:
                document
                    .getElementById("itemDate")
                    .value,

            contact:
                document
                    .getElementById("itemContact")
                    .value
                    .trim(),

            imageURL:
                document
                    .getElementById("itemImage")
                    .value
                    .trim(),

            status: "active"

        };


        items.unshift(newItem);


        saveItems();

        displayItems(items);

        updateStats();


        reportForm.reset();


        document.querySelector(
            'input[name="type"][value="lost"]'
        ).checked = true;


        setTodayDate();


        showToast(
            `${
                selectedType === "lost"
                    ? "Lost"
                    : "Found"
            } item reported successfully!`
        );


        document
            .getElementById("items")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// HERO BUTTONS
// ==========================================

reportLostBtn.addEventListener(
    "click",
    () => {

        document.querySelector(
            'input[name="type"][value="lost"]'
        ).checked = true;


        document
            .getElementById("report")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


reportFoundBtn.addEventListener(
    "click",
    () => {

        document.querySelector(
            'input[name="type"][value="found"]'
        ).checked = true;


        document
            .getElementById("report")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// ITEM DETAILS MODAL
// ==========================================

function openItemModal(id) {

    const item =
        items.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    const image = item.imageURL

        ? `
            <img
                src="${escapeHTML(item.imageURL)}"
                class="modal-image"
                alt="${escapeHTML(item.name)}"
            >
          `

        : `
            <div class="modal-placeholder">

                ${getCategoryIcon(item.category)}

            </div>
          `;


    modalBody.innerHTML = `

        ${image}

        <span
            class="
                status-badge
                ${
                    item.type === "lost"
                        ? "status-lost"
                        : "status-found"
                }
            "
            style="position:static; display:inline-block;"
        >

            ${
                item.type === "lost"
                    ? "Lost"
                    : "Found"
            }

        </span>


        <h2>
            ${escapeHTML(item.name)}
        </h2>


        <p class="modal-description">

            ${escapeHTML(item.description)}

        </p>


        <div class="modal-details">

            <p>
                <strong>Category:</strong>
                ${escapeHTML(item.category)}
            </p>

            <p>
                <strong>Location:</strong>
                ${escapeHTML(item.location)}
            </p>

            <p>
                <strong>Date:</strong>
                ${formatDate(item.date)}
            </p>

            <p>
                <strong>Contact:</strong>
                ${escapeHTML(item.contact)}
            </p>

        </div>

    `;


    itemModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    itemModal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


// ==========================================
// TOAST
// ==========================================

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove("show");

        },
        3000
    );

}


// ==========================================
// SEARCH EVENTS
// ==========================================

searchInput.addEventListener(
    "input",
    filterItems
);


typeFilter.addEventListener(
    "change",
    filterItems
);


categoryFilter.addEventListener(
    "change",
    filterItems
);


// ==========================================
// MOBILE MENU
// ==========================================

mobileMenuBtn.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

            }
        );

    });


// ==========================================
// DEFAULT DATE
// ==========================================

function setTodayDate() {

    const dateInput =
        document.getElementById("itemDate");

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


// ==========================================
// INITIALIZE
// ==========================================

setTodayDate();

displayItems(items);

updateStats();