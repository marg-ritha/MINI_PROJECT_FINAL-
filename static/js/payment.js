document.addEventListener("DOMContentLoaded", function () {
    const payBtn = document.getElementById("payBtn");
    const receiptBtn = document.getElementById("receiptBtn");
    const qrContainer = document.getElementById("qrContainer");
    const qrImage = document.getElementById("qrImage");
    const successModal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    payBtn.addEventListener("click", function () {
        // Disable Pay button to prevent multiple clicks
        payBtn.disabled = true;
        payBtn.textContent = "Processing...";

        // Show modal instead of alert
        successModal.style.display = "block";

        // Simulate API call to generate the QR Code
        fetch('/generate_bus_pass', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                qrImage.src = "data:image/png;base64," + data.qr_code;
                qrContainer.style.display = "block"; // ✅ Show QR only after payment
            } else {
                alert("QR Code Generation Failed: " + data.error);
            }
        })
        .catch(error => {
            alert("Error processing payment. Try again.");
            console.error("Payment error:", error);
            
            // Re-enable Pay button in case of error
            payBtn.disabled = false;
            payBtn.textContent = "Pay";
        });

        // Show the Print Receipt button
        receiptBtn.style.display = "block";
    });

    // Hide modal and remove processing button when "OK" is clicked
    closeModalBtn.addEventListener("click", function () {
        successModal.style.display = "none";
        payBtn.style.display = "none"; // ✅ Hide "Processing..." button after success
    });

    receiptBtn.addEventListener("click", function () {
        // Hide non-printable elements
        receiptBtn.style.display = "none";
        payBtn.style.display = "none";

        // Trigger the print dialog
        window.print();

        // Show only the Print button after printing (Pay button never comes back)
        setTimeout(() => {
            receiptBtn.style.display = "block"; 
        }, 1000);
    });
});
