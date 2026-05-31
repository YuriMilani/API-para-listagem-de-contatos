const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const port = 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


const app = express();
app.use(express.json());


app.post('/clinicadb', async (req, res) => {

    const { medicos, email } = req.body;

    if(!medicos || !email) {
        return res.status(400).json({ error: 'Médicos e email são obrigatórios' });
    }
    const { data, error } = await supabase
        .from('clinicadb')
        .insert([{ medicos, email }])
        .select();

    if (error) {
        console.error('Erro ao inserir cliente:', error);
        return res.status(500).json({ error: 'Erro ao inserir cliente' });
    }
    return res.status(201).json({ message : 'Cliente inserido com sucesso',data });
});

app.get('/clinicadb', async (req, res) => {
    const { data, error } = await supabase
        .from('clinicadb')
        .select('*');

    if (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }

    return res.status(200).json({ data });
});

app.get('/clinicadb/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('clinicadb')
        .select('*')
        .eq('id', id);

    if (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }

    return res.status(200).json({ data });
});

app.listen(port, () => {

  console.log(`Servidor rodando na porta ${port}`);
});