import fs from "fs";

const lerArquivo = (): unknown => {

    return JSON.parse(fs.readFileSync("./bd.json", "utf-8"));
}

const escreverArquivo = (dados: any) => {

    return fs.writeFileSync("./bd.json", JSON.stringify(dados))
}

console.log(lerArquivo());

const arquivo = lerArquivo() as string[];
arquivo.push("Luciana");

console.log(escreverArquivo(arquivo));

console.log(lerArquivo());