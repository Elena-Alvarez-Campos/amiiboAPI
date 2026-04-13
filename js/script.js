$(document).ready(function(){
    let listaJuegos=[]
    let listaSeleccionados=[]
    $.getJSON("https://amiiboapi.org/api/amiibo/?showusage",function(data){
        //Crear el menú para buscar
        let txt="";
        
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
            let hamb=$("<div>",{class:"juegosAmiibo"}).text("Prueba pruebaa")
            estructura.append(hamb);
            $(".amiibos").append(estructura)
        }

    })
    $(".menu").click(function(){
        $(".listaJ").toggleClass("activo")
        $(".categoria").toggleClass("activo")
    })

    //Flecha cada amiibo
    $(document).on("click",".flecha",function(){
        $(this).toggleClass("activo")
        $(this).closest(".juegosAmiibo").toggleClass("activo")
    })

    //Selección saga
    $(document).on("click",".saga",function(){
        $(this).toggleClass("select")
        if($(this).hasClass("select")){
            listaSeleccionados.push(listaJuegos.indexOf($(this).text()))
        }
        else{
            listaSeleccionados.pop(listaJuegos.indexOf($(this).text()))
        }
        console.log(listaSeleccionados)
    })

    //buscar amiibos
    $(document).on("click",".busca",function(){
          $(".amiibos").empty();
        for(let posicion of listaSeleccionados){
            let enlace="https://amiiboapi.org/api/amiibo/?amiiboSeries="+listaJuegos[posicion]
            $.getJSON(enlace,function(data){
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
        }
    })


})