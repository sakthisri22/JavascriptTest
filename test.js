let array = [];
const arrayDisplay = document.getElementById('arrayDisplay');
const elementInput = document.getElementById('elementInput');

function insertElement() {
    const value = elementInput.value.trim();
    if (!value) {
        alert('Please enter a value.');
        return;
    }

    // Update the display for the previous last element to remove green background
    const lastElement = document.querySelector('.element.highlight');
    if (lastElement) {
        lastElement.classList.remove('highlight'); // Remove highlight from the last element
    }

    // Add the new element to the array
    array.push(value);
    displayArray();
    elementInput.value = '';
}

function deleteElement() {
    const value = elementInput.value.trim();
    if (!value) {
        alert('Please enter a value to delete.');
        return;
    }

    const index = array.indexOf(value);
    if (index > -1) {
        const elementToDelete = document.getElementById(`element-${index}`);
        const deletingBox = document.createElement('div');
        deletingBox.className = 'deleting-box';
        deletingBox.textContent = 'Deleting...';
        
        // Replace the element with the deleting box
        elementToDelete.replaceWith(deletingBox);

        // Remove the element after 2 seconds
        setTimeout(() => {
            array.splice(index, 1);
            displayArray();
        }, 2000);
    } else {
        alert(`${value} is not found.`);
    }
    elementInput.value = '';
}

function findElement() {
    const value = elementInput.value.trim();
    if (!value) {
        alert('Please enter a value to find.');
        return;
    }

    clearHighlights(); // Clear existing highlights before finding
    if (array.includes(value)) {
        highlightElement(value);
    } else {
        alert(`${value} is not found.`);
    }
    elementInput.value = '';
}

function printElements() {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        element.style.backgroundColor = 'white'; // Change all backgrounds to white
        element.classList.remove('highlight', 'found'); // Remove highlight class
    });
    elementInput.value = '';
}

function displayArray() {
    arrayDisplay.innerHTML = ''; // Clear previous display
    if (array.length === 0) {
        arrayDisplay.innerHTML = '<p class="empty-message">Array is empty.</p>';
        return;
    }
    array.forEach((element, index) => {
        const div = document.createElement('div');
        div.textContent = element;
        div.className = 'element';
        div.id = `element-${index}`;
        arrayDisplay.appendChild(div);
        
        // Highlight the last inserted element
        if (index === array.length - 1) {
            div.classList.add('highlight'); // Highlight last inserted element
        }
    });
}

function highlightElement(value) {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (element.textContent === value) {
            element.classList.add('found'); // Highlight the found element in orange
        }
    });
}

function clearHighlights() {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        element.classList.remove('highlight', 'found'); // Remove highlight classes
    });
}
