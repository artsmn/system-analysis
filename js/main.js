
const buildBtn = $('#build');
let addressesInpt = $('input[name="address[]"]');
const newAddressBtn = $('#new_address');
const inputBlock = $('#inputs');

let autocompleteList = [];


// console.log(adressesInpt);

let addresses = [];

buildBtn.click(buildRoute);
newAddressBtn.click(newAddress);

function newAddress() {
    inputBlock.append(
    '<div class="field is-horizontal">' +
        `<div class="field-label is-normal" style="flex-grow: 0">${addressesInpt.length + 1}. </div>` +
        '<div class="field-body">' +
            '<div class="field">' +
            '<div class="control">' +
                '<input class="input" type="text" name="address[]" placeholder="Address">' +
            '</div>' +
         '</div>' +
        '</div>' +
    '</div>'
    );
    reloadAddresses();
    autocompleteList.push(new google.maps.places.Autocomplete(addressesInpt[addressesInpt.length - 1], autocompleteOptions))
}

function buildRoute() {
    addresses = [];
    addressesInpt.map(async function () {
        console.log(this.value);
        if (this.value) {
            let coordinates = await loadCoordinates(this.value);
            new google.maps.Marker({
                position: coordinates,
                map,
                title: "Hello World!",
                });
            addresses.push(coordinates);
        }
    });
    
    console.log(addresses);
}

function reloadAddresses() {
    addressesInpt = $('input[name="address[]"]');
}

async function loadCoordinates(address) {
    let res = await ajax({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replaceAll(', ', '+')}&key=AIzaSyCHzYIUHnh0qDnoHqHYuccC-wdrEGpp4nA`
        });
    return res.results[0].geometry.location;
}

setTimeout(() => {
    for (let i = 0; i < 3; i++) newAddress();
}, 1000);
