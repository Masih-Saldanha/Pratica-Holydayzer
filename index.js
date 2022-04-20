import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const hoje = new Date();
const hojeString = hoje.toLocaleDateString();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get("/holidays", (req, res) => {
    res.send(holidays);
})

app.get("/is-today-holiday", (req, res) => {
    let resposta = "Não, hoje não é feriado";

    holidays.filter(feriado => {
        const dataFeriado = new Date(feriado.date).toLocaleDateString();
        if (dataFeriado === hojeString) {
            resposta = `Sim, hoje é ${feriado.name}`;
        }
    })

    res.send(resposta);
})

app.get("/holidays/:mes", (req, res) => {
    const mes = req.params.mes;
    const data = new Date(`${mes}`);
    const mesApenas = data.getMonth();

    const feriadosDoMes = holidays.filter(feriado => {
        const dataFeriado = new Date(`${feriado.date}`);
        const mesFeriado = dataFeriado.getMonth();
        if (mesFeriado === mesApenas) {
            return feriado;
        }
    })
    res.send(feriadosDoMes);
})

app.listen(5000);