const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');
function toggleMode() {
  body.classList.toggle('dark-mode');

  const modeMessage = body.classList.contains('dark-mode') ?
    'Dark-mode' : "LightMode"

  modeStatus.innerText = "Currently in " + modeMessage;
}
modeToggle.addEventListener('click', toggleMode);




const images = document.querySelectorAll('#slider1 img');
const previousImage = document.getElementById("prev");
const nextImage = document.getElementById("next");
let currentIndex = 0;
function reset() {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
  }
}
function initializeSlider() {
  reset();
  images[currentIndex].classList.add('active');
}
function slideLeft() {
  reset();
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  images[currentIndex].classList.add('active');
}

function slideRight() {
  reset();
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  images[currentIndex].classList.add('active');
}
initializeSlider();

previousImage.addEventListener('click', function () {
  slideLeft();
});

nextImage.addEventListener('click', function () {
  slideRight();
});

// Write your code here
const draggables = document.querySelectorAll('.draggable');
const dropzone = document.querySelector('.dropzone');


// For each draggable item, set data for drop zone (draggable element ID) and add "dragging-active" class
for (const draggable of draggables) {
  draggable.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    draggable.classList.add('dragging-active');
  });

  // Remove "dragging-active" class when dragging ends
  draggable.addEventListener('dragend', (event) => {
    draggable.classList.remove('dragging-active');
  })
}

// Allow drop (drop not allowed by default)
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
});


// Append current draggable element to dropzone
dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  const draggableId = event.dataTransfer.getData('text/plain');
  const element = document.getElementById(draggableId);

  // Check if dropzone has only one child element and if it is the placeholder element
  // If TRUE, use replaceChild() to the replace the placeholder with a draggable element
  // If FALSE, use appendChild() to add the draggable element to the dropzone
  if (
    dropzone.children.length === 1
    &&
    dropzone.children[0].classList.contains('dropzone-placeholder')
  ) {
    dropzone.replaceChild(element, dropzone.children[0]);
  } else {
    dropzone.appendChild(element);
  }
});
// Write your code here
// Get all the necessary DOM elements
const form = document.getElementById('exampleForm')
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')
// Store all form elements in an array by spreading the elements property of the form
const formElements = [...form.elements]
// Create function to check if all form elements are valid
const allInputsValid = () => {
  const valid = formElements.every((element) => {
    if (element.nodeName === 'SELECT') {
      return element.value !== 'Please select an option'
    } else {
      return element.checkValidity()
    }
  })


  return valid
}
// Define a function to handle changes to any form element
const handleChange = () => {
  // Use the forEach() function to execute the provided function once for each element in the formElements array
  formElements.forEach((element) => {
    // If the element is invalid and is not a button, a select dropdown, a checkbox, or a radio button, style it with a red border and red text
    if (!element.checkValidity()
      && element.nodeName !== 'BUTTON'
      && element.nodeName !== 'SELECT'
      && element.type !== 'checkbox'
      && element.type !== 'radio'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }

    // If the element is valid, reset its style to the original colors
    // The conditions are the same as above for excluding certain elements
    if (element.checkValidity()
      && element.nodeName !== 'BUTTON'
      && element.nodeName !== 'SELECT'
      && element.type !== 'checkbox'
      && element.type !== 'radio'
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#CED4DA'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }

    // If the element is a checkbox or a radio button and is invalid, style it with a red border and red text
    if (!element.checkValidity()
      && (element.type === 'checkbox'
        || element.type === 'radio')
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
    }

    // If the checkbox or radio button is valid, reset its style to the original colors
    if (element.checkValidity()
      && (element.type === 'checkbox'
        || element.type === 'radio')
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#212529'
    }

    // If the element is a select dropdown and the default option is selected, style it with a red border and red text
    if (element.nodeName === 'SELECT'
      && element.value === 'Please select an option'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }

    // If an option other than the default is selected in the dropdown, reset its style to the original colors
    if (element.nodeName === 'SELECT'
      && element.value !== 'Please select an option'
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#CED4DA'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }
  })

  // If all form elements are valid, enable the submit button; otherwise, disable it
  if (allInputsValid()) {
    submitButton.removeAttribute('disabled', '')
  } else {
    submitButton.setAttribute('disabled', '')
  }
}
// Define a function to handle form submission
const handleSubmit = (e) => {
  // Prevent the default form submission behavior
  e.preventDefault()

  // If all form elements are valid after the form submission, display a success message, reset the form, and disable the submit button
  if (allInputsValid()) {
    successMessage.style.display = 'block'
    form.reset()
    submitButton.setAttribute('disabled', '')

    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 3000)
  }
}
// Add event listener to each form element
formElements.forEach((element) => {
  element.addEventListener('change', handleChange)
})

// Add submit listener to the form
form.addEventListener('submit', (e) => handleSubmit(e))


//map of my home using Leaflet.
const map = L.map('map').setView([43.096214, //latitude
  -79.037743], //longitude
  13);    //zoom

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: 'Copyright Google Maps'
}).addTo(map);

//Adding marker to the map.
var marker = L.marker([40.399010, -80.085960]).addTo(map);
//Adding circle to the map.
var circle = L.circle([40.399010, -80.085960], {
  radius: 600
}).addTo(map);
//Adding polygon to the map.
var latlngs = [
  [40.39, -80.07],
  [40.38, -80.06],
  [40.40, -80.05]
];
var polygon = L.polygon(latlngs, {
  color: 'red',
  fillOpacity: 0.3,
  weight: 6
}).addTo(map);
//Adding popups to the map.
var popup = L.popup().setLatLng([40.399010, -80.085960]).setContent("Testing a popup.").openOn(map);
marker.bindPopup("Home").openPopup();
circle.bindPopup("<b>Testing!</b>I am a circle.");
polygon.bindPopup("Testing a polygon.");

//Creating function to react user interaction.
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);


