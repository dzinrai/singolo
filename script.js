const menu = document.getElementById("menu");

menu.addEventListener('click', (event) => {
    if(event.target.tagName !== 'A') return;
    menu.querySelectorAll('li').forEach( elem => {
        elem.querySelector('a').parentElement.classList.remove('navigation__item_current');
    } );
    console.log(event.target);
    event.target.parentElement.classList.add('navigation__item_current');
});