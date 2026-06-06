import { Request, Response } from "express";
import UsuarioTipo from "../models/UsuarioTipo";
import Usuario from "../models/Usuario";

export default class UsuarioTipoController {

    // POST /usuario-tipo/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_usuario, nome_usuario_tipo } = req.body;

        if (!id_usuario) { res.status(422).json({ message: "id_usuario obrigatório" }); return; }
        if (!nome_usuario_tipo) { res.status(422).json({ message: "nome_usuario_tipo obrigatório" }); return; }

        try {
            await UsuarioTipo.create({ id_usuario, nome_usuario_tipo });
            res.status(201).json({ message: "Tipo de usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /usuario-tipo/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const tipos = await UsuarioTipo.findAll({ include: [Usuario] });
            res.status(200).json({ tipos });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /usuario-tipo/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const tipo = await UsuarioTipo.findOne({ where: { id_usuario_tipo: id }, include: [Usuario] });
            if (!tipo) { res.status(404).json({ message: "Tipo de usuário não encontrado" }); return; }
            res.status(200).json({ tipo });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /usuario-tipo/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_usuario_tipo } = req.body;
        try {
            const tipo = await UsuarioTipo.findOne({ where: { id_usuario_tipo: id } });
            if (!tipo) { res.status(404).json({ message: "Tipo de usuário não encontrado" }); return; }

            if (nome_usuario_tipo) tipo.nome_usuario_tipo = nome_usuario_tipo;

            await tipo.save();
            res.status(200).json({ message: "Tipo de usuário atualizado com sucesso!", tipo });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /usuario-tipo/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const tipo = await UsuarioTipo.findOne({ where: { id_usuario_tipo: id } });
            if (!tipo) { res.status(404).json({ message: "Tipo de usuário não encontrado" }); return; }
            await tipo.destroy();
            res.status(200).json({ message: "Tipo de usuário deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
