$(document).ready(function(){
    $.getJSON("https://amiiboapi.org/api/amiibo",function(data){
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
                const completar=$("<button>",{class:"completado"}).text(cadaAmiibo.amiiboSeries)
                $(".listaJ").append(completar)
            }
        }
    })
    $(document).on("click",".menu",function(){
        $(".listaJ").toggleClass("activo")
        
    })
})