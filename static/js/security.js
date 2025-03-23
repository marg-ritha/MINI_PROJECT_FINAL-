document.addEventListener("DOMContentLoaded", function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        console.log("Raw Scanned Content:", content);
        let formattedQRData = content.replace(/:\s?/g, ': ');
        document.getElementById('scanResult').innerHTML = `<strong>DETAILS:</strong><br>${formattedQRData.replace(/\n/g, '<br>')}`;
        let qrData = content;

        // Send scanned data to the server for verification
        fetch('/verify_qr_code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qr_data: qrData })
        })
        .then(response => response.json())
        .then(data => {
            const messageElement = document.getElementById('verificationMessage');
            messageElement.innerText = data.message;
            messageElement.className = data.status === 'success' ? 'success' : 'error';

            // Display student photo if available
            const photoContainer = document.getElementById('photoContainer');
            const studentPhoto = document.getElementById('studentPhoto');

            if (data.photo_url) {
                studentPhoto.src = data.photo_url;
                photoContainer.style.display = 'block';
            } else {
                photoContainer.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const messageElement = document.getElementById('verificationMessage');
            messageElement.innerText = "Error verifying QR Code!";
            messageElement.className = 'error';
        });
    });

    // Start scanner when the page loads
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]).catch(function (e) {
                console.error("Camera access error:", e);
                alert("Unable to access camera. Please check browser permissions.");
            });
        } else {
            alert("No cameras found. Please connect a camera.");
        }
    }).catch(function (e) {
        console.error("Camera detection error:", e);
        alert("Error accessing camera.");
    });
});
