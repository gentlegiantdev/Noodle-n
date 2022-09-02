const deleteBtn = document.querySelectorAll('.del')
const groceryItemItem = document.querySelectorAll('span.not')
const groceryItemComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteGroceryItem)
})

Array.from(groceryItemItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(groceryItemComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteGroceryItem(){
    const groceryItemId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceryItems/deleteGroceryItem', {
            method: 'delete',
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

async function markComplete(){
    const groceryItemId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceryItems/markComplete', {
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

async function markIncomplete(){
    const groceryItemId = this.parentNode.dataset.id
    try{
        const response = await fetch('groceryItems/markIncomplete', {
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