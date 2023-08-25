import prisma from '../services/prismaService.js';

class HorariosService {

    async getAll(){
        return await prisma.horario.findMany();
    }

    async getOne(id){
        return await prisma.horario.findUnique({
            where: { id }
        });
    }

    async create(data){
        return await prisma.horario.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.horario.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.horario.delete({
            where: { id }
        })
    }


}

export default HorariosService;