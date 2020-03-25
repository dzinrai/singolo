const menu = document.getElementById("menu");
let header_height = 100;
//---------------------------------------------------
const slider = document.getElementById("slider");
const arrow_left = document.getElementById("arrow-left");
const arrow_right = document.getElementById("arrow-right");
const vertical_phone = document.getElementById("phone-vertical");
const horizontal_phone = document.getElementById("phone-horizontal");
//---------------------------------------------------
const tag_menu = document.getElementById("tag-menu");
const portfolio = document.getElementById("portfolio-items");
let portfolio_items = portfolio.querySelectorAll('div.portfolio-items__item');
let portfolio_items_array = [...portfolio_items];
const k = Array(portfolio_items.length).fill().map( (n,i) => n=i+1 );
//---------------------------------------------------
const quote_form = document.getElementById("quote-form");
//---------------------------------------------------
// Menu gimmiks
function link_activation(link) {
    if( !link.parentElement.classList.contains('navigation__item_current') ){
        menu.querySelectorAll('li').forEach( li_elem => { li_elem.classList.remove('navigation__item_current'); }); // delete all active menu classes
        link.parentElement.classList.add('navigation__item_current');
    }
}
document.addEventListener('scroll', (event) => {
    const pos = window.scrollY;
    document.querySelectorAll('body>section').forEach( el => {
        if( el.offsetTop - header_height < pos && (el.offsetTop + el.offsetHeight - header_height) > pos ){
            const el_id = el.getAttribute('id');
            const el_href = '#target_' + ( el_id==='slider' ? 'home' : el_id );
            const a_link = menu.querySelector('a[href="'+el_href+'"]');
            if(a_link){
                link_activation(a_link);
            }
        }
    });
});
// Portfolio gimmiks
tag_menu.addEventListener('click', (event) => {
    //if(event.target.tagName !== 'span') return;
    tag_menu.querySelectorAll('span').forEach( elem => {
        elem.classList.remove('tags__item_current');
    } );
    event.target.classList.add('tags__item_current');

    let rand = -1; 
    for (let j = 0; j < k.length; j++) {
        const item_pos = k[j];
        rand = Math.floor( (Math.random() * (portfolio_items.length-1)) ); // random 0-11
        // array <k> as positions of elements [1,2,3...12] => random <rand> position => [5,2,3,4,1,6,7,8,9,10,11,12]
        while(true){
            rand = Math.floor( (Math.random() * (portfolio_items.length-1)) );  
            if(rand!==j) break;
        }
        k[j] = k[rand];
        k[rand] = item_pos; 
    }
    portfolio_items.forEach( (item,i) => {       
        item.classList.remove('active'); 
        item.querySelector('img').src = String("./assets/pin"+k[i]+".png");        
    } );
    
});
// Portfolio image border-click
portfolio.addEventListener('click', (event)=>{
    if(event.target.tagName === 'IMG') {
        portfolio_items.forEach( (item) => { item.classList.remove('active'); });
        event.target.parentElement.classList.add('active');
    }
});

// Slider gimmiks
let slides = [1,2];
let curr_image = 1;
let slider_container = slider.querySelector('div.slider__container');
arrow_left.addEventListener('click', (event) => {
    slider_container.querySelector('div.slider__image_'+slides[1]).classList.remove('hidden');
    slider_container.querySelector('div.slider__image_'+slides[0]).style.animation = "moveRight 0.4s 1 ease-out";
    slides.push(slides[0]);
    slides.shift();
    setTimeout(() => {
        slider_container.querySelector('div.slider__image_'+slides[1]).classList.add('hidden');
        slider_container.querySelector('div.slider__image_'+slides[0]).style = "";
        slider_container.querySelector('div.slider__image_'+slides[1]).style = "";
    }, 380);
    if(slides[0]===2){
        slider.classList.add('slider_blue');
    }else{
        slider.classList.remove('slider_blue');
    }
});
arrow_right.addEventListener('click', (event) => {
    // [1,2]
    slider_container.querySelector('div.slider__image_'+slides[1]).classList.remove('hidden');
    slider_container.querySelector('div.slider__image_'+slides[0]).style.animation = "moveLeft 0.4s 1 ease-out";
    slides.unshift(slides[slides.length-1]);
    slides.pop();// [2,1]
    setTimeout(() => {
        slider_container.querySelector('div.slider__image_'+slides[1]).classList.add('hidden');
        slider_container.querySelector('div.slider__image_'+slides[0]).style = "";
        slider_container.querySelector('div.slider__image_'+slides[1]).style = "";
    }, 380);
    //
    if(slides[0]===2){
        slider.classList.add('slider_blue');
    }else{
        slider.classList.remove('slider_blue');
    }
});
vertical_phone.querySelector('img.phone').addEventListener('click', event => {
    const screen = vertical_phone.getElementsByClassName("screen")[0];
    const screen_offed = vertical_phone.getElementsByClassName("screen_off")[0];
    screen.classList.contains("hidden") ? screen.classList.remove("hidden") : screen.classList.add("hidden");
    screen_offed.classList.contains("hidden") ? screen_offed.classList.remove("hidden") : screen_offed.classList.add("hidden");
});
horizontal_phone.querySelector('img.phone').addEventListener('click', event => {
    const screen = horizontal_phone.getElementsByClassName("screen")[0];
    const screen_offed = horizontal_phone.getElementsByClassName("screen_off")[0];
    screen.classList.contains("hidden") ? screen.classList.remove("hidden") : screen.classList.add("hidden");
    screen_offed.classList.contains("hidden") ? screen_offed.classList.remove("hidden") : screen_offed.classList.add("hidden");
});

