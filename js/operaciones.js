var acumulado = false,
    memoria = Array(),
    valor, operacion, base = 2 /*,numero*/ ;

activarTeclas($('#selectBase').val());

$(".bloqueTabla").hide();

function actualizar() {

    valor = $('#valor').text().trim();
}

$(document).on('click', '.numeros', function() {
    actualizar();

    if (valor == "0" || acumulado)
        $('#valor').html($(this).text().trim());
    else
        $('#valor').html(valor + $(this).text().trim());
    acumulado = false;

});

$(document).on('click', '.opp', function() {

    actualizar();
   
    acumulado = true;

    if ($(this).text().trim() == '(') {
      
        memoria.push($(this).text().trim());
    } else if ($(this).text().trim() == "x" ||
        $(this).text().trim() == "÷" ||
        $(this).text().trim() == "+" ||
        $(this).text().trim() == "-") {
      
        if (memoria[memoria.length - 1] == ')') {
            memoria.push($(this).text().trim());
        } else {
            memoria.push($('#valor').text().trim());
            memoria.push($(this).text().trim());
        }

    } else {
      
        memoria.push($('#valor').text().trim());
        memoria.push($(this).text().trim());

    }
  
    $('#operacion').html(concatenarFormula(memoria));

});
//METODO YA NO ES NECESARIO
function corregirFormula_Signos(memoria) {

    var aux = "";

   
    for (let i = 0; i < memoria.length - 1; i++) {
        if (memoria[i] == ")" &&
            (memoria[i + 2] == "x" ||
                memoria[i + 2] == "÷" ||
                memoria[i + 2] == "+" ||
                memoria[i + 2] == "-") && (i + 2) <= memoria.length) {
            aux = memoria[i + 1];
            memoria[i + 1] = memoria[i + 2];
            memoria[i + 2] = aux;

        }

    }
    return memoria;
}

function concatenarFormula(memoria) {
    var salida = "";
 
    for (let i = 0; i < memoria.length; i++) {

        salida += memoria[i];

    }
    return salida;

}

$(document).on('click', '#borrar', function() {
    actualizar();
    limpiar();
});

function limpiar() {
    $('#valor').html('0');
    $('#operacion').html('');
    valor = 0;
    acumulado = false;
    $('.bloqueTabla').css("display","none");
    //mostrarTabla('NaN');
    memoria = [];

}

function mostrarTabla(resultado_operacion) {
    var htmlTabla = "";
    var tablaDatos = new Array();
    if (resultado_operacion != 'NaN')
        tablaDatos = decimal_a_cualquier_Base(resultado_operacion);
    else
        tablaDatos = decimal_a_cualquier_Base(resultado_operacion);

    for (let i = 2; i <= 16; i++) {
        htmlTabla += '<tr>' +
            '<td data-label="Base">' + i + '</td>' +
            '<td data-label="Numero">' + tablaDatos[i] + '</td>' +
            '</tr>';
    }

    $('#tbody').html(htmlTabla);
    $('.bloqueTabla').fadeIn(1000);
}

function decimal_a_cualquier_Base(numero) {

    var element = new Array();
    for (let i = 2; i <= 16; i++) {
        //convertir de decimal a x base
        element[i] = numero.toString(i);
        //decimal.toString(base)
    }

    return element;
}

$(document).on('click', '#igual', function() {
    actualizar();

    if ($('#operacion').text() == valor)
        valor = $('#operacion').text().trim();
    else
        valor = $('#operacion').text() + $('#valor').text();

    operacion = $('#valor').text();

    if (memoria[memoria.length - 1] == "x" ||
        memoria[memoria.length - 1] == "÷" ||
        memoria[memoria.length - 1] == "+" ||
        memoria[memoria.length - 1] == "-")
        memoria.push($('#valor').text().trim());


    if (memoria.length == 0)
        memoria.push($('#valor').text().trim());

    //cambiar los signos x y ÷
    memoria = corregir_Signos(memoria);
    valor = convertirNumeros(memoria, base);
    
    try {
        
        valor = eval(valor);
      
        let valor_en_tabla_salida = eval(valor.toString(10));
        
        $('.bloqueTabla').css("display","block");
        mostrarTabla(valor_en_tabla_salida);
        valor = valor.toString(base);
        
        $('#valor').html(valor);
        if (memoria.length == 0)
            $('#operacion').html($('#operacion').text());
        else if (memoria[memoria.length - 1] == ")")
            $('#operacion').html($('#operacion').text());
        else
            $('#operacion').html($('#operacion').text() + operacion);

        memoria = memoria.splice(memoria.length, 1, valor);

    } catch (error) {
        valor = "NaN";
        $('#valor').html(valor);

    }


});


function convertirNumeros(memoria, base) {

    var formula = "";
    
 
    for (let i = 0; i < memoria.length; i++) {

        if (memoria[i] == "*" || memoria[i] == "/" ||
            memoria[i] == "-" || memoria[i] == "+" ||
            memoria[i] == "(" || memoria[i] == ")")
            formula += memoria[i];
        else { 
            formula += parseInt(memoria[i], base);

        }
    }
    return formula;
}

function corregir_Signos(memoria) {

   
    for (let i = 0; i < memoria.length; i++) {
        if (memoria[i] == 'x') {
          
            memoria[i] = memoria[i].replace('x', '*');
        } else if (memoria[i] == '÷')
            memoria[i] = memoria[i].replace('÷', '/');

    }

  
    return memoria;
}
// se Activan o desactivan las teclas
$('#selectBase').click(function() {

    base = $('#selectBase').val();
    activarTeclas($('#selectBase').val());
    limpiar();
});