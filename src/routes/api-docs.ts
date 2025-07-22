/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista de Posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Nenhum post encontrado
 *       500:
 *         description: Falha na requisição dos posts
 *
 * /posts/{id}:
 *   get:
 *     summary: Leitura de Post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Falha na requisição do post
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *               - autor
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do post
 *                 example: Dica de Gramática
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do post
 *                 example: A crase é um acento grave indicativo de crase.
 *               autor:
 *                 type: string
 *                 description: Autor do post
 *                 example: João da Silva
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem criar posts
 *       500:
 *         description: Falha ao cadastrar novo post
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um Post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem excluir posts
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Falha na exclusão do post
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do post
 *                 example: Dica de Gramática Atualizada
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do post
 *                 example: A crase é um acento grave indicativo de crase.
 *               autor:
 *                 type: string
 *                 description: Autor do post
 *                 example: João da Silva
 *     responses:
 *       200:
 *         description: Post atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem atualizar posts
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Falha na atualização do post
 */

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavras-chave
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *        description: Termo de busca para filtrar posts
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Nenhum post encontrado com as palavras-chave fornecidas
 *       500:
 *         description: Falha na busca
 */

/**
 * @swagger
 * /posts/search/{q}:
 *   get:
 *     summary: Busca posts por palavras-chave usando parâmetro de rota
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: q
 *        required: true
 *        schema:
 *          type: string
 *        description: Termo de busca para filtrar posts
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Nenhum post encontrado com as palavras-chave fornecidas
 *       500:
 *         description: Falha na busca
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista de usuários (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem acessar usuários
 *       404:
 *         description: Nenhum usuário encontrado
 *       500:
 *         description: Erro ao listar usuários
 *
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem acessar usuários
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum: [student, teacher]
 *                 example: student
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userCriado:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem criar usuários
 *       500:
 *         description: Falha ao cadastrar novo usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: novaSenha123
 *               role:
 *                 type: string
 *                 enum: [student, teacher]
 *                 example: student
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem atualizar usuários
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Falha ao atualizar usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem excluir usuários
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Falha ao excluir usuário
 */

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Busca usuários por palavras-chave (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *        description: Termo de busca para filtrar usuários
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem acessar usuários
 *       404:
 *         description: Nenhum usuário encontrado com as palavras-chave fornecidas
 *       500:
 *         description: Erro ao buscar usuários
 */

/**
 * @swagger
 * /users/search/{q}:
 *   get:
 *     summary: Busca usuários por palavras-chave usando parâmetro de rota (apenas professores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: q
 *        required: true
 *        schema:
 *          type: string
 *        description: Termo de busca para filtrar usuários
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado. Apenas professores podem acessar usuários
 *       404:
 *         description: Nenhum usuário encontrado com as palavras-chave fornecidas
 *       500:
 *         description: Erro ao buscar usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum: [student, teacher]
 *                 example: student
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do post
 *           example: 67a4d111650febdeb677c4af
 *         titulo:
 *           type: string
 *           description: Título do post
 *           example: Dica de Gramática
 *         conteudo:
 *           type: string
 *           description: Conteúdo do post
 *           example: A crase é um acento grave indicativo de crase.
 *         autor:
 *           type: string
 *           description: Autor do post
 *           example: João da Silva
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do usuário
 *           example: 67a4d111650febdeb677c4b0
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: usuario@email.com
 *         role:
 *           type: string
 *           enum: [student, teacher]
 *           description: Papel do usuário
 *           example: student
 */
