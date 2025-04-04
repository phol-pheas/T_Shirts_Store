const color = document.querySelectorAll('.color');
const imgActive = document.querySelectorAll('.imgActive');
const imgShowrp = document.querySelectorAll('.imgShowrp');
const containerClickchangeImg = document.querySelectorAll('.containerClickchangeImg');
const activeSpan = document.querySelectorAll('.activeSpan');
let countImage = 0;
containerClickchangeImg.forEach(item => {
    item.addEventListener('click', event => {

        if (event.target.id === 'left') {
            countImage--;
            if (countImage < 0) {
                countImage = imgShowrp.length - 1;
            }
        } else if (event.target.id === 'right') {
            countImage++;
            if (countImage > 3) {
                countImage = 0;
            }
        }
        imgShowrp.forEach(item => item.classList.remove('active'));
        imgShowrp[countImage].classList.add('active');

        activeSpan.forEach(item => item.classList.remove('active'));
        activeSpan[countImage].classList.add('active');
    })
})

// color click
color.forEach((item, i) => {
    item.addEventListener('click', () => {

        countImage = i + 1;

        activeSpan.forEach(item => item.classList.remove('active'));
        activeSpan[i + 1].classList.add('active');

        color.forEach(item => item.classList.remove('activeColor'))
        item.classList.add('activeColor');

        imgShowrp.forEach(item => item.classList.remove('active'));
        imgActive[i].classList.add('active');
        addToCart.removeAttribute('disabled', '')
    })
})
const sizes = document.querySelectorAll('.size');
sizes.forEach(item => {
    item.addEventListener('click', () => {
        sizes.forEach(size => size.classList.remove('active'));
        item.classList.add('active');
    });
});


const cartbox = document.querySelector('.cartbox');
const addToCart = document.querySelector('.addToCart');
const containerAlertOrder = document.querySelector('.containerAlertOrder');
const loadingAdd = document.querySelector('.loadingAdd');

// loading 
const containerSavingLoading = document.querySelector('.containerSavingLoading');
const overlayLoading = document.querySelector('.overlayLoading');


