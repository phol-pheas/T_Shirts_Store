const loadingHome = document.querySelector('.loadingHome');
const laodingHomeIn = document.querySelector('.loadingHomeIn');
const body = document.querySelector('body');
window.addEventListener('load', () => {
    loadingHome.classList.remove('hidden');
    laodingHomeIn.classList.remove('hidden');
    body.classList.add('active');
    setTimeout(() => {
            laodingHomeIn.classList.add('hidden');
            body.classList.remove('active');
            loadingHome.classList.add('hidden');
            loadingHome.addEventListener('transitionend', () => {
                document.body.removeChild(loadingHome);
            })
    }, 2000);
    window.scrollTo(0, 0);
})