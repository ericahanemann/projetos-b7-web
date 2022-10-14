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
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = `${pizzaJson[modalKey].id}@${size}`;
    
    let indexPizza = cart.findIndex((item) => item.identifier == identifier);
    if(indexPizza > -1) {
        cart[indexPizza].quantity += modalQt;
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            size: size,
            quantity: modalQt
        });
    }

    closeModal();
    updateCart();
});

qs('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        qs('aside').style.left = '0';
    }
});
qs('.menu-closer').addEventListener('click', () => {
    qs('aside').style.left = '100vw';
});


function updateCart() {
    qs('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            let cartItem = qs('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2: 
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantity;

            subtotal += cart[i].quantity * pizzaItem.price;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].quantity > 1) {
                    cart[i].quantity--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].quantity++;
                updateCart();
            });

            qs('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        qs('.subtotal span:last-child').innerHTML = `R$${subtotal.toFixed(2)}`;
        qs('.desconto span:last-child').innerHTML = `R$${desconto.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$${total.toFixed(2)}`;
    } else {
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vw';
    }
}