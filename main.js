let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('catrgory');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
// get total
function getTotal() {
    if (price.value != '') {
        let ertt = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = ertt;

    } else {
        total.innerHTML = '';
    }
}
//new pro

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}


submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        categry: categry.value.toLowerCase(),
        count: count.value,

    }
    if (title.value != '' && price.value != '' && categry.value != '' && newPro.count < 100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }

        } else {
            dataPro[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        } clearData()
    }




    localStorage.setItem('product', JSON.stringify(dataPro))

    sowData()
}
//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    categry.value = '';
    count.value = '';
}
// read
function sowData() {
    let table = '';
    for (let i = 1; i < dataPro.length; i++) {
        table += ` 
            <tr>  
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].categry}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >deleteAll  (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}
sowData()
//delete 
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    sowData()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    sowData()
}
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    categry.value = dataPro[i].categry;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = "update";
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//search
let searchMood = 'categry';

function getsearchMood(id) {
    let search = document.getElementById('Search');
    if (id == 'Searchcategory') {
        searchMood = 'categry';
   
    } else if (id == 'Searchtitle'){
        searchMood = 'title'
    }

    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = '';
    searchData()

}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {


        if (searchMood == 'categry') {

            if (dataPro[i].categry.includes(value.toLowerCase())) {
                table += ` 
            <tr>  
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].categry}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `;
            }


        } else {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += ` 
            <tr>  
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].categry}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `;
            }



        }
    }
    document.getElementById('tbody').innerHTML = table;
}



