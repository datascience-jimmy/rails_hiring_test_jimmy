export function renderForm(data) {
    return `
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="relative bg-white w-full max-w-2xl p-8 border border-gray-300 rounded-lg shadow-lg space-y-6">
          
          <!-- Close Button -->
          <button type="button" 
                  class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 text-2xl hover:font-bold"
                  data-action="edit-polling-location#cancel">
            &times;
          </button>

          <form action="/ridings/1/polling_locations/${data.pollingLocationId}" accept-charset="UTF-8" method="post" data-edit-polling-location-target="form">
            <input type="hidden" name="_method" value="patch" autocomplete="off">
            <input type="hidden" name="authenticity_token" value="49FoNmccZVook2aAUgocNPEZfvXTa1wYuxaBU9efB6MDM4OUvjv66g-jPuKzoWJbSFYJVutgl3U5pcyVbTZtCQ" autocomplete="off">

            <!-- Form Title -->
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Polling Location</h2>
            
            
            <!-- General Error Display -->
            <div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mt-1 hidden" role="alert" data-edit-polling-location-target="generalError">
            </div>
            
            <!-- Title Field -->
            <div class="mt-5">
              <input type="hidden" name="polling_location[id]" value="${data.pollingLocationId}">
              <label class="block text-sm font-bold text-gray-700" for="polling_location_title">Title</label>
              <input class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              type="text" value="${data.pollingLocationTitle}" name="polling_location[title]" id="polling_location_title" data-edit-polling-location-target="title">
              <div class="text-red-500 text-sm mt-1 hidden" data-edit-polling-location-target="titleError"></div>
            </div>
        
            <!-- Address Field -->
            <div class="mt-5">
              <label class="block text-sm font-bold text-gray-700" for="polling_location_address">Address</label>
              <input class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              type="text" value="${data.pollingLocationAddress}" name="polling_location[address]" id="polling_location_address" data-edit-polling-location-target="address">
              <div class="text-red-500 text-sm mt-1 hidden" data-edit-polling-location-target="addressError"></div>
            </div>
        
            <!-- City Field -->
            <div class="mt-5">
              <label class="block text-sm font-bold text-gray-700" for="polling_location_city">City</label>
              <input class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              type="text" value="${data.pollingLocationCity}" name="polling_location[city]" id="polling_location_city" data-edit-polling-location-target="city">
              <div class="text-red-500 text-sm mt-1 hidden" data-edit-polling-location-target="cityError"></div>
            </div>
        
            <!-- Postal Code Field -->
            <div class="mt-5">
              <label class="block text-sm font-bold text-gray-700" for="polling_location_postal_code">Postal Code</label>
              <input class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              type="text" value="${data.pollingLocationPostalCode}" name="polling_location[postal_code]" id="polling_location_postal_code" data-edit-polling-location-target="postalCode">
              <div class="text-red-500 text-sm mt-1 hidden" data-edit-polling-location-target="postalCodeError"></div>
            </div>
        
            <!-- Polls Field -->
            <div class="mt-5">
              <label class="block text-sm font-bold text-gray-700" for="polling_location_polls">Polls</label>
              <input value="${data.pollingLocationPolls}" class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              type="text" name="polling_location[polls]" id="polling_location_polls" data-edit-polling-location-target="polls">
              <div class="text-red-500 text-sm mt-1 hidden" data-edit-polling-location-target="pollsError"></div>
            </div>
        
            <!-- Action Buttons -->
            <div class="flex items-center justify-between space-x-4 mt-6">
              <button type="button"
              class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-lg 
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              data-action="edit-polling-location#save">
                Save
              </button>
              
              <button type="button" 
              class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white
              bg-gray-500 shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" 
              data-action="edit-polling-location#cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
}


export function displayedGeneralErrors(errors) {
    return `
            <div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mt-1" role="alert">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-11.707a1 1 0 011.414 0L10 6.586l.293-.293a1 1 0 111.414 1.414L11.414 8l.293.293a1 1 0 01-1.414 1.414L10 9.414l-.293.293a1 1 0 01-1.414-1.414L8.586 8 8.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm">
                            ${errors.join("<br>")}
                        </p>
                    </div>
                </div>
            </div>
        `;
}



export function showAndClearGeneralMessages(controller, messages, duration = 1000) {
    // Show the general messages
    showGeneralMessages(controller, messages);

    // Set a timeout to clear the messages after the specified duration
    setTimeout(() => {
        clearGeneralMessages(controller);
    }, duration);
}

export function showGeneralMessages(controller, messages) {
    const messageBoxTarget = controller.messageBoxTarget;
    messageBoxTarget.innerHTML = renderGeneralMessages(messages);

    // Ensure visibility with a smooth transition
    messageBoxTarget.classList.remove('hidden');
    messageBoxTarget.classList.add('block', 'opacity-0');

    // Trigger transition by adding the opacity class after a short delay
    requestAnimationFrame(() => {
        messageBoxTarget.classList.remove('opacity-0');
        messageBoxTarget.classList.add('opacity-100', 'transition-opacity', 'duration-300');
    });
}

export function clearGeneralMessages(controller) {
    const messageBoxTarget = controller.messageBoxTarget;

    // Add transition effect for clearing messages
    messageBoxTarget.classList.remove('opacity-100');
    messageBoxTarget.classList.add('opacity-0', 'transition-opacity', 'duration-300');

    // Remove content after transition ends
    setTimeout(() => {
        messageBoxTarget.classList.add('hidden');
        messageBoxTarget.classList.remove('block', 'transition-opacity', 'duration-300');
        messageBoxTarget.innerHTML = '';
    }, 300); // Match this duration to the CSS transition duration
}

export function renderGeneralMessages(messages) {
    return `
        <div class="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md mt-1" role="alert">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-11.707a1 1 0 011.414 0L10 6.586l.293-.293a1 1 0 111.414 1.414L11.414 8l.293.293a1 1 0 01-1.414 1.414L10 9.414l-.293.293a1 1 0 01-1.414-1.414L8.586 8 8.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm">
                            ${messages.join("<br>")}
                        </p>
                    </div>
                </div>
            </div>
        `;
}





