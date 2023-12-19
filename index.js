var productNameInput = document.getElementById('productNameInput');
var productpriceInput = document.getElementById('productpriceInput');
var productcategoryInput = document.getElementById('productcategoryInput');
var productdescInput = document.getElementById('productdescInput');
var submitBtn = document.getElementById('submitBtn');
var productsContainer = [];

if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem('products'))
    displayProduct();
};

submitBtn.onclick = function () {
    if (submitBtn.innerHTML == 'UPDATE') {
        changeProductDate();
    } else {
        addProduct();
    };
};

function addProduct() {
    if (validateProductName() == true) {
        if (validateProductPrice() == true) {
            if (validateProductCategory() == true) {
                if (validateProductDesc() == true) {
                    var product = {
                        name: productNameInput.value,
                        price: productpriceInput.value,
                        category: productcategoryInput.value,
                        description: productdescInput.value
                    };
                    productsContainer.push(product);
                    localStorage.setItem('products', JSON.stringify(productsContainer));
                    console.log(productsContainer);
                    clearForm();
                    displayProduct();
                } else {
                    alert('invaild description');
                }
            } else {
                alert('invaild category');
            }

        } else {
            alert('invaild price');
        }
    } else {
        alert('invaild name');
    }
};

function clearForm() {
    productNameInput.value = '';
    productpriceInput.value = '';
    productcategoryInput.value = '';
    productdescInput.value = '';
};

function displayProduct() {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `
                    <div class="col-md-4">
                        <div class="product-layer p-3 rounded-3 text-white">
                            <h2>${productsContainer[i].name}</h2>
                            <span class='badge bg-warning'>${productsContainer[i].category}</span>
                            <p class='fs-2 lead'>${productsContainer[i].price}$</p>
                            <span>${productsContainer[i].description}</span>
                            <div class="btns-container mt-2">
                                <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                                <button onclick="updateProduct(${i})" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
        `
    };
    document.getElementById('tableBody').innerHTML = cartoona;
};

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productsContainer));
    displayProduct();
};

var globelIndex;
function updateProduct(index) {
    globelIndex = index;
    productNameInput.value = productsContainer[index].name;
    productpriceInput.value = productsContainer[index].price;
    productcategoryInput.value = productsContainer[index].category;
    productdescInput.value = productsContainer[index].description;
    submitBtn.innerHTML = `UPDATE`;
};

function changeProductDate() {
    if (validateProductName() == true) {
        if (validateProductPrice() == true) {
            if (validateProductCategory() == true) {
                if (validateProductDesc() == true) {
                    productsContainer[globelIndex].name = productNameInput.value;
                    productsContainer[globelIndex].price = productpriceInput.value;
                    productsContainer[globelIndex].category = productcategoryInput.value;
                    productsContainer[globelIndex].description = productdescInput.value;
                    localStorage.setItem('products', JSON.stringify(productsContainer));
                    displayProduct();
                    submitBtn.innerHTML = `ADD`;
                    clearForm();
                } else {
                    alert('invaild description');
                }
            } else {
                alert('invaild category');
            }

        } else {
            alert('invaild price');
        }
    } else {
        alert('invaild name');
    }
};

function searchProduct(term) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `
            <div class="col-md-3">
                <div class="product-layer p-3 rounded-3 text-white">
                    <h2>${productsContainer[i].name}</h2>
                    <span class='badge bg-warning'>${productsContainer[i].category}</span>
                    <p class='fs-2 lead'>${productsContainer[i].price}$</p>
                    <span>${productsContainer[i].description}</span>
                    <div class="btns-container mt-2">
                        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                        <button onclick="updateProduct(${i})" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        `
        };
    };
    document.getElementById('tableBody').innerHTML = cartoona;
};


function validateProductName() {
    var regex = /^[A-Z][a-z]{3,10}\s?[a-z]{0,8}\s?[0-9]{0,3}\s?[a-z]{0,5}\s?[a-z]{0,5}$/;
    if (regex.test(productNameInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
function validateProductPrice() {
    var regex = /^[1-9][0-9]{2,5}$/;
    if (regex.test(productpriceInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
function validateProductCategory() {
    var regex = /^[A-Z][a-z]{1,10}$/;
    if (regex.test(productcategoryInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
function validateProductDesc() {
    var regex = /^\w{3,20}$/;
    if (regex.test(productdescInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
function validateProductSearch() {
    document.getElementById('SearchProductInput');
    var regex = /^\w{3,20}$/;
    if (regex.test(SearchProductInput.value) == true) {
        return true;
    }
    else {
        return false;
    }
}