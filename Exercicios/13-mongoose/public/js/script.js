const priceInput = document.getElementById('price-input')
const nameInput = document.getElementById('name-input')
const skuInput = document.getElementById('sku-input')
const addGaleryInputButton = document.getElementById('add-galery-input')

let galeryCounter = 0

function isNumeric(value) {
    var regex = /^[0-9.,]*$/;
    return regex.test(value);
}
function formatSku(value) {
    value = value.replace(/\s+/g, '-');
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    value = value.replace(/[^a-zA-Z0-9-]/g, '');
    return value;
}

function addMediaInput() {
    const formControl = document.createElement('div')
    formControl.className = 'form-control'

    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.name = 'gallery['+ galeryCounter +']'
    newInput.placeholder = 'Insira o link da mídia'

    formControl.appendChild(newInput)

    document.querySelector('.form-galery').appendChild(formControl)
    galeryCounter ++
};



skuInput.addEventListener('input', function(e){
    skuInput.value = formatSku(skuInput.value)
})

nameInput.addEventListener('input', function(e){
    skuInput.value = formatSku(nameInput.value)
})

addGaleryInputButton.addEventListener('click', addMediaInput)

priceInput.addEventListener('input', function (e) {
    let value = e.target.value;
    
    value = value.replace(',', '.');

    if (!isNumeric(value)) {
        e.target.value = value.slice(0, -1);
    } else {
        const parts = value.split('.');
        if (parts.length > 2) {
            e.target.value = value.slice(0, -1);
        } else {
            e.target.value = value;
        }
    }
});

