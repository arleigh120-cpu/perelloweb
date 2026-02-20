
        // I-save ang data sa browser's localStorage para manatili kahit i-refresh
        function saveRegistration() {
            // Kunin at i-validate ang mga input
            const firstName = document.getElementById('firstName').value.trim();
            const middleInitial = document.getElementById('middleInitial').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const age = document.getElementById('age').value.trim();
            const gmail = document.getElementById('gmail').value.trim();
            const messageDiv = document.getElementById('regMessage');

            // Suriin kung lahat ng field ay puno
            if (!firstName || !middleInitial || !lastName || !age || !gmail) {
                messageDiv.textContent = "Error: Fill in all required fields!";
                messageDiv.style.color = "red";
                return;
            }

            // Suriin kung valid ang Gmail format
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!gmailRegex.test(gmail)) {
                messageDiv.textContent = "Error: Enter a valid Gmail account!";
                messageDiv.style.color = "red";
                return;
            }

            // Gumawa ng object para sa registration data
            const regData = {
                firstName: firstName,
                middleInitial: middleInitial,
                lastName: lastName,
                age: age,
                gmail: gmail
            };

            // Kunin ang existing data mula sa localStorage o gumawa ng bagong array
            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            registeredUsers.push(regData);

            // I-save muli sa localStorage
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            // Ipakita ang success message at linisin ang form
            messageDiv.textContent = "Success: Registration saved!";
            messageDiv.style.color = "green";
            clearForm();

            // I-update ang display ng stored data
            displayStoredData();
        }

        // Linisin ang mga input fields
        function clearForm() {
            document.getElementById('firstName').value = "";
            document.getElementById('middleInitial').value = "";
            document.getElementById('lastName').value = "";
            document.getElementById('age').value = "";
            document.getElementById('gmail').value = "";
        }

        // Ipakita ang lahat ng naka-store na data
        function displayStoredData() {
            const container = document.getElementById('storedDataContainer');
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Kung walang data
            if (registeredUsers.length === 0) {
                container.innerHTML = "<p style='text-align:center;'>No registered information yet.</p>";
                return;
            }

            // Ipakita ang bawat entry
            let html = "";
            registeredUsers.forEach((user, index) => {
                html += `
                    <div class="stored-data-item">
                        <p><strong>Registration #${index + 1}</strong></p>
                        <p>Full Name: ${user.firstName} ${user.middleInitial}. ${user.lastName}</p>
                        <p>Age: ${user.age}</p>
                        <p>Gmail: ${user.gmail}</p>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // Ipakita ang data pagka-load ng page
        window.onload = displayStoredData;
    