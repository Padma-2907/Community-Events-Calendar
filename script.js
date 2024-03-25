// Sample events array
let events = [
    { id: 1, name: "Community Cleanup", date: "2024-04-15" },
    { id: 2, name: "Food Drive", date: "2024-05-01" },
    // Add more events as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('events-list');
    const addEventBtn = document.getElementById('add-event-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const saveEventBtn = document.getElementById('save-event-btn');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');

    // Display existing events
    displayEvents();

    // Event listener to open modal
    addEventBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Event listener to close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Event listener to add new event
    saveEventBtn.addEventListener('click', function() {
        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;

        if (eventName && eventDate) {
            const newEvent = { id: generateId(), name: eventName, date: eventDate };
            events.push(newEvent);
            displayEvents();
            modal.style.display = 'none';
            eventNameInput.value = '';
            eventDateInput.value = '';
        } else {
            alert('Please enter both event name and date.');
        }
    });

    // Function to display events
    function displayEvents() {
        eventsList.innerHTML = '';
        events.forEach(function(event) {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event');
            eventItem.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${event.date}</p>
                <button class="btn btn-danger btn-sm delete-event-btn" data-id="${event.id}">Delete</button>
            `;
            eventsList.appendChild(eventItem);
        });

        // Event listener to delete event
        const deleteButtons = document.querySelectorAll('.delete-event-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const eventId = parseInt(button.getAttribute('data-id'));
                events = events.filter(event => event.id !== eventId);
                displayEvents();
            });
        });
    }

    // Function to generate unique ID for events
    function generateId() {
        return Math.floor(Math.random() * 10000) + 1;
    }
});