addToCart.addEventListener('click', event => {

    const containerAddCart = event.target.closest('.containerAddCart');
    const imgAddtoCart = containerAddCart.querySelectorAll('.imgAddToCart');
    const dataId = containerAddCart.dataset.id;
    const colorActive = containerAddCart.querySelector('.color.activeColor');
    const dataPrice = containerAddCart.dataset.price;
    const title = containerAddCart.querySelector('.title').textContent;
    const sizeActive = containerAddCart.querySelector('.size.active');
    const price = containerAddCart.querySelector('.price').textContent;

    if (!sizeActive || !colorActive) {
        alert("Please select a color and size before adding to cart!");
        return;
    }

    addToCart.textContent = "Adding...";
    overlayLoading.classList.add('active');
    document.body.classList.add('active');
    loadingAdd.classList.remove('hidden');
    setTimeout(() => {
        addToCart.textContent = 'Add to cart'
        document.body.classList.remove('active');
        overlayLoading.classList.remove('active');
        loadingAdd.classList.add('hidden');

        let getdata = JSON.parse(localStorage.getItem('getData')) || [];
        let idDataSize = document.querySelector('.size.active').dataset.idSize;

        const colorMacth = colorActive.dataset.color;
        let dataSize = sizeActive.dataset.name;
        let dataStock = parseInt(sizeActive.dataset.stock);

        const existItem = getdata.findIndex(item => item.title === title && item.size === sizeActive.textContent.trim() && item.color === colorActive.dataset.color);
        if (existItem !== -1) {
            if (getdata[existItem].dataStock <= 1) {
                alert(`Sorry ${title} size: ${dataSize} color: ${colorMacth} out-of-stock now!`);
                return;
            }

            getdata[existItem].dataStock = parseInt(getdata[existItem].dataStock) - 1;
            getdata[existItem].quantity = parseInt(getdata[existItem].quantity) + 1;
            localStorage.setItem('getData', JSON.stringify(getdata));
            updateCount();
            let containerCountCreate = cartbox.querySelectorAll('.containerCountCreate');
            let containerSize = cartbox.querySelectorAll('.containerSize');
            let existItemSize = containerSize[existItem];
            let itemExist = containerCountCreate[existItem];
            existItemSize.querySelector('.sizeCreate').dataset.stock = getdata[existItem].dataStock;
            itemExist.querySelector('.quantityCreate').textContent = getdata[existItem].quantity;
            updatePrice();
            totalPrice();
            alertComplete();
            return;
        }

        imgAddtoCart.forEach(item => {

            const imgData = item.dataset.color;

            if (imgData === colorMacth) {
                const img = item.src;
                const getdataStorage = {
                    id: dataId,
                    img: img,
                    title: title,
                    originalP: dataPrice,
                    size: dataSize,
                    quantity: 1,
                    color: colorMacth,
                    price: price,
                    sizeId: idDataSize,
                    dataStock: dataStock
                }
                getdata.push(getdataStorage);

                localStorage.setItem('getData', JSON.stringify(getdata));
                const cartItem = document.createElement('div');
                cartItem.setAttribute('data-id', dataId);
                cartItem.setAttribute('data-price', dataPrice)
                cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'cartItem', 'border-bottom');
                cartItem.innerHTML = `
            <div class='containerImgCreate'><img src="${img}" width="60px" height="60px"> <div class="vr"></div></div>
            <div class='contianerContentCreate text-center'>
            <div class="d-flex align-items-center gap-2">
            <h6 class="titleCreate" style="font-size:15px;">${title}</h6>
            <h6 class="colorCreate" style="font-size:15px;">-${colorMacth}</h6>
            </div>

            <div class='containerSize d-flex align-items-center justify-content-center gap-4'>
            <h6 class="sizeTitle">Size:</h6>
            <h6 class="sizeCreate" data-id-size="${idDataSize}" data-stock="${dataStock}">${dataSize}</h6>
            </div>

            <div class="containerCountCreate btn-group btn-group-md">
                        <button class="btn btn-outline-secondary" id="decreaseCreaet">-</button>
                        <button class="btn btn-outline-secondary quantityCreate">1</button>
                        <button class="btn btn-outline-secondary" id="increaseCreate">+</button>
                    </div>
            </div>

            <div class="containerRemove d-block">

            <i class="bi bi-trash-fill removeCart"></i>

            <h6 class="priceCreate" style="font-size:14px; margin-top:10px;">${price}</h6>
            </div>
            `;
                cartbox.appendChild(cartItem);

                updateCount();
                updateContainerNoItem();
                totalPrice();

                alertComplete();


                cartItem.querySelector('.removeCart').addEventListener('click', () => {

                    overlayLoading.classList.add('active');
                    containerSavingLoading.classList.remove('hidden');
                    document.body.classList.add('active');

                    setTimeout(() => {
                        cartItem.remove();

                        overlayLoading.classList.remove('active');
                        containerSavingLoading.classList.add('hidden');
                        document.body.classList.remove('active');
                        let getData = JSON.parse(localStorage.getItem('getData')) || [];
                        let title = cartItem.querySelector('.titleCreate').textContent.trim();
                        let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                        let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                        let idItem = cartItem.dataset.id;
                        let quantity = parseInt(cartItem.querySelector('.quantityCreate').textContent);
                        getData = getData.filter(item => !(item.title === title && item.size === size && item.color === colorCreate && item.id === idItem));
                        localStorage.setItem('getData', JSON.stringify(getData));
                        updateCount();
                        updateContainerNoItem();
                        totalPrice();
                    }, 1500)

                });

                cartItem.querySelector('.containerCountCreate').addEventListener('click', event => {
                    const quantity = cartItem.querySelector('.quantityCreate');
                    let count = quantity.textContent;
                    let getData = JSON.parse(localStorage.getItem('getData')) || [];
                    let title = cartItem.querySelector('.titleCreate').textContent.trim();
                    let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                    let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                    let idItem = cartItem.dataset.id;
                    let sizeCreate = parseInt(cartItem.querySelector('.sizeCreate').dataset.stock);


                    if (event.target.id === 'decreaseCreaet' && count > 1) {
                        overlayLoading.classList.add('active');
                        containerSavingLoading.classList.remove('hidden');
                        document.body.classList.add('active');

                        setTimeout(() => {
                            count--;
                            overlayLoading.classList.remove('active');
                            containerSavingLoading.classList.add('hidden');
                            document.body.classList.remove('active');


                            const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                            if (existItem !== -1) {
                                getData[existItem].quantity = count;
                                getData[existItem].dataStock = getData[existItem].dataStock + 1;
                                cartItem.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                                localStorage.setItem('getData', JSON.stringify(getData));

                                console.log(getData[existItem].dataStock)
                                updateCount();
                            }
                            quantity.textContent = count;
                            updatePrice();
                            totalPrice();
                        }, 1500)
                    } else if (event.target.id === 'increaseCreate') {
                        overlayLoading.classList.add('active');
                        containerSavingLoading.classList.remove('hidden');
                        document.body.classList.add('active');
                        setTimeout(() => {
                            if (sizeCreate <= 1) {
                                alert(`Sorry ${title} SIZE: ${size} COLOR: ${colorCreate} out-of-stock now!`);
                                overlayLoading.classList.remove('active');
                                containerSavingLoading.classList.add('hidden');
                                document.body.classList.remove('active');
                                return;
                            }
                            count++;
                            overlayLoading.classList.remove('active');
                            containerSavingLoading.classList.add('hidden');
                            document.body.classList.remove('active');

                            const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                            if (existItem !== -1) {

                                getData[existItem].quantity = count;
                                getData[existItem].dataStock = getData[existItem].dataStock - 1;
                                cartItem.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                                localStorage.setItem('getData', JSON.stringify(getData));

                                console.log(getData[existItem].dataStock)
                                updateCount();
                            }
                            quantity.textContent = count;
                            updatePrice();
                            totalPrice();
                        }, 1500)
                    }

                })

            }
        })
    }, 1500);
})


