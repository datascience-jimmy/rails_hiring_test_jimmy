import {displayedGeneralErrors} from "./template";

export function validateForm(controller) {
    const errors = {
        title: [],
        address: [],
        city: [],
        postalCode: [],
        polls: []
    };

    clearErrors(controller);

    if (!controller.titleTarget.value.trim()) {
        errors.title.push("Title is required.");
    }
    if (!controller.addressTarget.value.trim()) {
        errors.address.push("Address is required.");
    }
    if (!controller.cityTarget.value.trim()) {
        errors.city.push("City is required.");
    }

    const postalCodeValue = controller.postalCodeTarget.value.trim();

    if (!postalCodeValue) {
        errors.postalCode.push("Postal code is required.");
    } else if (!validatePostalCode(postalCodeValue)) {
        errors.postalCode.push("Postal code must be valid.");
    }

    const pollNumbersError = validatePollNumbers(controller.pollsTarget.value.trim());
    if (pollNumbersError) {
        errors.polls.push(pollNumbersError);
    }

    Object.keys(errors).forEach(key => {
        if (errors[key].length === 0) {
            delete errors[key];
        }
    });

    return errors;
}

function validatePostalCode(postalCode) {
    const postalCodePattern = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalCodePattern.test(postalCode);
}

function validatePollNumbers(pollNumbers) {
    if (!pollNumbers) {
        return null; // Poll numbers are not required
    }

    const pollNumberArray = pollNumbers.split(',').map(num => num.trim());
    const uniquePollNumbers = new Set();

    for (let num of pollNumberArray) {
        if (!/^\d+$/.test(num)) {
            return "Poll numbers must be numeric.";
        }
        const numberValue = parseInt(num, 10);
        if (numberValue <= 0) {
            return "Poll numbers must be greater than zero.";
        }
        if (uniquePollNumbers.has(numberValue)) {
            return "Poll numbers must be unique.";
        }
        uniquePollNumbers.add(numberValue);
    }

    return null; // No errors
}

export function showErrors(controller, errors) {
    // Handling general errors
    if (errors.general) {
        const generalErrorTarget = controller.generalErrorTarget;
        generalErrorTarget.innerHTML = displayedGeneralErrors(errors.general);

        // Ensure visibility
        generalErrorTarget.classList.remove('hidden');
        generalErrorTarget.classList.add('block');
    }

    Object.keys(errors).forEach(field => {
        const errorMessages = errors[field];
        const errorTarget = controller[`${field}ErrorTarget`];
        errorTarget.innerHTML = errorMessages.join("<br>");
        errorTarget.classList.remove("hidden");
    });
}

export function clearErrors(controller) {
    controller.titleErrorTarget.textContent = "";
    controller.addressErrorTarget.textContent = "";
    controller.cityErrorTarget.textContent = "";
    controller.postalCodeErrorTarget.textContent = "";
    controller.pollsErrorTarget.textContent = "";

    controller.titleErrorTarget.classList.add("hidden");
    controller.addressErrorTarget.classList.add("hidden");
    controller.cityErrorTarget.classList.add("hidden");
    controller.postalCodeErrorTarget.classList.add("hidden");
    controller.pollsErrorTarget.classList.add("hidden");
}
