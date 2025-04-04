window.addEventListener('load', () => {
    const getData = JSON.parse(localStorage.getItem('getData')) || [];

    getData.forEach(item => {
        const containerInnerNewItem = document.querySelector('.containerInnerNewItem');
        const cartItem1 = document.createElement('div');
        cartItem1.setAttribute('data-id', item.id);
        cartItem1.setAttribute('data-price', item.originalP);
        cartItem1.classList.add('cartItem1', 'mb-2');

        cartItem1.innerHTML = `
        <div class="card">
        <div class="card-body">
        <div class="contianerRemove border-bottom pb-2 d-flex justify-content-end px-2"><i class="bi bi-trash-fill removeCart"></i></div>
        <div class="containerImg border-bottom d-flex justify-content-center p-2"><img src="${item.img}" width="60px" height="60px"></div>
        <div class="containerProdusts border-bottom px-2 mt-2"><div class="containerPro d-flex justify-content-between"><h6 class="ProdustTitle fw-bold" style="font-size:12px;">Product:</h6><div class="containerTitle&Size d-flex gap-2"><h6 class="titleCreate fw-bold" style="font-size:12px;">${item.title}</h6><h6 class="colorCreate fw-bold" style="font-size:12px;">-  ${item.color}</h6></div></div>
        <div class="containerSize d-flex justify-content-between"><h6 class="sizeTitle fw-bold" style="font-size:12px;">Size:</h6><h6 class="sizeCreate fw-bold" style="font-size:12px;" data-id-size="${item.sizeId}" data-stock="${item.dataStock}">${item.size}</h6></div>
        </div>
        <div class="containerprice border-bottom d-flex justify-content-between align-items-center px-2 my-2"><h6 class="priceTitle fw-bold" style="font-size:12px;">Price:</h6><h6 class="priceCreate fw-bold" style="font-size:12px;">${item.price}</h6></div>
        <div class="containerQuantity d-flex justify-content-between px-2 align-items-center my-3"><h6 class="quantityTitle fw-bold" style="font-size:12px;">Quantity:</h6>
        <div class="containerCountCreate"><button class="btn btn-outline-secondary" id="decrease">-</button>
        <button class="btn btn-outline-secondary quantityCreate">${item.quantity}</button>
        <button class="btn btn-outline-secondary containerCountCreate" id="increase">+</button>
        </div>
         </div>
         <div class="containerSbTotal d-flex justify-content-between px-2 align-items-center"><h6 class="subTotalTitle fw-bold" style="font-size:12px;">Subtotal:</h6> <h6 class="subTotal2 fw-bold" style="font-size:12px;">${item.price}</h6></div>
        </div>
        </div>
        `
        containerInnerNewItem.appendChild(cartItem1);

        priceUpdate();
        updateCount();
        updateTotal();
        updateItemCart();
        updateNotacessLink();


        cartItem1.querySelector('.containerCountCreate').addEventListener('click', (e) => {
            const quantity = cartItem1.querySelector('.quantityCreate');
            let count = quantity.textContent;
            let sizeCreate = parseInt(cartItem1.querySelector('.sizeCreate').dataset.stock);

            if (e.target.id === "decrease" && count > 1) {

                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');

                setTimeout(() => {
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');
                    count--;
                    let getData = JSON.parse(localStorage.getItem('getData')) || [];

                    let id = cartItem1.dataset.id;
                    let title = cartItem1.querySelector('.titleCreate').textContent;
                    let color = cartItem1.querySelector('.colorCreate').textContent.replace('-', '').trim();
                    let size = cartItem1.querySelector('.sizeCreate').textContent;

                    const existItem = getData.findIndex(item => item.id === id && item.title === title && item.color === color && item.size === size);

                    if (existItem !== -1) {
                        getData[existItem].quantity = count;
                        getData[existItem].dataStock = getData[existItem].dataStock + 1;
                        cartItem1.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                        localStorage.setItem('getData', JSON.stringify(getData));
                    }
                    quantity.textContent = count;

                    updateCount();
                    priceUpdate();
                    updateTotal();
                }, 1500)
            } else if (e.target.id === 'increase') {

                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');

                setTimeout(() => {

                    if (sizeCreate <= 1) {
                        let title = cartItem1.querySelector('.titleCreate').textContent;
                        let color = cartItem1.querySelector('.colorCreate').textContent.replace('-', '').trim();
                        let size = cartItem1.querySelector('.sizeCreate').textContent;

                        alert(`Sorry ${title} size: ${size} color: ${color} out-of-stock now!`);
                        overlayLoading.classList.remove('active');
                        containerSavingLoading.classList.add('hidden');
                        document.body.classList.remove('active');
                        return;
                    }
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');
                    count++;
                    let getData = JSON.parse(localStorage.getItem('getData')) || [];

                    let id = cartItem1.dataset.id;
                    let title = cartItem1.querySelector('.titleCreate').textContent;
                    let color = cartItem1.querySelector('.colorCreate').textContent.replace('-', '').trim();
                    let size = cartItem1.querySelector('.sizeCreate').textContent;

                    const existItem = getData.findIndex(item => item.id === id && item.title === title && item.color === color && item.size === size);

                    if (existItem !== -1) {
                        getData[existItem].quantity = count;
                        getData[existItem].dataStock = getData[existItem].dataStock - 1;
                        cartItem1.querySelector('.sizeCreate').dataset.stock = getData[existItem].dataStock;
                        localStorage.setItem('getData', JSON.stringify(getData));
                    }
                    quantity.textContent = count;

                    updateCount();
                    priceUpdate();
                    updateTotal();
                }, 1500)
            }
        })

        cartItem1.querySelector('.removeCart').addEventListener('click', () => {

            overlayLoading.classList.add('active');
            containerSavingLoading.classList.remove('hidden');
            document.body.classList.add('active');

            setTimeout(() => {

                overlayLoading.classList.remove('active');
                containerSavingLoading.classList.add('hidden');
                document.body.classList.remove('active');

                cartItem1.remove();

                let getData = JSON.parse(localStorage.getItem('getData')) || [];

                let id = cartItem1.dataset.id;
                let title = cartItem1.querySelector('.titleCreate').textContent;
                let color = cartItem1.querySelector('.colorCreate').textContent.replace('-', '').trim();
                let size = cartItem1.querySelector('.sizeCreate').textContent;

                getData = getData.filter(item => !(item.id === id && item.title === title && item.color === color && item.size === size));

                localStorage.setItem('getData', JSON.stringify(getData));

                priceUpdate();
                updateCount();
                updateTotal();
                updateItemCart();
                updateNotacessLink();
            }, 1500);
        })

    })
})

