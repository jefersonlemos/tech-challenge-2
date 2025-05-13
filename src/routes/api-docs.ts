/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista de Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 * 
 * /posts/{id}:
 *   get:
 *     summary: Leitura de Post
 *     tags: [Posts]
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
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
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
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
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
 *         description: Erro interno do servidor
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
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavras-chave
 *     tags: [Posts]
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
 */

/**
 * @swagger
 * /posts/search/{q}:
 *   get:
 *     summary: Busca posts por palavras-chave usando parâmetro de rota
 *     tags: [Posts]
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
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
