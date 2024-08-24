import { Controller } from "@hotwired/stimulus"
import {renderForm, showGeneralMessages} from "./polling_location/template";
import {showErrors, validateForm} from "./polling_location/validations";
import {updatePollingLocation} from "./polling_location/api";

export default class extends Controller {
    static targets = [
        "display", "formContainer", "editButton", "form", "modalForm",
        "cancelButton", "modalContainer", "title", "address", "city",
        "postalCode", "polls", "titleError", "addressError", "cityError", "postalCodeError", "pollsError", 'generalError',
        'messageBox'
    ];

    edit(event) {
        event.preventDefault();
        console.log("Editing polling location...");
        const button = event.currentTarget;
        const modalHTML = renderForm(button.dataset);

        // Highlight the polling-location-row
        this.clearPreviousHighlights();
        button.closest('.polling-location-row').classList.add('p-2', 'bg-gray-200', 'font-bold', 'border-b-2', 'border-gray-400');

        this.modalContainerTarget.innerHTML = modalHTML;

        this.modalContainerTarget.style.display = "flex";
    }

    cancel(event) {
        event.preventDefault();

        this.modalContainerTarget.style.display = "none";

        // Clear the modal content
        this.modalContainerTarget.innerHTML = '';

        this.clearPreviousHighlights();
    }

    save(event) {
        event.preventDefault();

        const errors = validateForm(this);
        if (Object.keys(errors).length > 0) {
            showErrors(this, errors);
        } else {
            updatePollingLocation(this, event);
            this.clearPreviousHighlights();
        }
    }

    clearPreviousHighlights() {
        const highlightedRow = this.element.querySelector('.polling-location-row.bg-gray-200');
        if (highlightedRow) {
            highlightedRow.classList.remove('p-2', 'bg-gray-200', 'font-bold', 'border-b-2', 'border-gray-400');
        }
    }
}
