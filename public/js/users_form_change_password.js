document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
        if(e.passphrase.value === ""){
            e.passphrase.focus();
            message.innerHTML=" feltet passphrase er tomt";
            return false;
        }
        if(e.passphrase.value != e.repeatpassphrase.value){
            e.passphrase.focus();
            e.repeatpassphrase.focus();
            message.innerHTML = "password er ikke ens"
            return false;
        }
            return true;
    }
            const form = document.querySelector('.updatepassword');
            const endpoint = form.getAttribute('action');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if(validate(event.target) === true){
                fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idpassword: this.idpassword.value,
                        passphrase: this.passphrase.value,
                        repeatpassphrase: this.repeatpassphrase.value
                    })
                })
                    .then(response => {
                        if (response.status === 200) {
                            document.querySelector('.errorMessage').innerHTML = "Gemt";
                            document.location.href="/dashborad/users"
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
                const imageid = event.target.dataset.imageid
                const formData = new FormData();
                formData.append('photo', this.files[0]);
                fetch(`/profile/image/${imageid}`, {
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
