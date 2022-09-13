document.getElementById("btnBuscar").addEventListener("click", () => {
    deletePictures()
    let inputValue = document.getElementById("inputBuscar").value
    if(inputValue !== ''){
        sendRequest(inputValue)
    }
})

const sendRequest = async(inputValue) => {
    
    const response = await fetch(`https://images-api.nasa.gov/search?q=${inputValue}`)
    if(response.ok){
        let data =  await response.json()
        const {
            collection: {items}
        } = data
        
        for (let picture in items){
            printPictures(items[picture])
        }
    }
}



const printPictures = (picture) => {
    const {
        data: [data],
        links: [links]
    } = picture

    let card = `
    <div class="d-flex flex-row justify-content-center col-md-4 mt-3" >    
        <div class="card" style="width: 18rem;">
            <img src="${links.href}" class="card-img-top" alt="..." width="300px" height="300px">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
            </div>
        </div>
    </div>
    `

    let container = document.getElementById("contenedor")
    container.innerHTML += card
}

const createCardGroup = () => {

} 

const deletePictures = () => {
    document.getElementById("contenedor").innerHTML = ''
}