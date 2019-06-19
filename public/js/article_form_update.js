document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
       
        if(e.title.value === ""){
            e.title.focus();
            message.innerHTML="skive noget i nave felete";
            return false;
        }
        if(e.description.value[0] == " "){
            while(e.description.value[0] === " ") {
                e.description.value = e.description.value.slice(1);
            }
            message.innerHTML="ingen mellem ";
            return false;
        }
        if(e.description.value === ""){
            e.description.focus();
            message.innerHTML=" skive noget i beskrivseles felete";
            return false;
        }
        if(e.menu.value === '' || isNaN(e.menu.value) || e.menu.value == '0'){
            e.menu.focus();
            message.innerHTML = 'væg en menu punkt';
            return false;
        }
        if(e.description.value[0] == " "){
            while(e.description.value[0] === " ") {
                e.description.value = e.description.value.slice(1);
            }
            message.innerHTML="ingen mellem ";
            return false;
        }
        
            return true;
        
    }

    
            const form = document.querySelector('.update');
            const endpoint = form.getAttribute('action');
            console.log(endpoint);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if(validate(event.target) === true){
                fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: this.title.value,
                        description: this.description.value,
                        menu: this.menu.value
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
                }
            });
        
            const file = document.querySelector('.profileFileSelect');
            file.addEventListener('change', function (event) {
                const article = event.target.dataset.imageid
                const formData = new FormData();
                formData.append('photo', this.files[0]);
                fetch(`/dashborad/article/image/${article}`, {
                    method: 'PATCH',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.photo) {
                            const img = document.querySelector('.profileImage');
					        img.src = `/media/${data.photo}`;
                        } else {
                            for(let i = 0; i < data.errorMessage.length; i++){
                                document.querySelector('.errorMessage').innerHTML +=  `${data.errorMessage[i]}`; 
                            }
        
                        }
                    });
            }); 
    
});
