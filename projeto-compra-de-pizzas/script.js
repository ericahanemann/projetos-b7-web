let cart = [];
let modalQt = 1;
let modalKey;
const qs = (element) => document.querySelector(element);
const qsa = (element) => document.querySelectorAll(element);

//listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //cancela a ação padrão

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //e.target seleciona o próprio item que é clicado
        modalKey = key;
        modalQt = 1;

        qs('.pizzaBig img').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price.toFixed(2)}`;
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        qs('.pizzaInfo--qt').innerHTML = modalQt;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 50);
    });


    qs('.pizza-area').append(pizzaItem);
});

//eventos do modal
function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
        qs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    qs('.pizzaInfo--qt').innerHTML = modalQt;
});

qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

qs('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = qs('.pizzaInfo--size.selected').getAttribute('data-key');

    cart.push({
        id: pizzaJson[modalKey].id,
        size: size,
        quantity: modalQt
    });

    closeModal();
});