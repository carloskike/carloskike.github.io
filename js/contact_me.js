// Contact Form Scripts

function sendNotification(ev){
    ev.preventDefault();
    if(validate_fields()){
        $.ajax({
            url: "https://helpet-landing.herokuapp.com/save_information",
            type: "POST",
            cache: false,
            data: {
                name: $("input#name").val(),
                email: $("input#email").val(),
                type_user: $('#type :selected').val(),
                about: $("textarea#message").val()
            },            
            success: function() {
                $("input#name").val('');
                $("input#email").val('');
                $("#type").val('none');
                $("textarea#message").val('');
                swal("HECHO", 'GRACIAS POR BRINDARNOS TU INFORMACIÓN')
                swal(
                  'INFORMACIÓN REGISTRADA',
                  'GRACIAS POR INTERESARTE EN ESTA LABOR PRONTO SEGUIRAS RECIBIENDO MAS INFORMACIÓN',
                  'success'
                )
            },
            error: function() {
                swal(
                  'HA OCURRIDO UN ERROR',
                  'ESTAREMOS PENDIENTE DE ESTE ERROR, AGRADECERIAMOS SI PUEDES INTENTARLO MAS TARDE',
                  'error'
                )
            },
        });
    }
}

function validate_fields(){
    if($("input#name").val() != ""){
        $("#name_error").text('');
        if($("input#name").val().split(" ").length >= 2){
             $("#name_error").text('');
            if($("input#email").val() != ""){
                $("#email_error").text('');
                if(validateEmail($("input#email").val())){
                    $("#email_error").text('');
                    if($('#type :selected').val() != 'none'){
                        $("#type_error").text('');
                        return true;
                    }else{
                        $("#type_error").text('SELECCIONE UN PERFIL');
                        return false;
                    }
                }else{
                    $("#email_error").text('INGRESE CORRECTAMENTE SU CORREO ELECTRONICO');
                    return false;
                }
            }else{
                $("#email_error").text('INGRESE SU CORREO ELECTRONICO');
                return false;
            }
        }else{
            $("#name_error").text('INGRESE SU NOMBRE Y APELLIDO');
            return false;
        }
    }else{
        $("#name_error").text('INGRESE SU NOMBRE');
        return false;
    }
}

function validateEmail(email) {
   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
}
