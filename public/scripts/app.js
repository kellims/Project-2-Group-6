// Search Feature

const input = document.querySelector('#searchText'); //select the input element with the ID "searText" and asigns it to 'input'
const button = document.querySelector('#searchSubmit');
const link = document.getElementById('link'); //select the link element with ID link and asigns it to 'link'
console.log(link);

// Listen to changes to the input value
input.addEventListener("change", () => {
    link.href = `/recipe?s=${input.value}`//set the href attribute of the link elemnent to a URL that includes the value of the input element so that when the link is cliked it take the user to the corresponding recipe
})

// add eventLstener to the body for a keydown -  see if the key is "Enter"
document.querySelector('body').addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        link.href = `/recipe?s=${input.value}`
        location.replace(link.href); // replace the current page with the new URL triggerd by the search
    }
})
