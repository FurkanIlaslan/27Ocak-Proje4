const apiKey = "jrvPTx4KMjfsx41WjxglF-Ve2RFlsNRdTUAmxX9LFjs";
const url = "https://api.unsplash.com/search/photos?page=1";

const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");

const row = document.querySelector(".row");

const toggleBtn = document.querySelector("#toggleBtn");
const body = document.querySelector("body");

// ! Karanlık mod aydınlık mod bölümünü kodlayalım.

toggleBtn.addEventListener("click", function(){
    if(body.classList.contains("dark-mode")){
        body.classList.remove("dark-mode");
        toggleBtn.innerHTML = "Light Mode";
    }else{
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = "Dark Mode";
    }
})


// ! Form submit olduğu durumda istek atarak verileri almak için;
form.addEventListener("submit", function(e){
    e.preventDefault();
    let searchTerm = searchInput.value;
    
    let request = `${url}&query=${searchTerm}&client_id=${apiKey}`
    // console.log(request)
    fetch(request)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.results)
        let resimler = data.results;
        önYüzeEkle(resimler)
    })
    searchInput.value = "";
})

const önYüzeEkle = (veriler) => {
    veriler.forEach(function(resim){
        // console.log(resim)
        const col = document.createElement("div");
        col.classList = "col-4 mb-3 border border-1 p-2";

        const a = document.createElement("a");
        a.href = resim.links.download;

        const img = document.createElement("img");
        img.style.width = "100%";
        img.style.height = "200px";
        img.src = resim.urls.small;


        const deleteBtn = document.createElement("button");
        deleteBtn.classList = "btn btn-warning float-end mt-2";
        deleteBtn.innerHTML = "Sil";
        deleteBtn.id = "delete";


        row.append(col);
        col.append(a);
        a.append(img);
        col.append(deleteBtn);

    })
}


// ! Sil butonuna tıkladığım elemanın silinmesi için;
row.addEventListener("click",function(e){
    if(e.target.id.includes("delete")){
       let column = e.target.parentElement
       column.style.display = "none";
    }
})


// ! Temizle butonuna tıkladığımda tüm içeriğin temizlenmesi için;
const clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function(){
    row.innerHTML = "";
})