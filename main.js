const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

function getData(callback){
    fetch(url).then(res => res.json()).then(data => {
        callback(data);
    })
}
let numCompras = 0;
let title = document.getElementById("name");

items = document.getElementsByTagName("li");
for (let i = 0; i < items.length; i++) {
    items[i].onclick = updateCategory;
    
}
console.log(title)
let rowCat = document.getElementById("category");
function updateCategory(element){
    title.innerHTML = element.target.innerHTML
    getData((data) => {
        let categoryName = title.innerHTML;

        categoryName = (categoryName === "Burgers")?"Burguers":categoryName;
        categoryName = (categoryName.startsWith("Drinks"))?"Drinks and Sides":categoryName;

        console.log(categoryName);


        info = data.filter(x => x.name === categoryName)[0].products;
        console.log(info);
        rowCat.innerHTML = "";
        info.forEach(e => {
            let div = document.createElement("div");
            div.className = "card";
            div.style = "width: 18rem;";

            let divBody = document.createElement("div");
            div.className = "card-body";

            let name = document.createElement("h5");
            name.className = "card-title";
            name.innerHTML = e.name;

            let description = document.createElement("p");
            description.className = "card-text";
            description.innerHTML = e.description;

            let price = document.createElement("h6");
            price.className = "card-text";
            price.innerHTML = e.price;

            let img = document.createElement("img");
            img.className = "card-img-top";
            img.src = e.image;

            let button = document.createElement("a");
            button.className = "btn btn-primary";
            button.innerHTML = "Add to car";
            button.href = "#";

            divBody.appendChild(name);
            divBody.appendChild(description);
            divBody.appendChild(price);
            divBody.appendChild(button);
            
            div.appendChild(img);
            div.appendChild(divBody);

            rowCat.appendChild(div);
        });

    })
}




