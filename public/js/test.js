function fetchupdate (e){
    console.log(e.target);
    return
    dataOject = {
        id: 64,
            title: 'hej',
            description: 'hej',
            menu: 7
    }
    const form = document.querySelector(formclass);
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
        url = '/dashborad/article/'
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dataOject
        })
    })
        .then(response => {
            if (response.status === 200) {
                document.querySelector('.errorMessage').innerHTML = "Gemt";
                document.location.href="/dashborad/article/"
            } 
            return response.json();
        }).then(data => {
          
            if(data.errorMessage){
                for(let i = 0; i < data.errorMessage.length; i++){
                    document.querySelector('.errorMessage').innerHTML += data.errorMessage[i]; 
                }
            }
        })
    
});
}