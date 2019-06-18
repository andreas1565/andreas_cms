document.addEventListener('DOMContentLoaded', () =>{
    const message =  document.querySelector('.message');
    function validate(e){
       if(e.name.value === '' || e.postion.value === ''){
            e.name.focus();
            e.postion.focus();
            message.innerHTML="skive noget i nave felete";
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