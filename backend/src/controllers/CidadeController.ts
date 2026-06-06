import { Request, Response } from "express";
import Cidade from "../models/Cidade";
import Estado from "../models/Estado";

export default class CidadeController {

    // POST /cidade/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_estado, nome_cidade } = req.body;

        if (!id_estado) { res.status(422).json({ message: "id_estado obrigatório" }); return; }
        if (!nome_cidade) { res.status(422).json({ message: "nome_cidade obrigatório" }); return; }

        try {
            await Cidade.create({ id_estado, nome_cidade });
            res.status(201).json({ message: "Cidade criada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /cidade/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const cidades = await Cidade.findAll({ include: [Estado] });
            res.status(200).json({ cidades });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /cidade/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const cidade = await Cidade.findOne({ where: { id_cidade: id }, include: [Estado] });
            if (!cidade) { res.status(404).json({ message: "Cidade não encontrada" }); return; }
            res.status(200).json({ cidade });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /cidade/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_cidade } = req.body;
        try {
            const cidade = await Cidade.findOne({ where: { id_cidade: id } });
            if (!cidade) { res.status(404).json({ message: "Cidade não encontrada" }); return; }

            if (nome_cidade) cidade.nome_cidade = nome_cidade;

            await cidade.save();
            res.status(200).json({ message: "Cidade atualizada com sucesso!", cidade });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /cidade/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const cidade = await Cidade.findOne({ where: { id_cidade: id } });
            if (!cidade) { res.status(404).json({ message: "Cidade não encontrada" }); return; }
            await cidade.destroy();
            res.status(200).json({ message: "Cidade deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
