const btnCheck = document.querySelector('.btnCheck');
const containerInputs = document.querySelectorAll('.containerInput');

btnCheck.addEventListener('click', () => {
    containerInputs.forEach(item => {
        displayAlert(item);

    });
});
const checkInputAll = () => {
    const linkCheckout = document.querySelector('.linkCheckout');
    const verify = document.querySelector('.verify');
    const lock = document.querySelector('.lock')
    let linkfill = true;
    containerInputs.forEach(item => {
        const inputCheck = item.querySelector('.inputCheck');

        if (inputCheck.value.trim() === '') {
            linkfill = false;
        }
    })
    if (linkfill) {
        linkCheckout.href = "orderComplete.html";
        verify.style.display = 'inline-flex';
        lock.style.display = 'none';
        btnCheck.addEventListener('click', () => {
            containerInputs.forEach(item => {
                displayAlert(item);


                const getData = JSON.parse(localStorage.getItem('getData')) || [];
                getData.forEach(item => {
                    const dataReview = JSON.parse(localStorage.getItem('dataReview')) || [];
                    const existItem = dataReview.findIndex(newItem => newItem.title === item.title && newItem.size === item.size && newItem.color === item.color && newItem.id === item.id);
                    if (existItem !== -1) {
                        dataReview[existItem].quantity = parseInt(dataReview[existItem].quantity) + item.quantity;
                        localStorage.setItem('dataReview', JSON.stringify(dataReview));
                        return;
                    }
                    let newdata = {
                        id: item.id,
                        title: item.title,
                        dataPrice: item.originalP,
                        img: item.img,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                    }

                    dataReview.push(newdata);
                    localStorage.setItem('dataReview', JSON.stringify(dataReview));
                });
                localStorage.removeItem('getData');

            });
        });
    } else {
        linkCheckout.href = '#';
        verify.style.display = 'none';
        lock.style.display = 'inline-flex';
    }
}

const getData = JSON.parse(localStorage.getItem('getData')) || [];

const displayAlert = item => {
    const inputCheck = item.querySelector('.inputCheck');
    const contianerrequire = item.querySelector('.contianerrequire');

    if (inputCheck.value.trim() === "") {
        inputCheck.style.borderColor = "red";
        contianerrequire.style.display = 'block';
    } else {
        inputCheck.style.borderColor = "";
        contianerrequire.style.display = 'none';
    }
};
const displayChange = item => {
    const inputCheck = item.querySelector('.inputCheck');
    const contianerrequire = item.querySelector('.contianerrequire');
    const linkCheckout = document.querySelector('.linkCheckout');
    inputCheck.addEventListener('input', () => {
        if (inputCheck.value.trim() !== '') {
            inputCheck.style.borderColor = "";
            contianerrequire.style.display = 'none';
        }
        checkInputAll();
    });
};

containerInputs.forEach(item => {
    displayChange(item);
});


const cartnumber = input => {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    input.value = value;
}

const cvv = input => {
    let value = input.value.replace(/\D/g, '');
    input.value = value;
}

const MMYY = input => {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) {
        value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
    }

    input.value = value;
}


