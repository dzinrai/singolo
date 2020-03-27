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
    tag_menu.querySelectorAll('span').forEach( elem => {
        elem.classList.remove('tags__item_current');
    } );
    event.target.classList.add('tags__item_current');

    let rand = -1; 
    for (let j = 0; j < k.length; j++) {
        const currItem = portfolio_items_array[j];
        rand = Math.floor( (Math.random() * (portfolio_items.length-1)) ); // random 0-11
        // array <k> as positions of elements [1,2,3...12] => random <rand> position => [5,2,3,4,1,6,7,8,9,10,11,12]
        while(true){
            rand = Math.floor( (Math.random() * (portfolio_items.length-1)) );  
            if(rand!==j) break;
        }
        portfolio_items_array[j] = portfolio_items_array[rand];
        portfolio_items_array[rand] = currItem; 
    }
    while (portfolio.firstChild) {
        portfolio.removeChild(portfolio.lastChild);
    }
    portfolio_items_array.forEach( (item) => {
        portfolio.appendChild(item);
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
    slider_container.querySelector('div.slider__image_'+slides[0]).style.animation = "moveRight 0.6s 1 ease-out";
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
    slider_container.querySelector('div.slider__image_'+slides[0]).style.animation = "moveLeft 0.6s 1 ease-out";
    slides.unshift(slides[slides.length-1]);
    slides.pop();// [2,1]
    setTimeout(() => {
        slider_container.querySelector('div.slider__image_'+slides[1]).classList.add('hidden');
        slider_container.querySelector('div.slider__image_'+slides[0]).style = "";
        slider_container.querySelector('div.slider__image_'+slides[1]).style = "";
    }, 580);
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

// Menu gimmiks
const logo = document.getElementById('logo');
const menu_opener_button = document.getElementById('menu-opener');
function toggleMenu(){
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
}
menu_opener_button.addEventListener('click', (event) => {
    toggleMenu();
});

menu.addEventListener('click', (event) => {
    if(event.target.tagName === 'A') {
        toggleMenu();
    }
});
menu_opener_button.parentElement.addEventListener('click', (event) => {
    if(event.target.tagName === 'NAV') {
        toggleMenu();
    }
});
logo.addEventListener('click', (event) => {
    if(window.innerWidth <768) toggleMenu();
});
//
function phonePositioning( phone, min_w, max_w, window_width, top, left, right, margin_c ){
    // top = [start,end], left = [start,end], right = [start,end]
    const coef = (max_w-window_width)/(max_w-min_w);
    if( top.length>0 ){
        phone.style.top = (top[0]+(top[1]-top[0])*coef) + "vw";
    }else{ phone.style.top = null; }
    if( left.length>0 ){
        phone.style.left = (left[0]+(left[1]-left[0])*coef) + "vw";
    }else{ phone.style.left = null; }
    if( right.length>0 ){
        phone.style.right = (right[0]+(right[1]-right[0])*coef) + "vw";
    }else{ phone.style.right = null; }
    phone.style.marginTop = (window_width/max_w/(min_w/max_w) -1)*margin_c+"px"; 
    if(max_w<=768){
        arrow_right.style.marginTop = (window_width/max_w/(min_w/max_w) -1)*margin_c+"px";
        arrow_left.style.marginTop = (window_width/max_w/(min_w/max_w) -1)*margin_c+"px";
    }else{
        arrow_right.style.marginTop = null;
        arrow_left.style.marginTop = null;
    }
}
function clearStyles( phone ) {
    phone.style.transform = null;
    phone.style.top = null;
    phone.style.right = null;
    phone.style.left = null;
    phone.style.marginTop = null;
}
function phoneResizer(window_w){
    //
    if(window_w >=768 && window_w <1020){
        phonePositioning( vertical_phone, 768, 1020, window_w, [], [], [], 150 );
        phonePositioning( horizontal_phone, 768, 1020, window_w, [], [], [], 150 );
        vertical_phone.style.transform = "scaleX("+String(window_w/1020)+") scaleY("+String(window_w/1020)+")";
        horizontal_phone.style.transform = "scaleX("+String(window_w/1020)+") scaleY("+String(window_w/1020)+") rotate(90deg)"; 
    }else if(window_w >=375 && window_w <768){
        const scale_mod = 0.75*window_w/768;
        vertical_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+")";
        horizontal_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+") rotate(90deg)";
        phonePositioning(vertical_phone,375,768,window_w, [-15.5, -35], [6.4, -10], [], 100);
        phonePositioning(horizontal_phone,375,768,window_w, [-18, -43], [], [20.6, 6], 100);
    }else if(window_w >=320 && window_w <375){
        const scale_mod = 0.36*window_w/375;
        vertical_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+")";
        horizontal_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+") rotate(90deg)";
        phonePositioning(vertical_phone,320,375,window_w, [-35, -45], [-10, -10], [],100);
        phonePositioning(horizontal_phone,320,375,window_w, [-43, -53], [], [6, 1],100);
    }else if(window_w <320){
        const scale_mod = 0.3*window_w/320;
        vertical_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+")";
        horizontal_phone.style.transform = "scaleX("+String(scale_mod)+") scaleY("+String(scale_mod)+") rotate(90deg)";
        phonePositioning(vertical_phone,200,320,window_w, [], [], [],100);
        phonePositioning(horizontal_phone,200,320,window_w, [], [], [],100);
    }else{
        clearStyles(vertical_phone);
        clearStyles(horizontal_phone);
    }
}

window.addEventListener('resize', ()=>{
    phoneResizer(window.innerWidth);
});
phoneResizer(window.innerWidth);