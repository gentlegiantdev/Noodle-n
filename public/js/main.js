const deleteBtn = document.querySelectorAll('.del');
const groceryItemItem = document.querySelectorAll('span.not');
const groceryItemComplete = document.querySelectorAll('span.completed');
const increaseQuantityBtn = document.querySelectorAll('.increaseQuantityBtn');
const decreaseQuantityBtn = document.querySelectorAll('.decreaseQuantityBtn');
console.log(increaseQuantityBtn);
console.log(decreaseQuantityBtn);

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteGroceryItem);
});

Array.from(groceryItemItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(groceryItemComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

Array.from(increaseQuantityBtn).forEach((el) => {
  el.addEventListener('click', increaseQuantity);
});

Array.from(decreaseQuantityBtn).forEach((el) => {
  el.addEventListener('click', decreaseQuantity);
});

async function deleteGroceryItem() {
  const groceryItemId = this.parentNode.dataset.id;
  try {
    const response = await fetch('groceryItems/deleteGroceryItem', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        groceryItemIdFromJSFile: groceryItemId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const groceryItemId = this.parentNode.dataset.id;
  try {
    const response = await fetch('groceryItems/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        groceryItemIdFromJSFile: groceryItemId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const groceryItemId = this.parentNode.dataset.id;
  try {
    const response = await fetch('groceryItems/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        groceryItemIdFromJSFile: groceryItemId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function increaseQuantity(){
    const groceryItemId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceryItems/increaseQuantity', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'groceryItemIdFromJSFile': groceryItemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
 }
  
 async function decreaseQuantity(){
    const groceryItemId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceryItems/decreaseQuantity', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'groceryItemIdFromJSFile': groceryItemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
 }
 /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
