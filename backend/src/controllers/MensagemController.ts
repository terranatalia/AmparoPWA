import { Request, Response } from "express";
import Mensagem from "../models/Mensagem";
import ContatoEmergencia from "../models/ContatoEmergencia";

export default class MensagemController {

    // POST /mensagem/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_contato_emergencia, texto } = req.body;

        if (!id_contato_emergencia) { res.status(422).json({ message: "id_contato_emergencia obrigatório" }); return; }
        if (!texto)                 { res.status(422).json({ message: "texto obrigatório" }); return; }

        try {
            await Mensagem.create({ id_contato_emergencia, texto });
            res.status(201).json({ message: "Mensagem criada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /mensagem/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const mensagens = await Mensagem.findAll({ include: [ContatoEmergencia] });
            res.status(200).json({ mensagens });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /mensagem/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const mensagem = await Mensagem.findOne({ where: { id_mensagem: id }, include: [ContatoEmergencia] });
            if (!mensagem) { res.status(404).json({ message: "Mensagem não encontrada" }); return; }
            res.status(200).json({ mensagem });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /mensagem/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { texto } = req.body;
        try {
            const mensagem = await Mensagem.findOne({ where: { id_mensagem: id } });
            if (!mensagem) { res.status(404).json({ message: "Mensagem não encontrada" }); return; }

            if (texto) mensagem.texto = texto;

            await mensagem.save();
            res.status(200).json({ message: "Mensagem atualizada com sucesso!", mensagem });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /mensagem/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const mensagem = await Mensagem.findOne({ where: { id_mensagem: id } });
            if (!mensagem) { res.status(404).json({ message: "Mensagem não encontrada" }); return; }
            await mensagem.destroy();
            res.status(200).json({ message: "Mensagem deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
