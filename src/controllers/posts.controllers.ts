import { Response, Request } from "express";
import customResponses from "../utils/customResponse";
import { Posts } from "../entities/Posts";
import { Users } from "../entities/Users";
import database from "../DB";
const dataSource = database.getDataSource()
const postsRepository = dataSource.getRepository(Posts)
const userRepository = dataSource.getRepository(Users)
export const create = async (req: Request, res: Response) => {
    const { title, content } = req.body
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    if (!title || !content || !user.id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    try {
        const userDB = await userRepository.findBy({ id: user.id })

        if (!userDB) {
            return res.status(404).json(customResponses.badResponse(404, "Necesitas crear un usuario para poder crear un post."))
        } else {
            const newPost = new Posts()
            newPost.title = title,
                newPost.content = content,
                newPost.owner = user.id
            await postsRepository.save(newPost)
            const postById = await postsRepository.findOne({
                where: {
                    id: newPost.id,
                },
                relations: ["owner"],
                select: {
                    owner: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        active: true
                    }
                }
            })
            return res.json(customResponses.responseOk(200, "Post Creado", postById))

        }
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error creando el post", error.message))
    }
}
export const getAll = async (req: Request, res: Response) => {
    try {
        const allPosts = await postsRepository.find({
            relations: {
                owner: true
            },
            select: {
                owner: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    active: true
                }
            }
        })
        return allPosts.length > 0 ? res.status(200).json(customResponses.responseOk(200, "Todos los posts", allPosts)) : res.status(200).json(customResponses.responseOk(204, "No hay posts todavia.", allPosts))
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    try {
        const post = await postsRepository.findOne({
            where: {
                id: parseInt(id),
            },
            relations: ["owner"],
            select: {
                owner: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    active: true
                }
            }
        })
        const responsePost = post ? customResponses.responseOk(200, "Post Encontrado", post) : customResponses.responseOk(201, `No se encontro el post con id ${id}`)
        return res.json(responsePost)
    } catch (error) {
        return res.json(customResponses.badResponse(500, "Error encontrando el post por id", error))
    }
}
export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    const { newValue, field }: { newValue: string, field: string } = req.body
    const updateFields = ['title', 'content',]
    if (!id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    if (!updateFields.includes(field)) {
        return res.status(404).json(customResponses.badResponse(404, "No es un campo valido"))
    }

    try {
        const post = await postsRepository.findOne({
            where: {
                id: parseInt(id),
            },
            relations: ["owner"],
            select: {
                owner: {
                    id: true,
                }
            }
        })
        if (post?.owner.id !== user.id) {
            return res.status(404).json(customResponses.badResponse(404, "Solo el autor del post puede modificarlo."))
        } else {
            const postUpdated = await postsRepository.update({ id: parseInt(id) }, { [field]: newValue })
            return postUpdated.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Post no encontrado",)) : res.json(customResponses.responseOk(200, `Se actualizo el post con id ${id}`, postUpdated))
        }
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error Actualizando el post", error.message))
    }
}
export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    if (!id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    try {
        const post = await postsRepository.findOne({
            where: {
                id: parseInt(id),
            },
            relations: ["owner"],
            select: {
                owner: {
                    id: true,
                }
            }
        })
        if (post ? post?.owner.id !== user.id : false) {
            return res.status(404).json(customResponses.badResponse(404, "Solo el autor del post puede eliminarlo."))
        } else {
            const postDeleted = await postsRepository.delete({ id: parseInt(id) });
            return postDeleted.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Post no encontrado",)) : res.status(204).json(customResponses.responseOk(204, `Post ${id} eliminado correctamente.`));
        }




    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error Eliminando el post", error.message))

    }



}