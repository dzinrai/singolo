const menu = document.getElementById("menu");
const tag_menu = document.getElementById("tag-menu");
const portfolio = document.getElementById("portfolio-items");
let portfolio_items = portfolio.querySelectorAll('div.portfolio-items__item');
let portfolio_items_array = [...portfolio_items];
const k = Array(portfolio_items.length).fill().map( (n,i) => n=i+1 );
/*console.log(menu,tag_menu,portfolio);
console.log(portfolio_items);
console.log(portfolio_items_array);*/

// Menu gimmiks
menu.addEventListener('click', (event) => {
    console.log(event.target);
    if(event.target.tagName !== 'A') return;
    menu.querySelectorAll('li').forEach( elem => {
        elem.querySelector('a').parentElement.classList.remove('navigation__item_current');
    } );  
    event.target.parentElement.classList.add('navigation__item_current');
});
// Portfolio gimmiks
tag_menu.addEventListener('click', (event) => {
    console.log(event.target);
    //if(event.target.tagName !== 'span') return;
    tag_menu.querySelectorAll('span').forEach( elem => {
        elem.classList.remove('tags__item_current');
    } );
    event.target.classList.add('tags__item_current');

    let rand = 1; 
    for (let j = 0; j < k.length; j++) {
        rand = Math.floor( (Math.random() * (portfolio_items.length-1)) ); // random 0-11
        // array <k> as positions of elements [1,2,3...12] => random <rand> position => [5,2,3,4,1,6,7,8,9,10,11,12]
        const item_pos = k[j];
        k[j] = k[rand];
        k[rand] = item_pos;
    }
    console.log(k);
    portfolio_items.forEach( (item,i) => {        
        item.querySelector('img').src = String("./assets/pin"+k[i]+".png");        
    } );
    
});