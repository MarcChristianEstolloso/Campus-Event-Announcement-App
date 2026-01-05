let events = JSON.parse(localStorage.getItem("events")) || [];

const eventList = document.getElementById("event-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents() {
    eventList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filter = filterSelect.value;
    const today = new Date().toISOString().split("T")[0];

    events
        .filter(event =>
            event.title.toLowerCase().includes(searchText)
        )
        .filter(event => {
            if (filter === "upcoming") return event.date >= today;
            if (filter === "past") return event.date < today;
            return true;
        })
        .forEach((event, index) => {
            const card = document.createElement("div");
            card.className = "event-card";
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date}</p>
                <p>${event.description}</p>
                <button class="delete-btn" onclick="deleteEvent(${index})">
                    🗑 Delete
                </button>
            `;
            eventList.appendChild(card);
        });
}

function deleteEvent(index) {
    if (confirm("Are you sure you want to delete this event?")) {
        events.splice(index, 1);
        saveEvents();
        renderEvents();
    }
}


function openForm() {
    document.getElementById("modal").style.display = "flex";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}

function addEvent() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    if (!title || !date || !description) {
        alert("Please fill all fields");
        return;
    }

    events.push({ title, date, description });
    saveEvents();
    renderEvents();
    closeForm();

    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}

searchInput.addEventListener("input", renderEvents);
filterSelect.addEventListener("change", renderEvents);

renderEvents();
