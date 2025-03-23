document.addEventListener("DOMContentLoaded", function () {
    fetchBusData();
    
    document.getElementById("destinationSelect").addEventListener("change", function () {
        populateDropOffs(window.globalBusData);
    });
    
    document.querySelector("form").addEventListener("submit", function (event) {
        validateForm(event);
    });
});

async function fetchBusData() {
    try {
        const response = await fetch('/get_bus_info');
        const busData = await response.json();
        populateDestinationOptions(busData);
        window.globalBusData = busData;
    } catch (error) {
        console.error('Failed to fetch bus data:', error);
    }
}

function populateDestinationOptions(busData) {
    const destinationSelect = document.getElementById("destinationSelect");
    destinationSelect.innerHTML = "<option value=''>-- Select Destination --</option>";
    
    Object.keys(busData).forEach(destination => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        destinationSelect.appendChild(option);
    });
}

function populateDropOffs(busData) {
    const destination = document.getElementById("destinationSelect").value;
    const dropOffSelect = document.getElementById("dropOffSelect");
    dropOffSelect.innerHTML = "<option value=''>-- Select Drop-Off Location --</option>";

    if (destination && busData[destination]) {
        busData[destination].locations.forEach((loc, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = loc;
            dropOffSelect.appendChild(option);
        });
    }
}

function validateForm(event) {
    const duration = document.getElementById('duration').value;
    if (!duration) {
        alert('Please select a valid duration.');
        event.preventDefault();
    }
}
