import { type Request, type Response } from "express"
import customResponses from "../utils/customResponse";
import { Users } from "../entities/Users";
import database from "../DB";
import { compareData, hashData } from "../utils/hashData";
import authManager from '../utils/jwtManager'
const dataSource = database.getDataSource()
const userRepository = dataSource.getRepository(Users)
export const create = async (req: Request, res: Response) => {
    const { first_name, last_name, password, email } = req.body
    if (!first_name || !last_name || !password || !email) {
        res.status(400).json(customResponses.badResponse(400, "Faltan campos a completar."))
    }
    try {
        const user = new Users()
        const hashPass = await hashData(password)
        if (hashPass.error) {
            res.status(404).json(customResponses.badResponse(404, hashPass.message || 'Error hasheando la contraseña.'))
        }
        user.first_name = first_name,
            user.last_name = last_name,
            user.email = email,
            user.password = hashPass.dataHash
        await userRepository.save(user)
        const userJWT = {
            ...user,
            password: undefined
        }
        const token = authManager.generateToken(userJWT)
        return token ? res.status(200).json(customResponses.responseOk(200, "User Created", { user: userJWT, token })) : res.status(400).json(customResponses.badResponse(400, 'Error al general el token', { user: userJWT, token }))
    } catch (error) {
        return res.status(500).json(customResponses.badResponse(500, "Error creando el user", error))
    }
}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!password || !email) {
        res.status(400).json(customResponses.badResponse(400, "Faltan campos a completar."))
    }
    try {
        const user = await userRepository.findOneBy({ 'email': email })
        const userJWT = { ...user, password: undefined }
        const isPasswordCorrect = user?.password && (await compareData(password, user.password)).dataHash
        if (isPasswordCorrect) {
            const token = authManager.generateToken(userJWT)
            return token ? res.status(200).json(customResponses.responseOk(200, `Bienvenido ${user.first_name}`, { user: userJWT, token })) : res.status(400).json(customResponses.badResponse(400, 'Error al general el token', { user: userJWT, token }))
        } else {
            return res.status(400).json(customResponses.badResponse(400, "Contraseña Incorrecta"))
        }
    } catch (error: any) {
        console.log(error)
        return res.status(500).json(customResponses.badResponse(500, "Error logeando al user", error.message))
    }
}
export const getAll = async (req: Request, res: Response) => {
    try {
        const allUsers = await userRepository.find()
        return allUsers.length > 0 ? res.status(201).json(customResponses.responseOk(200, "Todos los usuarios", allUsers)) : res.status(200).json(customResponses.responseOk(201, "No hay usuarios todavia.", allUsers))
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
        const user = await userRepository.findOneBy({ id: parseInt(id) })
        const responseUser = user ? customResponses.responseOk(200, "User Encontrado", user) : customResponses.responseOk(201, `No se encontro el user con id ${id}`)
        return res.json(responseUser)
    } catch (error) {
        return res.json(customResponses.badResponse(500, "Error encontrando el usuario por id", error))
    }
}
export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { newValue, field }: { newValue: string, field: string } = req.body
    const updateFields = ['first_name', 'last_name', 'active']
    if (!id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    if (!updateFields.includes(field)) {
        return res.status(404).json(customResponses.badResponse(404, "No es un campo valido"))
    }

    try {
        const userUpdated = await userRepository.update({ id: parseInt(id) }, { [field]: newValue })
        return userUpdated.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Usuairo no encontrado",)) : res.json(customResponses.responseOk(200, `Se actualizo el user con id ${id}`, userUpdated))
    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error Actualizando el user", error.message))
    }
}
export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(404).json(customResponses.badResponse(404, "Faltan campos a completar."))
    }
    try {
        const userDeleted = await userRepository.delete({ id: parseInt(id) });

        return userDeleted.affected === 0 ? res.status(404).json(customResponses.badResponse(404, "Usuairo no encontrado",)) : res.status(204).json(customResponses.responseOk(204, `User ${id} eliminado correctamente.`));


    } catch (error: any) {
        return res.status(500).json(customResponses.badResponse(500, "Error Eliminando el user", error.message))

    }



}
export const getCurrentUser = async (req: Request, res: Response) => {
    // @ts-expect-error "Necesita tipado"
    const { user } = req
    return user.id ? res.status(200).json(customResponses.responseOk(200, "User encontrado", user)) : res.status(400).json(customResponses.badResponse(400, "No hay usuario logeado"))






}