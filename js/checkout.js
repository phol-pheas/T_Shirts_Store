window.addEventListener('load', () => {
    const getData = JSON.parse(localStorage.getItem('getData')) || [];

    getData.forEach(item => {
        const cartbody = document.querySelector('.card-body');

        const itemCartCheck = document.createElement('div');
        itemCartCheck.setAttribute('data-id', item.id);
        itemCartCheck.setAttribute('data-price', item.originalP);
        itemCartCheck.classList.add('itemCartCheck', 'd-flex', 'justify-content-between', 'align-items-center', 'py-3', 'border-bottom');
        itemCartCheck.innerHTML = `
        <div class="containerLeft d-flex align-items-center gap-2"><div class="containerImg"><img src="${item.img}" width="60px" height="60px">
        <div class="containerSize d-flex align-items-center mt-2"><h6 class="sizeTitle" style="font-size:12px; color:gray;">Size:</h6><h6 class="sizeTitle" style="font-size:12px; color:gray;">${item.size}</h6></div>
        </div> <div class="containerTitle d-flex gap-2"><h6 class="title" style="font-size:12px; color:gray;">${item.title}</h6><h6 class="color" style="font-size:12px; color:gray;">-${item.color}</h6>
        <h6 class="quantityCheck" style="font-size:12px; color:gray;">x${item.quantity}</h6>
        </div></div>

        <div class="containerRight"><h6 class="SubTotalCheck" style="font-size:12px; color:gray;">${item.originalP}</h6></div>
        `

        cartbody.appendChild(itemCartCheck);

        updatePriceMutiple();
        totalPriceCheck();
        updateCartEmpty();
    })
})

// update price * quantity
const updatePriceMutiple = () => {
    const itemCartCheck = document.querySelectorAll('.itemCartCheck');

    itemCartCheck.forEach(item => {
        let price = parseInt(item.dataset.price.replace("$", ""));
        let quantityCheck = parseInt(item.querySelector('.quantityCheck').textContent.replace("x", ""));

        let total = price * quantityCheck;

        item.querySelector('.SubTotalCheck').textContent = `$${total.toFixed(2)}`;
    })
}

// update total price 
const totalPriceCheck = () => {
    const itemCartCheck = document.querySelectorAll('.itemCartCheck')
    const subtotalCheckOut = document.querySelector('.subtotalCheckOut');
    const totalCheckOut = document.querySelector('.totalCheckOut');
    const totalCheckOut1 = document.querySelector('.totalCheckOut1');
    let total = 0;

    itemCartCheck.forEach(item => {
        let price = parseInt(item.querySelector('.SubTotalCheck').textContent.replace("$", ""));

        total += price;
    })

    subtotalCheckOut.textContent = `$${total.toFixed(2)}`;
    totalCheckOut1.textContent = `$${total.toFixed(2)}`;
    totalCheckOut.textContent = `$${total.toFixed(2)}`;
}

// update if no item in cart 
const updateCartEmpty = () => {
    const itemCartCheck = document.querySelectorAll('.itemCartCheck');
    const containerCartCheckOut = document.querySelector('.containerCartCheckOut');
    const containerHasCart = document.querySelector('.containerHasCart');

    if(itemCartCheck.length > 0){
        containerCartCheckOut.classList.remove('active');
        containerHasCart.classList.remove('active');
    }else{
        containerCartCheckOut.classList.add('active');
        containerHasCart.classList.add('active');
    }
}