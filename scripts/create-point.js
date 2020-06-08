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
let selectedItems = []

function handleSelectedItem(event) {
  let itemLi = event.target

  itemLi.classList.toggle("selected")

  let itemId = itemLi.dataset.id

  let alreadySelected = selectedItems.findIndex((item) => {
    return item == itemId
  })

  if (alreadySelected >= 0) {
    selectedItems = selectedItems.filter(item => {
      return item != itemId
    })
  } else {
    selectedItems.push(itemId)
  }  

  collectedItems.value = selectedItems
}

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")