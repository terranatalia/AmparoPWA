import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import Logadouro from "../models/Logadouro";

export default class UsuarioController {

    // POST /usuario/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_logadouro, nome_usuario, email_usuario, senha_usuario, telefone_usuario, data_nascimento, genero_usuario } = req.body;

        if (!id_logadouro)     { res.status(422).json({ message: "id_logadouro obrigatório" }); return; }
        if (!nome_usuario)     { res.status(422).json({ message: "nome_usuario obrigatório" }); return; }
        if (!email_usuario)    { res.status(422).json({ message: "email_usuario obrigatório" }); return; }
        if (!senha_usuario)    { res.status(422).json({ message: "senha_usuario obrigatório" }); return; }
        if (!telefone_usuario) { res.status(422).json({ message: "telefone_usuario obrigatório" }); return; }
        if (!data_nascimento)  { res.status(422).json({ message: "data_nascimento obrigatório" }); return; }
        if (!genero_usuario)   { res.status(422).json({ message: "genero_usuario obrigatório" }); return; }

        try {
            await Usuario.create({ id_logadouro, nome_usuario, email_usuario, senha_usuario, telefone_usuario, data_nascimento, genero_usuario });
            res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /usuario/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await Usuario.findAll({ include: [Logadouro] });
            res.status(200).json({ usuarios });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /usuario/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findOne({ where: { id_usuario: id }, include: [Logadouro] });
            if (!usuario) { res.status(404).json({ message: "Usuário não encontrado" }); return; }
            res.status(200).json({ usuario });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /usuario/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_usuario, email_usuario, telefone_usuario, genero_usuario } = req.body;
        try {
            const usuario = await Usuario.findOne({ where: { id_usuario: id } });
            if (!usuario) { res.status(404).json({ message: "Usuário não encontrado" }); return; }

            if (nome_usuario)     usuario.nome_usuario = nome_usuario;
            if (email_usuario)    usuario.email_usuario = email_usuario;
            if (telefone_usuario) usuario.telefone_usuario = telefone_usuario;
            if (genero_usuario)   usuario.genero_usuario = genero_usuario;

            await usuario.save();
            res.status(200).json({ message: "Usuário atualizado com sucesso!", usuario });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /usuario/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findOne({ where: { id_usuario: id } });
            if (!usuario) { res.status(404).json({ message: "Usuário não encontrado" }); return; }
            await usuario.destroy();
            res.status(200).json({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
