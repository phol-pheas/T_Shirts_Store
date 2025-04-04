const cartbox1 = document.querySelector('.cartbox');
const overlayAddHome1 = document.querySelector('.overlayAddHome');
const containerAlertOrder1 = document.querySelector('.containerAlertOrder');
const loadingAdd1 = document.querySelector('.loadingAdd');
const overlayLoading1 = document.querySelector('.overlayLoading');
document.querySelectorAll('.containerProduct').forEach(item => {
    let countItem = 0;

    const containerView = item.querySelector('.containerView');
    const contianerAddCart = item.querySelector('.contianerAddCart');
    const containerArrow = item.querySelectorAll('.containerArrow');
    const contentImg = item.querySelectorAll('.contentImg');
    const activeDote = item.querySelectorAll('.activeDote');
    const colors = item.querySelectorAll('.colorAdd');
    const sizes = item.querySelectorAll('.sizeAdd');
    const addToCartHome = item.querySelector('.addToCartHome');
    const imgMacth = item.querySelectorAll('.imgMacth');
    const containerConcel = item.querySelector('.containerConcel');

    containerView.addEventListener('click', () => {
        overlayAddHome1.classList.add('active');
        document.body.classList.add('activeAdd');
        loadingAdd1.classList.remove('hidden');

        setTimeout(() => {
            contianerAddCart.classList.add('active');
            loadingAdd1.classList.add('hidden');
        }, 1500)

        overlayAddHome1.addEventListener('click', () => {
            overlayAddHome1.classList.remove('active');
            document.body.classList.remove('activeAdd');
            contianerAddCart.classList.remove('active');
        })

        containerConcel.addEventListener('click', () => {
            overlayAddHome1.classList.remove('active');
            document.body.classList.remove('activeAdd');
            contianerAddCart.classList.remove('active');
        })
    });

    containerArrow.forEach(arrow => {
        arrow.addEventListener('click', e => {
            if (e.target.id === 'right') {
                countItem = (countItem >= contentImg.length - 1) ? 0 : countItem + 1;
            } else if (e.target.id === 'left') {
                countItem = (countItem <= 0) ? contentImg.length - 1 : countItem - 1;
            }

            updateImage();
        });
    });

    activeDote.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            countItem = i;
            updateImage();
        });
    });

    colors.forEach((color, i) => {
        color.addEventListener('click', () => {
            countItem = i + 1;

            colors.forEach(c => c.classList.remove('activeColor'));
            color.classList.add('activeColor');

            updateImage();
        });
    });

    sizes.forEach(size => {
        size.addEventListener('click', () => {
            sizes.forEach(s => s.classList.remove('active'));
            size.classList.add('active');
        });
    });

    addToCartHome.addEventListener('click', (e) => {
        const selectedColor = item.querySelector('.colorAdd.activeColor');
        const selectedSize = item.querySelector('.sizeAdd.active');
        const contianerAddCart = e.target.closest('.contianerAddCart');
        const title = contianerAddCart.querySelector('.title').textContent;
        const price = contianerAddCart.dataset.price;
        const dataId = contianerAddCart.dataset.id;

        if (!selectedColor || !selectedSize) {
            alert("Please select a color and size before adding to cart!");
            return;
        }

        document.body.classList.add('active');
        loadingAdd1.classList.remove('hidden');
        overlayLoading1.classList.add('active');

        addToCartHome.textContent = 'Adding...'
        setTimeout(() => {
            let getdata = JSON.parse(localStorage.getItem('getData')) || [];
            addToCartHome.textContent = 'Add to cart';
            document.body.classList.remove('active');
            loadingAdd1.classList.add('hidden');
            overlayLoading1.classList.remove('active');

            const sizeName = selectedSize.dataset.name;
            const colorName = selectedColor.dataset.color;
            const existItem = getdata.findIndex(item => item.id === dataId && item.title === title && item.color === colorName && item.size === sizeName);

            if (existItem !== -1) {
                if (getdata[existItem].dataStock <= 1) {
                    alert(`Sorry ${title} size: ${sizeName} color: ${colorName} out-of-stock now!`);
                    overlayLoading1.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');
                    return;
                }

                getdata[existItem].quantity = parseInt(getdata[existItem].quantity) + 1;
                getdata[existItem].dataStock = parseInt(getdata[existItem].dataStock) - 1;
                localStorage.setItem('getData', JSON.stringify(getdata));

                const cartItem = cartbox1.querySelectorAll('.cartItem');
                let itemExist = cartItem[existItem];
                itemExist.querySelector('.quantityCreate').textContent = getdata[existItem].quantity;
                itemExist.querySelector('.sizeCreate').dataset.stock = getdata[existItem].dataStock;

                updateCount();
                updateContainerNoItem();
                updatePrice();
                totalPrice();
                alertCompleteHome();

                return;
            }


            let dataStock = selectedSize.dataset.stock;



            imgMacth.forEach(item => {

                if (item.dataset.color === selectedColor.dataset.color) {
                    const imgMacth = item.src;

                    const getdataStorage = {
                        id: dataId,
                        img: imgMacth,
                        title: title,
                        originalP: price,
                        size: sizeName,
                        quantity: 1,
                        color: colorName,
                        price: price,
                        dataStock: dataStock
                    }
                    getdata.push(getdataStorage);

                    localStorage.setItem('getData', JSON.stringify(getdata));

                    const cartItem = document.createElement('div');
                    cartItem.setAttribute('data-id', dataId);
                    cartItem.setAttribute('data-price', price)
                    cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'cartItem', 'border-bottom');
                    cartItem.innerHTML = `
            <div class='containerImgCreate'><img src="${imgMacth}" width="60px" height="60px"> <div class="vr"></div></div>
            <div class='contianerContentCreate text-center'>
            <div class="d-flex align-items-center gap-2">
            <h6 class="titleCreate" style="font-size:15px;">${title}</h6>
            <h6 class="colorCreate" style="font-size:15px;">-${colorName}</h6>
            </div>

            <div class='containerSize d-flex align-items-center justify-content-center gap-4'>
            <h6 class="sizeTitle">Size:</h6>
            <h6 class="sizeCreate" data-stock="${dataStock}">${sizeName}</h6>
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
                    cartbox1.appendChild(cartItem);

                    updateCount();
                    updateContainerNoItem();
                    updatePrice();
                    totalPrice();
                    alertCompleteHome();

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
        }, 1500)


    });

    const updateImage = () => {
        contentImg.forEach(img => img.classList.remove('active'));
        contentImg[countItem].classList.add('active');

        activeDote.forEach(dot => dot.classList.remove('active'));
        activeDote[countItem].classList.add('active');
    }
});


// alert complete add cart 
const alertCompleteHome = () => {
    const h6 = document.createElement('h6');
    h6.classList.add('fs-6', 'd-flex', 'gap-2', 'fw-bold');
    h6.innerHTML = `<i class="bi bi-check2"></i>Add cart successfully`;

    containerAlertOrder1.appendChild(h6);

    setTimeout(() => {
        h6.style = 'opacity: 0; transform: translateX(100px)';

        setTimeout(() => {
            h6.remove();
        }, 1000)
    }, 4000)
}

