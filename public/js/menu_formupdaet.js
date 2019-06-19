document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
       if(e.name.value === '' || e.postion.value === ''){
        e.name.focus();
        message.innerHTML="en elller flere felter er tom";
        return false;
       }
        if(e.name.value === ""){
            e.name.focus();
            message.innerHTML="skive noget i nave felete";
            return false;
        }
        if(e.postion.value === ""){
            e.postion.focus();
            message.innerHTML=" skive noget i pris felete";
            return false;
        }
        if(isNaN(e.postion.value)){
            e.postion.focus();
            message.innerHTML=" du kan kun skive tal  ipris felete ";
            return false;
        }
            return true;
    }

    
            const form = document.querySelector('.update');
            const endpoint = form.getAttribute('action');
           // console.log(id);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if(validate(event.target) === true){
                fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name.value,
                        postion: this.postion.value,
                    })
                })
                    .then(response => {
                        if (response.status === 200) {
                            document.querySelector('.errorMessage').innerHTML = "Gemt";
                            document.location.href="/dashborad/menu/"
                        } 
                        return response.json();
                    }).then(data => {
                      
                        if(data.errorMessage){
                            for(let i = 0; i < data.errorMessage.length; i++){
                                document.querySelector('.errorMessage').innerHTML += data.errorMessage[i]; 
                            }
                        }
                    })
                }
            });
});
