import { Request, Response } from "express";
import Alerta from "../models/Alerta";
import Mensagem from "../models/Mensagem";

export default class AlertaController {

    // POST /alerta/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_mensagem, id_usuario, data_hora, status, observacao } = req.body;

        if (!id_mensagem) { res.status(422).json({ message: "id_mensagem obrigatório" }); return; }
        if (!id_usuario)  { res.status(422).json({ message: "id_usuario obrigatório" }); return; }
        if (!data_hora)   { res.status(422).json({ message: "data_hora obrigatório" }); return; }
        if (!status)      { res.status(422).json({ message: "status obrigatório" }); return; }
        if (!observacao)  { res.status(422).json({ message: "observacao obrigatório" }); return; }

        try {
            await Alerta.create({ id_mensagem, id_usuario, data_hora, status, observacao });
            res.status(201).json({ message: "Alerta criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /alerta/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const alertas = await Alerta.findAll({ include: [Mensagem] });
            res.status(200).json({ alertas });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /alerta/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const alerta = await Alerta.findOne({ where: { id_alerta: id }, include: [Mensagem] });
            if (!alerta) { res.status(404).json({ message: "Alerta não encontrado" }); return; }
            res.status(200).json({ alerta });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /alerta/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { status, observacao } = req.body;
        try {
            const alerta = await Alerta.findOne({ where: { id_alerta: id } });
            if (!alerta) { res.status(404).json({ message: "Alerta não encontrado" }); return; }

            if (status)    alerta.status = status;
            if (observacao) alerta.observacao = observacao;

            await alerta.save();
            res.status(200).json({ message: "Alerta atualizado com sucesso!", alerta });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /alerta/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const alerta = await Alerta.findOne({ where: { id_alerta: id } });
            if (!alerta) { res.status(404).json({ message: "Alerta não encontrado" }); return; }
            await alerta.destroy();
            res.status(200).json({ message: "Alerta deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
