import { Request, Response } from "express";
import Logadouro from "../models/Logadouro";
import Cidade from "../models/Cidade";

export default class LogadouroController {

    // POST /logadouro/create
    static async create(req: Request, res: Response): Promise<void> {
        const { id_cidade, cep, logradouro, complemento, numero, bairro, localidade } = req.body;

        if (!id_cidade)    { res.status(422).json({ message: "id_cidade obrigatório" }); return; }
        if (!cep)          { res.status(422).json({ message: "cep obrigatório" }); return; }
        if (!logradouro)   { res.status(422).json({ message: "logradouro obrigatório" }); return; }
        if (!complemento)  { res.status(422).json({ message: "complemento obrigatório" }); return; }
        if (!numero)       { res.status(422).json({ message: "numero obrigatório" }); return; }
        if (!bairro)       { res.status(422).json({ message: "bairro obrigatório" }); return; }
        if (!localidade)   { res.status(422).json({ message: "localidade obrigatório" }); return; }

        try {
            await Logadouro.create({ id_cidade, cep, logradouro, complemento, numero, bairro, localidade });
            res.status(201).json({ message: "Logadouro criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /logadouro/getAll
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const logadouros = await Logadouro.findAll({ include: [Cidade] });
            res.status(200).json({ logadouros });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // GET /logadouro/getById/:id
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const logadouro = await Logadouro.findOne({ where: { id_logadouro: id }, include: [Cidade] });
            if (!logadouro) { res.status(404).json({ message: "Logadouro não encontrado" }); return; }
            res.status(200).json({ logadouro });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // PUT /logadouro/update/:id
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { cep, logradouro, complemento, numero, bairro, localidade } = req.body;
        try {
            const log = await Logadouro.findOne({ where: { id_logadouro: id } });
            if (!log) { res.status(404).json({ message: "Logadouro não encontrado" }); return; }

            if (cep)        log.cep = cep;
            if (logradouro) log.logradouro = logradouro;
            if (complemento) log.complemento = complemento;
            if (numero)     log.numero = numero;
            if (bairro)     log.bairro = bairro;
            if (localidade) log.localidade = localidade;

            await log.save();
            res.status(200).json({ message: "Logadouro atualizado com sucesso!", log });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    // DELETE /logadouro/delete/:id
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const logadouro = await Logadouro.findOne({ where: { id_logadouro: id } });
            if (!logadouro) { res.status(404).json({ message: "Logadouro não encontrado" }); return; }
            await logadouro.destroy();
            res.status(200).json({ message: "Logadouro deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }
}
