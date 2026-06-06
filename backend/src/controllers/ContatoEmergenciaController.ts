import { Request, Response } from "express";
import ContatoEmergencia from "../models/ContatoEmergencia";
import Usuario from "../models/Usuario";
import UsuarioTipo from "../models/UsuarioTipo";

export default class ContatoEmergenciaController {

    // POST /contato-emergencia/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_usuario, id_usuario_tipo, nome_contato, telefone_contato } = req.body;

        if (!id_usuario)      { res.status(422).json({ message: "id_usuario obrigatório" }); return; }
        if (!id_usuario_tipo) { res.status(422).json({ message: "id_usuario_tipo obrigatório" }); return; }
        if (!nome_contato)    { res.status(422).json({ message: "nome_contato obrigatório" }); return; }
        if (!telefone_contato){ res.status(422).json({ message: "telefone_contato obrigatório" }); return; }

        try {
            await ContatoEmergencia.create({ id_usuario, id_usuario_tipo, nome_contato, telefone_contato });
            res.status(201).json({ message: "Contato de emergência criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /contato-emergencia/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const contatos = await ContatoEmergencia.findAll({ include: [Usuario, UsuarioTipo] });
            res.status(200).json({ contatos });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /contato-emergencia/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const contato = await ContatoEmergencia.findOne({ where: { id_contato_emergencia: id }, include: [Usuario, UsuarioTipo] });
            if (!contato) { res.status(404).json({ message: "Contato de emergência não encontrado" }); return; }
            res.status(200).json({ contato });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /contato-emergencia/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_contato, telefone_contato } = req.body;
        try {
            const contato = await ContatoEmergencia.findOne({ where: { id_contato_emergencia: id } });
            if (!contato) { res.status(404).json({ message: "Contato de emergência não encontrado" }); return; }

            if (nome_contato)     contato.nome_contato = nome_contato;
            if (telefone_contato) contato.telefone_contato = telefone_contato;

            await contato.save();
            res.status(200).json({ message: "Contato de emergência atualizado com sucesso!", contato });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /contato-emergencia/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const contato = await ContatoEmergencia.findOne({ where: { id_contato_emergencia: id } });
            if (!contato) { res.status(404).json({ message: "Contato de emergência não encontrado" }); return; }
            await contato.destroy();
            res.status(200).json({ message: "Contato de emergência deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
