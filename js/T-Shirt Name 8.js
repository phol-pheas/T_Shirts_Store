// imgZoom 
let listImg = ['https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-10-a.jpg',
    'https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-001-b-246x300.jpg',
    'https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-01-c.jpg',
    'https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-01-d-246x300.jpg'
];

const imgZoom = document.querySelectorAll('.imgZoom');
const overlayImg = document.querySelector('.overlayImg');
const clickShowImg = document.querySelectorAll('.clickShowImg');
const closeShowImg = document.querySelector('.closeShowImg');
const containerImgZoom = document.querySelector('.containerImgZoom');
let count = 0;
imgZoom.forEach((item, i) => {
    item.addEventListener('click', () => {

        count = i;
        document.body.classList.add('active');
        document.querySelector('.imgShow').src = listImg[i];

        overlayImg.classList.add('active');
        containerImgZoom.classList.add('active');
        closeShowImg.classList.add('active');

        closeShowImg.addEventListener('click', () => {
            overlayImg.classList.remove('active');
            containerImgZoom.classList.remove('active');
            closeShowImg.classList.remove('active');
            document.body.classList.remove('active');
        })



    })
})

let itemCount = listImg.length;
clickShowImg.forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.id === 'back') {
            count--;
            if (count === -1) {
                count = 3;
            }
        } else {
            if (count === 3) {
                count = -1;
            }
            count++
        }
        document.querySelector('.imgShow').src = listImg[count];
    })
})