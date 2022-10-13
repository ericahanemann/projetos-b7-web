const qs = (element) => document.querySelector(element);
const qsa = (element) => document.querySelectorAll(element);

pizzaJson.map((item, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //cancela a ação padrão

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 50);
    });


    qs('.pizza-area').append(pizzaItem);
});