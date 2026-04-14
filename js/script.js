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
            const contenido=$("<div>",{class:"contenidoEj"})
            //$(".ejemplo").text()
            let imagen=$("<img>",{class:"imagen",src: cadaAmiibo.image});
            let flecha=$("<img>",{class:"flecha",src:"img/arrow_downward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"})
            let hamb=$("<div>",{class:"txt"}).text("");
            let B3ds=$("<p>",{class:"consola"}).text("3DS")
            let BWiiU=$("<p>",{class:"consola"}).text("Wii U")
            let Bswitch2=$("<p>",{class:"consola"}).text("Switch 2")
            let Bswitch=$("<p>",{class:"consola"}).text("Switch")
            hamb.append(B3ds)
            for(let cadajuego3DS of cadaAmiibo.games3DS){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(BWiiU)
            for(let cadajuego3DS of cadaAmiibo.gamesWiiU){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(Bswitch)
            for(let cadajuego3DS of cadaAmiibo.gamesSwitch){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(Bswitch2)
            for(let cadajuego3DS of cadaAmiibo.gamesSwitch2){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            contenido.append(imagen)
            contenido.append(nombre);
            contenido.append(flecha);
            estructura.append(contenido)
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
        $(this).parent().siblings().toggleClass("activo");
    })
    //Modo oscuro y claro
    $(".modo").click(function(){
        $(this).toggleClass("oscuro")
        $("article").toggleClass("oscuro")
        $(".flecha").toggleClass("oscuro")
        $(".saga").toggleClass("oscuro")
        $(".cabeza").toggleClass("oscuro")
        $("body").toggleClass("oscuro")
        if($(this).hasClass("oscuro")){
            $(this).attr('src', 'img/light_mode_24dp_FFADB0_FILL0_wght400_GRAD0_opsz24.png')
        }else{
            $(this).attr('src', 'img/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png')
        }
        //Filtro
        $(".menu").toggleClass("oscuro")
        if($(".menu").hasClass("oscuro")){
            $(".menu").attr('src', 'img/filter_alt_24dp_FFADB0_FILL0_wght400_GRAD0_opsz24.png')
        }else{
            $(".menu").attr('src', 'img/filter_alt_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png')
        }
        //Flecha
        if($(".flecha").hasClass("oscuro")){
            $(".flecha").attr('src', 'img/arrow_downward_24dp_FFADB0_FILL0_wght400_GRAD0_opsz24.png')
        }else{
            $(".flecha").attr('src', 'img/arrow_downward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png')
        }
        //$(article).toggleClass("oscuro")
        
    })

    //Selección saga
    $(document).on("click",".saga",function(){
        $(this).toggleClass("select")
        if($(this).hasClass("select")){
            listaSeleccionados.push(listaJuegos.indexOf($(this).text()))
        }
        else{
            let num=listaSeleccionados.indexOf(listaJuegos.indexOf($(this).text()))
            listaSeleccionados.splice(num,1)
        }
        console.log(listaSeleccionados)
    })

    //buscar amiibos
    $(document).on("click",".busca",function(){
        $(".amiibos").empty();
        for(let posicion of listaSeleccionados){
            let enlace="https://amiiboapi.org/api/amiibo/?amiiboSeries="+listaJuegos[posicion]+"&showusage"
            $.getJSON(enlace,function(data){
                for(let cadaAmiibo of data.amiibo){
                    let nombre=$("<p>",{class:"nombre"}).text(cadaAmiibo.character)
            const estructura=$("<div>",{class:"ejemplo"})
            const contenido=$("<div>",{class:"contenidoEj"})
            //$(".ejemplo").text()
            let imagen=$("<img>",{class:"imagen",src: cadaAmiibo.image});
            let flecha
            if($(".modo").hasClass("oscuro")){
                flecha=$("<img>",{class:"flecha oscuro",src:"img/arrow_downward_24dp_FFADB0_FILL0_wght400_GRAD0_opsz24.png"})
            }else{
                flecha=$("<img>",{class:"flecha",src:"img/arrow_downward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"})
                
            }
            let hamb=$("<div>",{class:"txt"}).text("");
            let B3ds=$("<p>",{class:"consola"}).text("3DS")
            let BWiiU=$("<p>",{class:"consola"}).text("Wii U")
            let Bswitch2=$("<p>",{class:"consola"}).text("Switch 2")
            let Bswitch=$("<p>",{class:"consola"}).text("Switch")
            hamb.append(B3ds)
            for(let cadajuego3DS of cadaAmiibo.games3DS){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(BWiiU)
            for(let cadajuego3DS of cadaAmiibo.gamesWiiU){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(Bswitch)
            for(let cadajuego3DS of cadaAmiibo.gamesSwitch){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            hamb.append(Bswitch2)
            for(let cadajuego3DS of cadaAmiibo.gamesSwitch2){
                let j3ds=$("<p>",{class:"txto"}).text(cadajuego3DS.gameName);
                hamb.append(j3ds)
            }
            contenido.append(imagen)
            contenido.append(nombre);
            contenido.append(flecha);
            estructura.append(contenido)
            estructura.append(hamb);
            $(".amiibos").append(estructura)
                }
            })
        }
    })


})