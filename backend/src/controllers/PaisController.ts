import { Request, Response } from "express";
import Pais from "../models/Pais";

export default class PaisController {

    // POST /pais/create
    static async create(req: Request, res: Response): Promise<void> {
        const { nome_pais, sigla_pais } = req.body;

        if (!nome_pais) { res.status(422).json({ message: "nome_pais obrigatório" }); return; }
        if (!sigla_pais) { res.status(422).json({ message: "sigla_pais obrigatório" }); return; }

        try {
            await Pais.create({ nome_pais, sigla_pais });
            res.status(201).json({ message: "País criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /pais/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const paises = await Pais.findAll();
            res.status(200).json({ paises });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /pais/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const pais = await Pais.findOne({ where: { id_pais: id } });
            if (!pais) { res.status(404).json({ message: "País não encontrado" }); return; }
            res.status(200).json({ pais });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /pais/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nome_pais, sigla_pais } = req.body;
        try {
            const pais = await Pais.findOne({ where: { id_pais: id } });
            if (!pais) { res.status(404).json({ message: "País não encontrado" }); return; }

            if (nome_pais) pais.nome_pais = nome_pais;
            if (sigla_pais) pais.sigla_pais = sigla_pais;

            await pais.save();
            res.status(200).json({ message: "País atualizado com sucesso!", pais });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /pais/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const pais = await Pais.findOne({ where: { id_pais: id } });
            if (!pais) { res.status(404).json({ message: "País não encontrado" }); return; }
            await pais.destroy();
            res.status(200).json({ message: "País deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
