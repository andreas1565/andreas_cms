document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
       /*  if(e.username.value === '' || e.passphrase.value === ''){
            e.username.focus();
            e.passphrase.focus();
            message.innerHTML="Et eller flere felter var tomme";
            return false;  
        } */
       
        if(e.username.value === ""){
            e.username.focus();
            message.innerHTML="feltet username er tomt";
            return false;
        }
        if(e.passphrase.value === ""){
            e.passphrase.focus();
            message.innerHTML=" feltet passphrase er tomt";
            return false;
        }else{
            document.querySelector('form').submit();
            return true;
        }
    }

    document.querySelector('form').addEventListener('submit',e =>{
       e.preventDefault();
        validate(e.target);
    });
    
});