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
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
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
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um Post
 *     tags: [Posts]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       204:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */

/**
 * @swagger
 *components:
 *  schemas:
 *   Post:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: ID do post
 *         example: 67a4d111650febdeb677c4af
 *       titulo:
 *         type: string
 *         description: Título do post
 *         example: Dica de Gramática
 *       conteudo:
 *         type: string
 *         description: Conteúdo do post
 *         example: A crase é um acento grave indicativo de crase.
 *       autor:
 *         type: string
 *         description: Autor do post
 *         example: João da Silva
 *       __v:
 *         type: number
 *         description: Versão do documento
 *         example: 0
 */