const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

function getData(callback) {
  fetch(url).then(res => res.json()).then(data => {
    callback(data);
  });
}
let numCompras = 0;
let title = document.getElementById("title");
let contador = document.getElementById("contador");

getData(loadCategoryData);
contador.innerHTML = numCompras + " items";

let items = document.getElementsByTagName("li");
for (let i = 0; i < items.length; i++) {
  items[i].onclick = updateCategory;
}

let carrito = document.getElementById("carrito");

carrito.onclick = updateOrderDetail;

let rowCat = document.getElementById("category");

function updateCategory(element) {
  let t = element.target.innerHTML;
  t = (t.startsWith("Drink"))?"Drinks and Sides":t;
  title.innerHTML = t;
  getData(loadCategoryData);
}

let car = [];

function updateCarrito(element) {
  numCompras++;
  items = element.target.parentNode.children;
  contador.innerHTML = numCompras + " items";
  let description = items[0].innerHTML;
  let price = items[2].innerHTML;
  let unitPrice = Number(price.replace("$",""));

  let index = car.findIndex(e => e.description === description);
  if(index !== -1) {
    car[index].quantity++;
  }
  else {
    car.push({item: 0, quantity: 1, description: description, unitPrice: unitPrice});
  }

}

function plusCarrito(element) {
  numCompras++;
  contador.innerHTML = numCompras + " items";
  let name = element.target.parentNode.parentNode.children[2].innerHTML;

  let index = car.findIndex(e => e.description === name);

  car[index].quantity++;

  updateOrderDetail();

}

function minusCarrito(element) {
  numCompras--;
  contador.innerHTML = numCompras + " items";
  let name = element.target.parentNode.parentNode.children[2].innerHTML;

  let index = car.findIndex(e => e.description === name);

  car[index].quantity--;
    
  car = (car[index].quantity === 0)?car.filter(e => e.quantity !== 0):car;
  updateOrderDetail();

}

let confirmModel = document.getElementById("confirmC");
confirmModel.addEventListener("click", function() {
  numCompras = 0;
  contador.innerHTML = numCompras + " items";
  car = [];
  updateOrderDetail();
});


function updateOrderDetail() {
  rowCat.innerHTML = "";
  title.innerHTML = "Order detail";
  rowCat.appendChild(doTableHead());
  let total = 0;
  let i = 1;
  car.forEach(e => {
    let row = document.createElement("tr");
    let number = document.createElement("td");
    number.innerHTML = i.toString();
    e.item = i;
    number.style.fontWeight = "bold";

    let qty = document.createElement("td");
    qty.innerHTML = e.quantity.toString();

    let description = document.createElement("td");
    description.innerHTML = e.description;

    let price = document.createElement("td");
    price.innerHTML = e.unitPrice.toString();

    let amount = document.createElement("td");
    let numberAmount = Number((e.quantity*e.unitPrice).toFixed(2));
    amount.innerHTML = numberAmount.toString();

    let modify = document.createElement("td");
        
    let plus = document.createElement("a");
    plus.className = "btn";
    plus.innerHTML = "+";
    plus.style.backgroundColor = "Gray";
    plus.style.color = "White";
    plus.style.marginRight = "1vh";
    plus.onclick = plusCarrito;

    let minus = document.createElement("a");
    minus.className = "btn";
    minus.innerHTML = "-";
    minus.style.backgroundColor = "Gray";
    minus.style.color = "White";
    minus.onclick = minusCarrito;

    modify.appendChild(plus);
    modify.appendChild(minus);

    row.appendChild(number);
    row.appendChild(qty);
    row.appendChild(description);
    row.appendChild(price);
    row.appendChild(amount);
    row.appendChild(modify);
    
    document.getElementById("tableOrder").appendChild(row);
    i++;
    total+=numberAmount;
  });

  let row = document.createElement("div");
  row.className = "row";
  let col1 = document.createElement("div");
  col1.className = "col-10";
  let totalAmount = document.createElement("h6");
  totalAmount.innerHTML = "Total : "+total.toFixed(2);

  let col2 = document.createElement("div");
  col2.className = "col d-flex justify-content-end align-items-center";
    
  let cancel = document.createElement("button");
  cancel.className = "btn btn-primary";
  cancel.innerHTML = "Cancel";
  cancel.setAttribute("data-toggle","modal");
  cancel.setAttribute("data-target","#exampleModal");
  cancel.style.backgroundColor = "lightcoral";
  cancel.style.color = "Black";
  cancel.style.borderColor = "Gray";
  cancel.style.marginRight = "1rem";

  let confirm = document.createElement("button");
  confirm.className = "btn";
  confirm.innerHTML = "Confirm Order";
  confirm.id = "confirmOrder";
  confirm.style.backgroundColor = "#F0E6DD";
  confirm.style.color = "Black";
  confirm.style.borderColor = "Black";
  confirm.addEventListener("click", function() {
    //numCompras = 0;
    //contador.innerHTML = numCompras + " items";
    // eslint-disable-next-line no-console
    console.log(car);
    //car = [];
    updateOrderDetail();
  });

  col1.appendChild(totalAmount);
  col2.appendChild(cancel);
  col2.appendChild(confirm);
  row.appendChild(col1);
  row.appendChild(col2);

  rowCat.appendChild(row);

}

