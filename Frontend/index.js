// Code your solution here
const sideBarUl = document.querySelector("#shoe-list")
const mainContainer = document.querySelector("#main-shoe")
const revUl = document.querySelector("#reviews-list")
const image = document.querySelector("#shoe-image")
const shoeName = document.querySelector("#shoe-name")
const shoeDesc = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const formContainer = document.querySelector('#form-container')


fetch(`http://localhost:3000/shoes`)
.then((resp) => {
  return resp.json()
})
.then((shoeArray) => {
  renderAllShoes(shoeArray)
})

function slapItOnDom(shoe){
  const shoeLi = document.createElement("li");
  shoeLi.className = "list-group-item "
  shoeLi.innerText = shoe.name
  sideBarUl.append(shoeLi)

  shoeLi.addEventListener("click", (evt) => {
      fetch(`http://localhost:3000/shoes/${shoe.id}`)
      .then((resp) => {
        return resp.json()
      })
      .then( (each_shoe) => {
        reviewArr = each_shoe.reviews
        showinfoOnDom (each_shoe)
        reviewList(reviewArr)
      })
  })//end of Shoeli
}


function showinfoOnDom (each_shoe){
  image.src = each_shoe.image
  shoeName.innerText = each_shoe.name
  shoeDesc.innerText = each_shoe.description
  shoePrice.innerText = each_shoe.price
  reviewForm(each_shoe)
}

function reviewForm(each_shoe){
  const form = document.createElement("form")
  form.id = "new-review"
  form.innerHTML = `<div class="form-group">
    <textarea class="form-control" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary"></input>
  </div>`
  formContainer.innerHTML = ""
  formContainer.append(form)

  form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    newRev = evt.target["review-content"].value

    fetch(`http://localhost:3000/shoes/${each_shoe.id}/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        content: newRev
      })
    })
    .then((resp) => {
      return resp.json()
    })
    .then((reviewObj) => {
      const revLi = document.createElement("li")
      revLi.class = "list-group-item"
      revLi.innerText = reviewObj.content
      revUl.append(revLi)
    })

  })
}


function reviewList(reviewArr){
  reviewArr.forEach((rev) => {
    const revLi = document.createElement("li")
    revLi.class = "list-group-item"
    revLi.innerText = rev.content
    revUl.append(revLi)

  })

}

function renderAllShoes(shoeArray){
    shoeArray.forEach((shoe) => {
      slapItOnDom(shoe)
    })
}
