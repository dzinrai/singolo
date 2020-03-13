const menu = document.getElementById("menu");
//---------------------------------------------------
const slider = document.getElementById("slider");
const arrow_left = document.getElementById("arrow-left");
const arrow_right = document.getElementById("arrow-right");
const vertical_phone = document.getElementsByClassName("slider__image_vertical")[0];
const horizontal_phone = document.getElementsByClassName("slider__image_horizontal")[0];
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
    portfolio_items.forEach( (item,i) => {       
        item.classList.remove('active'); 
        item.querySelector('img').src = String("./assets/pin"+k[i]+".png");        
    } );
    
});
portfolio_items.forEach( (item) => {        
    item.addEventListener('click', (event)=>{
        if(event.target.tagName === 'IMG') {
            portfolio_items.forEach( (item) => { item.classList.remove('active'); });
            event.target.parentElement.classList.add('active');
        }
    })     
} );

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
vertical_phone.addEventListener('click', event => {
    const screen = vertical_phone.getElementsByClassName("vertical_screen")[0];
    screen.classList.contains("hidden") ? screen.classList.remove("hidden") : screen.classList.add("hidden");
    console.log(screen);
});
horizontal_phone.addEventListener('click', event => {
    const screen = horizontal_phone.getElementsByClassName("horizontal_screen")[0];
    screen.classList.contains("hidden") ? screen.classList.remove("hidden") : screen.classList.add("hidden");
    console.log(screen);
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
    });
});


