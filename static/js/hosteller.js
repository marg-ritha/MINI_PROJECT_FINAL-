// Function to handle form submission for bus booking
function handleProceedToPayment(event) {
    event.preventDefault(); // Prevent default form submission

    const selectedBus = document.querySelector('input[name="selected_bus"]:checked');
    const reachDate = document.getElementById("reach_date").value;

    if (!selectedBus) {
        alert("Please select a bus before proceeding.");
        return;
    }
    if (!reachDate) {
        alert("Please select your expected arrival date.");
        return;
    }

    const selectedBusId = selectedBus.value;
    const availableSeats = document.querySelector(`#row-${selectedBusId} .available-seats`).textContent;

    if (parseInt(availableSeats) <= 0) {
        alert("No seats available for this bus. Please choose another.");
        return;
    }

    // Send POST request to the server
    fetch('/proceed_to_payment_hosteller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `selected_bus=${selectedBusId}&reach_date=${reachDate}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error. Please try again.");
        }
        return response.json();
    })
    .then(data => {
        if (data.updated_seats !== undefined) {
            const seatCell = document.querySelector(`#row-${selectedBusId} .available-seats`);
            if (seatCell) seatCell.textContent = data.updated_seats;

            // ✅ Redirect to Payment Page
            window.location.href = "/payment";  
        } else {
            alert(data.error || "Failed to update seats. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An unexpected error occurred. Please check console logs.");
    });
}

// Disable radio buttons for buses with no available seats
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".available-seats").forEach(cell => {
        const row = cell.closest("tr");
        const radioInput = row.querySelector('input[name="selected_bus"]');
        if (parseInt(cell.textContent) <= 0) {
            radioInput.disabled = true;
        }
    });

    // Attach event listener to the form
    document.getElementById("busSelectionForm").addEventListener("submit", handleProceedToPayment);
});
