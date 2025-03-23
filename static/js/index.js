document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("adminButton").addEventListener("click", function() {
        window.location.href = "/login?role=admin";
    });

    document.getElementById("securityButton").addEventListener("click", function() {
        fetch("/set_security_role")
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    window.location.href = "/security_qr_scanner";
                }
            })
            .catch(error => console.error('Error:', error));
    });
});
