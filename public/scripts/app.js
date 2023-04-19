// Search Feature

const input = document.querySelector('#searchText');
const button = document.querySelector('#searchSubmit');
const link = document.getElementById('link');
console.log(link);

input.addEventListener("change", () => {
    link.href = `/recipe?s=${input.value}`
})

document.querySelector('body').addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        link.href = `/recipe?s=${input.value}`
        location.replace(link.href);
    }
})
