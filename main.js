let myLeads = []
const inputEl = document.getElementById('input-el')
const saveBtn = document.getElementById('input-btn')
const savedLeads = document.getElementById('ul-el');

// myLeads = JSON.parse(myLeads)
// myLeads.push("www.facebook.com")
// myLeads = JSON.stringify(myLeads)
// console.log(typeof myLeads)

// localStorage.setItem("myLeads", "www.google.com")
// localStorage.getItem(key)
// localStorage.clear()

const deleteBtn = document.getElementById('delete-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const tabBtn = document.getElementById('tab-btn')
// savedLeads.innerHTML = leadsFromLocalStorage
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++)  {
        listItems += `<li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a> </li>`
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // savedLeads.append(li)
        // console.log(myLeads[i])
    }
    savedLeads.innerHTML = listItems
  
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

saveBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // myLeads = JSON.stringify(myLeads)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))

    render(myLeads)
})