window.addEventListener('load', () => {
    const getData = JSON.parse(localStorage.getItem('getData')) || [];
    const cartbox = document.querySelector('.cartbox');
    getData.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.setAttribute('data-id', item.id);
        cartItem.setAttribute('data-price', item.originalP);
        cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'cartItem', 'border-bottom');
        cartItem.innerHTML = `
            <div class='containerImgCreate'><img src="${item.img}" width="60px" height="60px"> <div class="vr"></div></div>
            <div class='contianerContentCreate text-center'>
            <div class="d-flex align-items-center gap-2">
            <h6 class="titleCreate" style="font-size:15px;">${item.title}</h6>
            <h6 class="colorCreate" style="font-size:15px;">-${item.color}</h6>
            </div>

            <div class='containerSize d-flex align-items-center justify-content-center gap-4'>
            <h6 class="sizeTitle">Size:</h6>
            <h6 class="sizeCreate" data-id-size="${item.sizeId}" data-stock="${item.dataStock}">${item.size}</h6>
            </div>
            <div class="containerCountCreate btn-group btn-group-md">
                        <button class="btn btn-outline-secondary" id="decreaseCreaet">-</button>
                        <button class="btn btn-outline-secondary quantityCreate">${item.quantity}</button>
                        <button class="btn btn-outline-secondary" id="increaseCreate">+</button>
                    </div>
            </div>
            <div class="containerRemove d-block">
            <i class="bi bi-trash-fill removeCart"></i>
            <h6 class="priceCreate" style="font-size:14px; margin-top:10px;">${item.price}</h6>
            </div>
            `

        cartbox.appendChild(cartItem);
        updateCount();
        updateContainerNoItem();
        updatePrice();
        totalPrice();
        cartItem.querySelector('.removeCart').addEventListener('click', () => {

            overlayLoading.classList.add('active');
            containerSavingLoading.classList.remove('hidden');
            document.body.classList.add('active');

            setTimeout(() => {

                overlayLoading.classList.remove('active');
                containerSavingLoading.classList.add('hidden');
                document.body.classList.remove('active');

                cartItem.remove();

                let getData = JSON.parse(localStorage.getItem('getData')) || [];
                let title = cartItem.querySelector('.titleCreate').textContent.trim();
                let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                let idItem = cartItem.dataset.id;

                getData = getData.filter(item => !(item.title === title && item.size === size && item.color === colorCreate && item.id === idItem));
                localStorage.setItem('getData', JSON.stringify(getData));
                updateCount();
                updateContainerNoItem();
                totalPrice();
            }, 1500)

        });

        cartItem.querySelector('.containerCountCreate').addEventListener('click', event => {
            const quantity = cartItem.querySelector('.quantityCreate');
            let count = quantity.textContent;
            let getData = JSON.parse(localStorage.getItem('getData')) || [];
            let title = cartItem.querySelector('.titleCreate').textContent.trim();
            let size = cartItem.querySelector('.sizeCreate').textContent.trim();
            let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
            let idItem = cartItem.dataset.id;
            let sizeCreate = parseInt(cartItem.querySelector('.sizeCreate').dataset.stock);


            if (event.target.id === 'decreaseCreaet' && count > 1) {
                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');

                setTimeout(() => {
                    count--;
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');


                    const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                    if (existItem !== -1) {
                        getData[existItem].quantity = count;
                        getData[existItem].dataStock = getData[existItem].dataStock + 1;
                        cartItem.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                        localStorage.setItem('getData', JSON.stringify(getData));

                        console.log(getData[existItem].dataStock)
                        updateCount();
                    }
                    quantity.textContent = count;
                    updatePrice();
                    totalPrice();
                }, 1500)
            } else if (event.target.id === 'increaseCreate') {
                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');
                setTimeout(() => {
                    if (sizeCreate <= 1) {
                        alert(`Sorry ${title} size: ${size} color: ${colorCreate} out-of-stock now!`);
                        overlayLoading.classList.remove('active');
                        containerSavingLoading.classList.add('hidden');
                        document.body.classList.remove('active');
                        return;
                    }
                    count++;
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');

                    const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                    if (existItem !== -1) {

                        getData[existItem].quantity = count;
                        getData[existItem].dataStock = getData[existItem].dataStock - 1;
                        cartItem.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                        localStorage.setItem('getData', JSON.stringify(getData));

                        console.log(getData[existItem].dataStock)
                        updateCount();
                    }
                    quantity.textContent = count;
                    updatePrice();
                    totalPrice();
                }, 1500)
            }

        })

    })



})