// Form 
const submit_button = document.getElementById('submit-button'); 
submit_button.addEventListener('click', event => {
    const name = quote_form.querySelector('input.form__name_input');
    const email = quote_form.querySelector('input.form__email_input');
    const patt = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; //for email
    const subject = quote_form.querySelector('input.form__subject_input');
    //
    if( name.value.trim().length === 0 ) { 
        name.setAttribute("required","");
        return; // name validation
    }
    if( !patt.test(email.value) ) {
        email.setAttribute("required","");
        return; // email validation
    }
    const details = quote_form.querySelector('textarea.form__details_textarea');
    subject.value = subject.value.trim(); // cut whitespaces
    details.value = details.value.trim(); // cut whitespaces
    //
    const message_container = document.createElement("DIV");
    message_container.classList.add("alert_message_container");
    document.body.appendChild(message_container);
    //
    const message = document.createElement("DIV");
    message.classList.add("alert_message");
    message_container.appendChild(message);
    // Письмо отправлено
    const message_success = document.createElement("SPAN");
    message_success.classList.add("alert_message_span");
    message_success.innerHTML = "Письмо отправлено";
    message.appendChild(message_success);
    // Тема: 
    const message_subject = document.createElement("SPAN");
    message_subject.classList.add("alert_message_span");
    message_subject.innerHTML = subject.value!=="" ? "Тема:  "+subject.value : "Без темы";
    message.appendChild(message_subject);
    // Описание:
    const message_details = document.createElement("SPAN");
    message_details.classList.add("alert_message_span");
    message_details.innerHTML = details.value!=="" ? "Описание:  "+details.value : "Без описания";
    message.appendChild(message_details);
    // button
    const message_btn = document.createElement("BUTTON");
    message_btn.classList.add("alert_message_button-ok");
    message_btn.innerHTML = "OK";
    message.appendChild(message_btn);

    message_btn.addEventListener('click', event =>{
        message_container.remove();
        // reset
        quote_form.reset();
    });
    
});
//
const logo = document.getElementById('logo');
const menu_opener_button = document.getElementById('menu-opener');
menu_opener_button.addEventListener('click', (event) => {
    if(menu_opener_button.classList.contains('opened')){
        menu.parentElement.classList.remove('opened');
        menu.classList.remove('opened');
        menu_opener_button.classList.remove('opened');
        //
        logo.classList.remove('in-menu');
    }else{
        menu.parentElement.classList.add('opened');
        menu.classList.add('opened');
        menu_opener_button.classList.add('opened');
        //
        logo.classList.add('in-menu');
    }
});
//
function phoneResizer(window_w){
    if(window_w >=768 && window_w <=1020){
        slider.style.paddingTop = (window_w/1020/(768/1020) -1)*150+"px";
        vertical_phone.style.transform = "scaleX("+String(window_w/1020)+") scaleY("+String(window_w/1020)+")";
        horizontal_phone.style.transform = "scaleX("+String(window_w/1020)+") scaleY("+String(window_w/1020)+") rotate(90deg)";
    }else{
        slider.style.paddingTop = null;
    }
}
window.addEventListener('resize', ()=>{
    phoneResizer(window.innerWidth);
});
phoneResizer(window.innerWidth);