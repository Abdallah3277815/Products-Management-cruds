
    let title=document.getElementById("title")
    let price=document.getElementById("price")
    let taxes=document.getElementById("taxes")
    let ads=document.getElementById("ads")
    let discount=document.getElementById("discount")
    let total=document.getElementById("total")
    let count=document.getElementById("count")
    let category=document.getElementById("category")
    let search=document.getElementById("search")
    let createBtn=document.getElementById("create")
    let searchByCategory =document.getElementById("searchByCategory")
    let searchByTitle =document.getElementById("searchByTitle")
    let deleteAll =document.getElementById("deleteAll")
    let container = document.getElementById("container")
    let updateBtn=document.getElementById("update")
    let searchModeNow = document.getElementById("searchMode");
    updateBtn.style.display="none"
    let updateIndex;
    // console.log(title , price , taxes , ads , discount , total , count , category , search , createBtn , search , searchByCategory , searchByTitle ,deleteAll );
    /* The line `console.log(deleteAll);` is printing the `deleteAll` variable to the console. This is
    useful for debugging purposes to check the value of the variable. */
    // console.log(container);
    let sreachMode = 'byTitle'
    // ==== Get Total ==== // 
    function getTotal(){
        if(price.value != ""){
            let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
            total.innerHTML=result
        }else{

            total.innerHTML=``
        }
    }
    // ==== CREATE ==== // 
    let allProducts=[]
    if(localStorage.allProducts!=null){
        allProducts=JSON.parse(localStorage.allProducts)
    }
    displayData()
    deleteAll.innerHTML=`Delete All (${allProducts.length})`
    createBtn.onclick=function(){
        let product = {
            title : title.value,
            price : price.value,
            taxes : taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
        if(count.value>1){
            for(let i=0 ; i<count.value; i++){
                allProducts.push(product)
            }

        }else{
            allProducts.push(product)
        }
        
        localStorage.setItem("allProducts",JSON.stringify(allProducts))
        clearinputs()
        displayData()
        // console.log(product);
    }
    // ==== Clear Inputs after create ==== // 
    function clearinputs(){
        title.value="";
        price.value="";
        taxes.value="";
        ads.value="";
        discount.value="";
        total.innerHTML="";
        count.value="";
        category.value="";
    }

    // ==== Show Data ==== // 
    function displayData(){
        deleteAll.innerHTML=`Delete All (${allProducts.length})`

    let dataRow=``;
    allProducts.forEach((product , index)=>{
        // console.log(index);
        dataRow+=`
        <tr>
                            <td>${index+1}</td>
                            <td>${product.title}</td>
                            <td>${product.price}</td>
                            <td>${product.taxes}</td>
                            <td>${product.ads}</td>
                            <td>${product.discount}</td>
                            <td>${product.total}</td>
                            <td>${product.category}</td>
                            <td><button onclick="updateProduct(${index})" class="btn btn-primary">Update</button></td>
                            <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
                        </tr>
        ` 

    })
    //    console.log(dataRow);
    container.innerHTML=dataRow
        

    }

    // ==== Delete Product ==== // 
    function deleteProduct(i){
        // console.log(i);
        allProducts.splice(i,1)
        localStorage.allProducts=JSON.stringify(allProducts)
        displayData()
        deleteAll.innerHTML=`Delete All (${allProducts.length})`


        
    }
    // console.log(deleteAll);
    deleteAll.onclick=function(){
        allProducts=[]
        localStorage.allProducts=JSON.stringify(allProducts)
        displayData()
    }
    function updateProduct(i){
        title.value= allProducts[i].title
        price.value= allProducts[i].price
        taxes.value= allProducts[i].taxes
        ads.value= allProducts[i].ads
        discount.value= allProducts[i].discount
        total.value= allProducts[i].total
        category.value= allProducts[i].category
        createBtn.style.display="none";
        updateBtn.style.display="block"
        updateIndex= i 
        getTotal()
        scroll({
            top:0,
            behavior:'smooth'
        }
            
        )
    
    }
    updateBtn.onclick=function(){
        allProducts[updateIndex].title=title.value
        allProducts[updateIndex].price=price.value
        allProducts[updateIndex].taxes=taxes.value
        allProducts[updateIndex].ads=ads.value
        allProducts[updateIndex].discount=discount.value
        allProducts[updateIndex].total=total.value
        allProducts[updateIndex].category=category.value
        displayData()
        clearinputs()
        updateBtn.style.display="none"
        createBtn.style.display="block"
        
    }
    console.log(searchModeNow);
    // searchModeNow.innerHTML=` <br> You Are Now Searching ${sreachMode}`
    // console.log(searchModeNow);
    searchByCategory.onclick=()=>{
        sreachMode="byCategory"
        console.log(sreachMode);
        search.focus()
    }
    searchByTitle.onclick=()=>{
        sreachMode="byTitle"
        search.focus()
    }
    console.log(search);
    search.addEventListener("keyup",function(){
        let row=''
        allProducts.forEach((product,index)=>{
            console.log(product.title);
            console.log(search.value);
            if(sreachMode =='byTitle'){
                if(product.title.includes(search.value)){
                    console.log(index + "index");
                    console.log(product);
                    row+=`
                    <tr>
                                <td>${index+1}</td>
                                <td>${product.title}</td>
                                <td>${product.price}</td>
                                <td>${product.taxes}</td>
                                <td>${product.ads}</td>
                                <td>${product.discount}</td>
                                <td>${product.total}</td>
                                <td>${product.category}</td>
                                <td><button onclick="updateProduct(${index})" class="btn btn-primary">Update</button></td>
                                <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
                            </tr>
                    `
                    container.innerHTML=row
    
                }

            }else{
                if(product.category.includes(search.value)){
                    console.log(index + "index");
                    console.log(product);
                    row+=`
                    <tr>
                                <td>${index+1}</td>
                                <td>${product.title}</td>
                                <td>${product.price}</td>
                                <td>${product.taxes}</td>
                                <td>${product.ads}</td>
                                <td>${product.discount}</td>
                                <td>${product.total}</td>
                                <td>${product.category}</td>
                                <td><button onclick="updateProduct(${index})" class="btn btn-primary">Update</button></td>
                                <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
                            </tr>
                    `
                    container.innerHTML=row
    
                }

            }
           
        })

    })
    ;
    function test (){
        title.scrollIntoView()
        title.style.background="red"
    }
    // test()