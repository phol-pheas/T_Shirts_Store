const loadingHome = document.querySelector('.loadingHome');
const laodingHomeIn = document.querySelector('.loadingHomeIn');
const animeImg = document.querySelector('.animaImg');
const body = document.querySelector('body');

const loadingHome2 = document.getElementsByClassName('loadingHome');

console.log(loadingHome2)

window.addEventListener('load', () => {

    loadingHome.classList.remove('hidden');
    laodingHomeIn.classList.remove('hidden');
    body.classList.add('active');
    
    setTimeout(() => {
        laodingHomeIn.classList.add('hidden');
        animeImg.classList.remove('hidden');

        setTimeout(() => {
            animeImg.classList.add('hidden');
            body.classList.remove('active');
            loadingHome.classList.add('hidden');
            loadingHome.addEventListener('transitionend', () => {
                document.body.removeChild(loadingHome);
            })
        }, 2000)
    }, 2000);

    window.scrollTo(0, 0);
})