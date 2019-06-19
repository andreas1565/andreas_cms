document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
       
        if(e.role.value === '' || isNaN(e.role.value) || e.role.value == '0'){
            e.role.focus();
            message.innerHTML = 'væg en menu punkt';
            return false;
        }
        return true;
    }
            const form = document.querySelector('.update') 
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if(validate(event.target) === true){
                fetch('/dashborad/users/', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.id.value,
                        role: this.role.value
                    })
                })
                    .then(response => {
                        if (response.status === 200) {
                            document.querySelector('.errorMessage').innerHTML = "Gemt";
                            document.location.href="/dashborad/users/"
                        } 
                        return response.json();
                    }).then(data => {
                        
                        if (data.errorMessage) {
                            for (let i = 0; i < data.errorMessage.length; i++) {
                                document.querySelector('.errorMessage').innerHTML += `${data.errorMessage[i]}`;
                            }
                        } 
                    })
                }
            });
});
