import fs from "fs";

const lerArquivo = (): unknown => {

    return JSON.parse(fs.readFileSync("./bd.json", "utf-8"));
}

const escreverArquivo = (dados: any) => {

    return fs.writeFileSync("./bd.json", JSON.stringify(dados))
}


type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}
type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const usuario1: Usuario = {
    nome: "Marcelo Siriaki Rodrigues",
    email: "msiriaki@gmail.com",
    cpf: "012.321.234-32",
    profissao: "professor",
    endereco: {
        cep: "80240-040",
        rua: "Getúlio Vargas",
        bairro: "Água Verde",
        cidade: "Curitiba"
    }
}

const usuario2: Usuario = {
    nome: "Natália",
    email: "natalia@email.com",
    cpf: "012.321.234-32",
    endereco: null
}

const usuario3: Usuario = {
    nome: "Natália",
    email: "natalia@email.com",
    cpf: "000.000.000-00",
    profissao: "Médica",
    endereco: {
        cep: "80240-040",
        rua: "Getúlio Vargas",
        bairro: "Água Verde",
        cidade: "Curitiba"
    }
}

const cadastrarUsuario = (infos: Usuario): Usuario => {
    let dados: any = lerArquivo();
    dados.push(infos);

    escreverArquivo(dados);

    return infos;
}


const listarUsuarios = (): Usuario[] => {
    return lerArquivo() as Usuario[];
}


const atualizarUsuario = (usuarioAtualizado: Usuario): Usuario => {
    let arrayUsuarios: Usuario[] = listarUsuarios();
    arrayUsuarios = arrayUsuarios.map((pessoa) => {
        return pessoa.cpf === usuarioAtualizado.cpf ? usuarioAtualizado : pessoa;
    });
    escreverArquivo(arrayUsuarios);

    return usuarioAtualizado;
}

const detalharUsuario = (cpfUsuario: string): Usuario => {
    return listarUsuarios().find((pessoa) => {
        return pessoa.cpf === cpfUsuario;
    }) as Usuario;
}

console.log(detalharUsuario("000.000.000-00"));