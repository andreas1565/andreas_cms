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
        if(e.image.value === ''){
            e.image.focus();
            message.innerHTML = " der er  ingen file med formen";
            return false;
        }
        if(e.menu.value === '' || isNaN(e.menu.value) || e.menu.value == '0'){
            e.menu.focus();
            message.innerHTML = 'væg en menu punkt';
            return false;
        }
        else{
            document.querySelector('form').submit();
            return true;
        }
    }

    document.querySelector('form').addEventListener('submit',e =>{
       e.preventDefault();
        validate(e.target);
    });
    
});