// update count shopping
const updateCount = () => {
    const countShopping = document.querySelector('.countShopping');

    let getData = JSON.parse(localStorage.getItem('getData')) || [];

    let count = 0;
    getData.forEach(item => {
        let quantity = parseInt(item.quantity);
        count += quantity;
    })

    countShopping.textContent = count;
}

// update containerNoItem 
const updateContainerNoItem = () => {
    const containerNoItem = document.querySelector('.containerNoItem');
    const contianerContentCreate = document.querySelectorAll('.contianerContentCreate');
    const containerGoShopping = document.querySelector('.containerGoShopping');
    const containerTotalCart = document.querySelector('.containerTotalCart');

    contianerContentCreate.length > 0 ? containerNoItem.classList.add('active') : containerNoItem.classList.remove('active');
    contianerContentCreate.length > 0 ? containerGoShopping.classList.add('active') : containerGoShopping.classList.remove('active');
    contianerContentCreate.length > 0 ? containerTotalCart.classList.add('active') : containerTotalCart.classList.remove('active');
}


// update price 
const updatePrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');
    cartItem.forEach(item => {
        let priceOriginal = parseFloat(item.dataset.price.replace('$', ""));
        let quantity = parseInt(item.querySelector('.quantityCreate').textContent);
        let priceCreate = item.querySelector('.priceCreate');
        let total = priceOriginal * quantity;
        priceCreate.textContent = `$${total.toFixed(2)}`;
    })

}

// update price total 
const totalPrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');
    let total = 0;
    cartItem.forEach(item => {
        let price = parseInt(item.querySelector('.priceCreate').textContent.replace('$', ''));
        total += price;
    })
    document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.subTotal').textContent = `$${total.toFixed(2)}`;
}

// alert complete add cart 
const alertComplete = () => {
    const h6 = document.createElement('h6');
    h6.classList.add('fs-6', 'd-flex', 'gap-2', 'fw-bold');
    h6.innerHTML = `<i class="bi bi-check2"></i>Add cart successfully`;

    containerAlertOrder.appendChild(h6);

    setTimeout(() => {
        h6.style = 'opacity: 0; transform: translateX(100px)';

        setTimeout(() => {
            h6.remove();
        }, 1000)
    }, 2500)
}
