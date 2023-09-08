listarComboBox();

function listarComboBox() {
    let box = "";
    for (let i = 2; i <= 16; i++) {
        box += '<option value="' + i + '" class="">' + i + '</option>';
    }
    $('#selectBase').html(box);
}

function activarTeclas(base) {
    bloquearTeclas();

    for (let i = 0; i < base; i++) {

        $('#' + i).prop('disabled', false);

        switch (i) {

            case 10:
                $('#a').prop('disabled', false);
                break;
            case 11:
                $('#b').prop('disabled', false);
                break;
            case 12:
                $('#c').prop('disabled', false);
                break;
            case 13:
                $('#d').prop('disabled', false);
                break;
            case 14:
                $('#e').prop('disabled', false);
                break;
            case 15:
                $('#f').prop('disabled', false);
                break;

            default:
        }

    }


}

function bloquearTeclas() {

    for (let i = 0; i < 16; i++) {

        $('#' + i).prop('disabled', true);

        switch (i) {

            case 10:
                $('#a').prop('disabled', true);
                break;
            case 11:
                $('#b').prop('disabled', true);
                break;
            case 12:
                $('#c').prop('disabled', true);
                break;
            case 13:
                $('#d').prop('disabled', true);
                break;
            case 14:
                $('#e').prop('disabled', true);
                break;
            case 15:
                $('#f').prop('disabled', true);
                break;

            default:
        }

    }

}