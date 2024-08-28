import {showErrors} from "./validations";
import {showAndClearGeneralMessages} from "./template";

export function updatePollingLocation(controller, event) {
    // Extract form data
    const formData = new FormData(controller.formTarget);

    // Extract necessary information from the form's action attribute
    const actionUrl = controller.formTarget.getAttribute("action");
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Submit the form via a fetch request
    fetch(actionUrl, {
        method: "PATCH",
        headers: {
            "X-CSRF-Token": csrfToken,
            "Accept": "application/json"
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.json();
            }
        })
        .then(data => {

            if (data.data) {
                // Close the modal
                controller.modalContainerTarget.style.display = "none";
                controller.modalContainerTarget.innerHTML = '';

                // Find the selected row and update its content
                const row = controller.element.querySelector(`button[data-polling-location-id="${data.data.id}"]`).closest('.polling-location-row');

                // Assuming `row` is the reference to the polling location row that needs updating.
                const displayTargets = row.querySelectorAll('[data-edit-polling-location-target="display"]');

                // Check if the number of display targets matches the expected fields
                if (displayTargets.length === 5) {
                    // Update each display element with the corresponding data
                    displayTargets[0].innerHTML = `<span>${data.data.title}</span>`;
                    displayTargets[1].innerHTML = `<span>${data.data.address}</span>`;
                    displayTargets[2].innerHTML = `<span>${data.data.city}</span>`;
                    displayTargets[3].innerHTML = `<span>${data.data.postal_code}</span>`;
                    displayTargets[4].innerHTML = `<span>${data.data.polls}</span>`;
                } else {
                    console.error('Unexpected number of display targets found:', displayTargets.length);
                }

                const successMessage = `Polling location "${data.data.title}" has been updated successfully.`;
                showAndClearGeneralMessages(controller, [successMessage], 3000);
            }
        })
        .catch(async error => {
            const errorData = await error;
            if (errorData && errorData.errors) {
                // Update the frontend with the specific error messages
                showErrors(controller, { general: errorData.errors });
            }
        });
}
