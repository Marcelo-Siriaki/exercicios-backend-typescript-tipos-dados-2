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
    nome: "Íris",
    email: "iriska@email.com",
    cpf: "111.111.111-11",
    profissao: "Estudante",
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


const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];
    const usuarios = bd.filter((pessoa) => {
        if (filtro) {
            return pessoa.profissao === filtro;
        } else return pessoa
    });

    return usuarios;
}


const atualizarUsuario = (usuarioAtualizado: Usuario): Usuario => {
    let arrayUsuarios: Usuario[] = listarUsuarios();
    arrayUsuarios = arrayUsuarios.map((pessoa) => {
        return pessoa.cpf === usuarioAtualizado.cpf ? usuarioAtualizado : pessoa;
    });
    escreverArquivo(arrayUsuarios);

    return usuarioAtualizado;
}

//outra forma de atualizar o usuario seria:
const atualizarUsuarioAlternativo = (cpf: string, dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(pessoa => pessoa.cpf === cpf);

    if (!usuario) {
        throw new Error(`Usuário de CPF ${cpf} não encontrado`);
    }

    Object.assign(usuario, dados);
    escreverArquivo(bd);
    return dados;
}

const detalharUsuario = (cpfUsuario: string): Usuario => {
    const novoArray = listarUsuarios() as Usuario[];
    const usuarioListado = novoArray.find((pessoa) => {
        return pessoa.cpf === cpfUsuario;
    });

    if (!usuarioListado) {
        throw new Error("Usuário cadastradao com esse CPF não encontrado");
    }

    return usuarioListado;
}

const excluirUsuario = (cpfUsuario: string): Usuario | null => {
    const arrayUsuarios: Usuario[] = listarUsuarios();
    const usuarioExcluido = arrayUsuarios.find(pessoa => pessoa.cpf === cpfUsuario);

    if (!usuarioExcluido) {
        throw new Error(`CPF: ${cpfUsuario} não encontrado`);
    }

    const novoArray = arrayUsuarios.filter(pessoa => pessoa.cpf !== cpfUsuario);
    escreverArquivo(novoArray);

    return usuarioExcluido;
}