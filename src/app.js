import express from 'express';
import promBundle from 'express-prom-bundle';


const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());


// ===== Métricas Prometheus =====
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {}
    }
});
app.use(metricsMiddleware);


// ===== Funções matemáticas =====
const ops = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => {
        if (b === 0) throw new Error('Divisão por zero');
        return a / b;
    }
};


// ===== Rota de cálculo =====
app.post('/calc', (req, res) => {
    const { a, b, op } = req.body;
    if (typeof a !== 'number' || typeof b !== 'number' || !op)
        return res.status(400).json({ error: 'Parâmetros inválidos' });


    const fn = ops[op];
    if (!fn) return res.status(400).json({ error: 'Operação inválida' });


    try {
        const result = fn(a, b);
        console.log(`Operação: ${op}, a=${a}, b=${b}, resultado=${result}`);
        res.json({ result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// ===== Health Check =====
app.get('/health', (_, res) => res.json({ status: 'ok' }));


// ===== Inicialização =====
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});