var net = require("net");

var HOST = "127.0.0.1";
var PORTA_ORIGEM = 3307;
var PORTA_DESTINO = 3306;

var servidor = net.createServer(function (cliente) {
    var banco = net.connect(PORTA_DESTINO, HOST);

    cliente.pipe(banco);
    banco.pipe(cliente);

    function fechar() {
        cliente.destroy();
        banco.destroy();
    }

    cliente.on("error", fechar);
    banco.on("error", fechar);
    cliente.on("close", fechar);
    banco.on("close", fechar);
});

servidor.on("error", function (erro) {
    if (erro.code === "EADDRINUSE") {
        console.log(`Porta ${PORTA_ORIGEM} ja esta em uso; usando o redirecionamento que ja existe nela.`);
    } else {
        console.log("Erro no redirecionamento de porta:", erro.message);
    }
});

servidor.listen(PORTA_ORIGEM, HOST, function () {
    console.log(`Redirecionando ${HOST}:${PORTA_ORIGEM} -> ${HOST}:${PORTA_DESTINO} (banco local)`);
});
