import fs from "fs/promises";


const lerArquivo = async () => {

    return JSON.parse(await fs.readFile("../bd.json", "utf-8"));

}

lerArquivo()
    .then((resultado) => console.log(resultado))
    .catch((error) => console.error(`Erro geral: ${error}`));
