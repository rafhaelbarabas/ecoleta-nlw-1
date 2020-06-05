// function handleOptionsSelectors(url, element){
//   fetch(url)
//   .then(res => res.json())
//   .then( data => {
//     for(item of data){
//       element.innerHTML += `<option value="${item.id}">${item.nome}</option>`
//     }
//   })
// }


// Selects 
function populateUFs() {
  let ufSelect = document.querySelector("select[name=uf]")  

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

function getCities(event) {

  let citySelect = document.querySelector("select[name=city]")

  // Limpa o valor do select antes de inserir os novos
  citySelect.innerHTML = `<option value="">Selecione a cidade</option>"`
  citySelect.disabled = true

  let uf = event.target.value

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
    .then(res => res.json())
    .then(cities => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })

    let stateInput = document.querySelector("input[name=state]")
    stateInput.value = event.target.options[event.target.selectedIndex].text
}

populateUFs()

document.querySelector("select[name=uf").addEventListener("change", getCities)

// Itens de coleta

function handleSelectedItem(event) {
  let itemLi = event.target

  itemLi.classList.toggle("selected")
  
  let itemId = itemLi.dataset.id

  let alreadySelected = selectedItem.findIndex((item) => {
    return item == itemId
  })
  
  if(alreadySelected){
    selectedItem.push(itemId)
  }else{
    selectedItem.splice(itemId)
  }

  console.log(selectedItem)
}

let selectedItem = []

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}