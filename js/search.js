// search here 
const inputSearch = document.querySelector('.inputSearch');
const btnClickSearch = document.querySelector('.clickSearch')
inputSearch.addEventListener('keyup', () => {
    let foundItem = false;
    const contentSearch = document.querySelectorAll('.contentSearch');
    let input = document.querySelector('.inputSearch').value.toLowerCase();
    const containerSearchHere = document.querySelector('.containerSearchHere');
    const containerNoFound = document.querySelector('.containerNotFount');
    contentSearch.forEach(item => {
        let titleSearch = item.querySelector('.titleSearch').textContent.toLowerCase();
        if(titleSearch.includes(input)){
            item.style.display = 'block'; 
            containerSearchHere.style.display = 'none';
            foundItem = true;
            containerNoFound.classList.remove('active');        
        }else{
            item.style.display = 'none';
        }
        if(!foundItem){
            item.style.display = "none";
            containerNoFound.classList.add('active');
            containerSearchHere.style.display = 'none';
        }
        onInput(input);
    })
})

// if input value equal 0 or '' let content display not!
const onInput = (input) => {
    const contentSearch = document.querySelectorAll('.contentSearch');
    const containerSearchHere = document.querySelector('.containerSearchHere');
    if(input === ''){
        contentSearch.forEach(item => item.style.display = 'none');
        containerSearchHere.style.display = 'block';
    }
}


window.addEventListener('load', () => {
    const inputSearch = document.querySelector('.inputSearch');
    document.querySelector('.inputSearch').value = "";
    inputSearch.focus();
})