function loadCategoryData(data) {
  let categoryName = title.innerHTML;

  categoryName = (categoryName === "Burgers")?"Burguers":categoryName;
  categoryName = (categoryName.startsWith("Drinks"))?"Drinks and Sides":categoryName;


  info = data.filter(x => x.name === categoryName)[0].products;

  rowCat.innerHTML = "";
  info.forEach(e => {

    let col = document.createElement("col");
    col.className = "col-3 d-flex align-items-stretch";

    let div = document.createElement("div");
    div.className = "card";

    let divBody = document.createElement("div");
    divBody.className = "card-body";

    let name = document.createElement("h5");
    name.className = "card-title";
    name.innerHTML = e.name;

    let description = document.createElement("p");
    description.className = "card-text";
    description.innerHTML = e.description;

    let price = document.createElement("h6");
    price.className = "card-text";
    price.innerHTML = "$" + e.price;

    let img = document.createElement("img");
    img.className = "card-img-top";
    img.src = e.image;

    let button = document.createElement("a");
    button.className = "btn";
    button.innerHTML = "Add to car";
    button.style.backgroundColor = "Black";
    button.style.color = "White";
    button.onclick = updateCarrito;


    divBody.appendChild(name);
    divBody.appendChild(description);
    divBody.appendChild(price);
    divBody.appendChild(button);
        
    div.appendChild(img);
    div.appendChild(divBody);

    col.appendChild(div);
    rowCat.appendChild(col);
  });
}

function doTableHead() {
  let table = document.createElement("table");
  table.className = "table table-striped";
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  tbody.id = "tableOrder";

  table.appendChild(thead);
  table.appendChild(tbody);

  let rowHead = document.createElement("tr");
  let head1 = document.createElement("th");
  head1.innerHTML = "Item";
  let head2 = document.createElement("th");
  head2.innerHTML = "Qty.";
  let head3 = document.createElement("th");
  head3.innerHTML = "Description";
  let head4 = document.createElement("th");
  head4.innerHTML = "Unit Price";
  let head5 = document.createElement("th");
  head5.innerHTML = "Amount";
  let head6 = document.createElement("th");
  head6.innerHTML = "Modify";

  rowHead.appendChild(head1);
  rowHead.appendChild(head2);
  rowHead.appendChild(head3);
  rowHead.appendChild(head4);
  rowHead.appendChild(head5);
  rowHead.appendChild(head6);
  thead.appendChild(rowHead);


  return table;
}




