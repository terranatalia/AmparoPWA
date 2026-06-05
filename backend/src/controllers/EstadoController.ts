import { Request, Response } from "express";
import Estado from "../models/Estado";
import Pais from "../models/Pais";

export default class EstadoController {

    // POST /estado/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_pais, nome_estado, sigla_estado } = req.body;

        if (!id_pais) { res.status(422).json({ message: "id_pais obrigatório" }); return; }
        if (!nome_estado) { res.status(422).json({ message: "nome_estado obrigatório" }); return; }
        if (!sigla_estado) { res.status(422).json({ message: "sigla_estado obrigatório" }); return; }

        try {
            await Estado.create({ id_pais, nome_estado, sigla_estado });
            res.status(201).json({ message: "Estado criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /estado/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const estados = await Estado.findAll({ include: [Pais] });
            res.status(200).json({ estados });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /estado/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const estado = await Estado.findOne({ where: { id_estado: id }, include: [Pais] });
            if (!estado) { res.status(404).json({ message: "Estado não encontrado" }); return; }
            res.status(200).json({ estado });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /estado/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_estado, sigla_estado } = req.body;
        try {
            const estado = await Estado.findOne({ where: { id_estado: id } });
            if (!estado) { res.status(404).json({ message: "Estado não encontrado" }); return; }

            if (nome_estado) estado.nome_estado = nome_estado;
            if (sigla_estado) estado.sigla_estado = sigla_estado;

            await estado.save();
            res.status(200).json({ message: "Estado atualizado com sucesso!", estado });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /estado/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const estado = await Estado.findOne({ where: { id_estado: id } });
            if (!estado) { res.status(404).json({ message: "Estado não encontrado" }); return; }
            await estado.destroy();
            res.status(200).json({ message: "Estado deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
