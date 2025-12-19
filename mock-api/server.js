const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const routes = require('./routes.json');

const rewriter = jsonServer.rewriter(routes);

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint custom de login
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Devuelves un token simple
  return res.json({
    token: user.token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

/*
// Middleware para simular auth en rutas protegidas (opcional)
server.use((req, res, next) => {
  if (req.path.startsWith('/projects') || req.path.startsWith('/tasks')) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    const db = router.db;
    const user = db.get('users').find({ token }).value();

    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
  }
  next();
});
*/

// Rewriter para rutas personalizadas
server.use(rewriter);

// Router principal
server.use(router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