// update total price
const updateTotal = () => {
    const cartItem = document.querySelectorAll('.cartItem1');

    let total = 0;
    cartItem.forEach(item => {
        let subTotal = parseInt(item.querySelector('.subTotal2').textContent.replace("$", ''));

        total += subTotal;
    })
    document.querySelector('.total1').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.total2').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
}


// update when has item and not item in cart

const updateItemCart = () => {
    const cartItem2 = document.querySelectorAll('.cartItem1');
    const containerBtnreturn = document.querySelector('.containerBtnreturn');
    const containerEmpty = document.querySelector('.containerCartEmpty');
    const containerItemView = document.querySelector('.containerItemView');

    if (cartItem2.length > 0) {
        containerBtnreturn.classList.add('active');
        containerEmpty.classList.add('active');
        containerItemView.classList.remove('active');
    } else {
        containerBtnreturn.classList.remove('active');
        containerEmpty.classList.remove('active');
        containerItemView.classList.add('active');
    }
}


// update price cart1

const priceUpdate = () => {
    const cartItem1 = document.querySelectorAll('.cartItem1');
    cartItem1.forEach(item => {
        let price = parseInt(item.dataset.price.replace("$", ''));
        let quantity = parseInt(item.querySelector('.quantityCreate').textContent);

        let total = price * quantity;
        item.querySelector('.subTotal2').textContent = `$${total.toFixed(2)}`;
    })
}

// update if cart empty 

const updateNotacessLink = () => {
    const checkOutLink = document.querySelector('.checkOutLink');
    const cartItem2 = document.querySelectorAll('.cartItem1');

    if (cartItem2.length > 0) {
        checkOutLink.href = "checkout.html";
        checkOutLink.style = 'pointer-events: visible;';
    } else {
        checkOutLink.href = "";
        checkOutLink.style = 'pointer-events: none;';
    }
}




