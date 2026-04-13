$(document).ready(function(){
    $.getJSON("https://amiiboapi.org/api/amiibo",function(data){
        //Crear el menú para buscar
        let txt="";
        let listaJuegos=[]
        for(let cadaAmiibo of data.amiibo){
            let encontrado=false;
            for(let cadajuego of listaJuegos){   
                if(cadajuego==cadaAmiibo.amiiboSeries){
                    encontrado=true;
                    break;
                }
            }
            if(encontrado==false){
                listaJuegos.push(cadaAmiibo.amiiboSeries)
                txt+=cadaAmiibo.amiiboSeries+" "
                const completar=$("<button>",{class:"saga"}).text(cadaAmiibo.amiiboSeries)
                $(".listaJ").append(completar)
            }
        }
        //Añadir Amiibos********************************
        //let foto=$("<div>",{class:"foto"})
        
        for(let cadaAmiibo of data.amiibo){
            let nombre=$("<p>",{class:"nombre"}).text(cadaAmiibo.character)
            const estructura=$("<div>",{class:"ejemplo"})
            //$(".ejemplo").text()
            let imagen=$("<img>",{class:"imagen",src: cadaAmiibo.image});
            let flecha=$("<img>",{class:"flecha",src:"img/arrow_downward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"})
            estructura.append(imagen)
            estructura.append(nombre);
            estructura.append(flecha);
            $(".amiibos").append(estructura)
        }

    })
    $(".menu").click(function(){
        $(".listaJ").toggleClass("activo")
        $(".categoria").toggleClass("activo")
    })
    $(document).on("click",".flecha",function(){
        $(this).toggleClass("activo")
    })
    $(document).on("click",".saga",function(){
        $(this).toggleClass("select")
    })


})