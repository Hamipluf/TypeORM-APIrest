import { type Response, type Request } from "express";
import customResponses from "../utils/customResponse";
import { Comments } from "../entities/Comments";
import { Posts } from "../entities/Posts";
import { Users } from "../entities/Users";
import database from "../DB";

const dataSource = database.getDataSource();
const commentRepository = dataSource.getRepository(Comments);
const postsRepository = dataSource.getRepository(Posts);
const userRepository = dataSource.getRepository(Users);

export const create = async (req: Request, res: Response) => {
    const { text, post_id } = req.body;
    // @ts-expect-error "Necesita tipado"
    const { user } = req;

    if (!text || !post_id || !user.id) {
        return res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."));
    }

    try {
        const userDB = await userRepository.findOne({ where: { id: user.id } });
        const postDB = await postsRepository.findOne({ where: { id: post_id } });

        if (!userDB || !postDB) {
            return res.status(404).json(customResponses.badResponse(404, "Usuario o Post no encontrado."));
        } else {
            const comment = new Comments();
            comment.text = text;
            comment.post = postDB;
            comment.user = userDB;

            await commentRepository.save(comment);
            return res.json(customResponses.responseOk(200, "Comentario creado", comment));
        }
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error creando el comentario", error.message));
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const allComments = await commentRepository.find({
            relations: ["post", "user"]
        });
        return allComments.length > 0 ? res.status(200).json(customResponses.responseOk(200, "Todos los comentarios", allComments)) : res.status(200).json(customResponses.responseOk(204, "No hay comentarios todavía.", allComments));
    } catch (error) {
        return res.status(500).json(error);
    }
};
export const getCommentsByPostId = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(404).json(customResponses.badResponse(404, "El ID del post es requerido."));
    }

    try {
        const comments = await commentRepository.find({
            where: { post: { id: parseInt(postId) } },
            relations: ["user", "post"],
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    active: true
                },
            }
        });

        if (comments.length === 0) {
            return res.status(204).json(customResponses.responseOk(204, `No hay comentarios para el post con id ${postId}.`));
        }

        return res.status(200).json(customResponses.responseOk(200, `Comentarios para el post con id ${postId}`, comments));
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error obteniendo comentarios del post", error.message));
    }
};
export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."));
    }

    try {
        const comment = await commentRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["post", "user"],
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    active: true
                },
            }
        });
        const responseComment = comment ? customResponses.responseOk(200, "Comentario encontrado", comment) : customResponses.responseOk(201, `No se encontró el comentario con id ${id}`);
        return res.json(responseComment);
    } catch (error) {
        return res.json(customResponses.badResponse(500, "Error encontrando el comentario por id", error));
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    const { new_value, field }: { new_value: string, field: string } = req.body;
    const updateFields = ['text'];

    if (!id) {
        return res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."));
    }
    if (!updateFields.includes(field)) {
        return res.status(404).json(customResponses.badResponse(404, "No es un campo válido"));
    }

    try {
        const comment = await commentRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["user"],
            select: {
                user: {
                    id: true,
                },
            }
        });
        // Si el comentario no lo creo el user loggeado no lo puede modificar
        if (comment?.user.id !== user.id) {
            return res.status(404).json(customResponses.badResponse(404, "Solo el autor del comentario puede modificarlo."));
        } else {
            const commentUpdated = await commentRepository.update({ id: parseInt(id) }, { [field]: new_value });
            return commentUpdated.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Comentario no encontrado")) : res.json(customResponses.responseOk(200, `Se actualizó el comentario con id ${id}`, commentUpdated));
        }
    } catch (error: any) {
        console.log(error)
        return res.status(500).json(customResponses.badResponse(500, "Error actualizando el comentario", error.message));
    }
};

export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    if (!id) {
        return res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."));
    }

    try {
        const comment = await commentRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["user"],
            select: {
                user: {
                    id: true,
                },
            }
        });
        if (comment?.user.id !== user.id) {
            return res.status(404).json(customResponses.badResponse(404, "Solo el autor del comentario puede eliminarlo."));
        } else {
            const commentDeleted = await commentRepository.delete({ id: parseInt(id) });
            return commentDeleted.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Comentario no encontrado")) : res.status(204).json(customResponses.responseOk(204, `Comentario ${id} eliminado correctamente.`));
        }
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error eliminando el comentario", error.message));
    }
};
