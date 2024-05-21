import bcrypt from "bcrypt";
import { type responseHash } from "./interfaces/reposne";
export async function hashData(data: string): Promise<responseHash> {
    try {
        const dataHshed = await bcrypt.hash(data, 10);
        return { error: false, dataHash: dataHshed };
    } catch (error) {
        console.log(error)
        return { error: true, message: "Error en hashar la contraseña" };
    }
}
export async function compareData(data: string, dataDB: string): Promise<responseHash> {
    try {
        const dataCompared = await bcrypt.compare(data, dataDB);
        return { error: false, dataHash: dataCompared };

    } catch (error) {
        return { error: true, message: 'Error en comparar la data o data no encontrada' };
    }
}