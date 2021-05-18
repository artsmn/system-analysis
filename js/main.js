
const buildBtn = $('#build');
let addressesInpt = [];
let staticAddressesInpt = [];
const newAddressBtn = $('#new_address');
const inputBlock = $('#inputs');
const startBlock = $('#start');
const finishBlock = $('#finish');

let autocompleteList = [];


// console.log(adressesInpt);

let addresses = [];

buildBtn.click(buildRoute);
newAddressBtn.click(newAddress);

setTimeout(() => {
    newAddress(null, 'static', 'Початок', startBlock);
    newAddress(null, 'static', 'Кінець', finishBlock);
}, 1000);

function newAddress(event, type = 'dynamic', label = 'Опціональна', appendBlock = inputBlock) {
    appendBlock.append(
    '<div class="field is-horizontal">' +
        `<div class="field-label is-normal" style="flex-grow: 0">${label}</div>` +
        '<div class="field-body">' +
            '<div class="field">' +
            '<div class="control">' +
                `<input class="input" type="text" name="${ type === 'static' ? 'static_address' : 'address' }[]" placeholder="Address">` +
            '</div>' +
         '</div>' +
        '</div>' +
    '</div>'
    );

    if (type === 'static') {
        reloadStaticAddresses();
        autocompleteList.push(new google.maps.places.Autocomplete(staticAddressesInpt[staticAddressesInpt.length - 1], autocompleteOptions));
    } else {
        reloadAddresses();
        autocompleteList.push(new google.maps.places.Autocomplete(addressesInpt[addressesInpt.length - 1], autocompleteOptions));
    }
}

function buildRoute() {
    addresses = [];
    console.log([...addressesInpt, ...staticAddressesInpt]);
    [...addressesInpt, ...staticAddressesInpt].map(async function (el) {
        console.log(el);
        if (el.value) {
            let coordinates = await loadCoordinates(el.value);
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

function reloadStaticAddresses() {
    staticAddressesInpt = $('input[name="static_address[]"]');
}

async function loadCoordinates(address) {
    let res = await ajax({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replaceAll(', ', '+')}&key=AIzaSyCHzYIUHnh0qDnoHqHYuccC-wdrEGpp4nA`
        });
    return res.results[0].geometry.location;
}


