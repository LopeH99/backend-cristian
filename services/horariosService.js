import prisma from '../services/prismaService.js';

class HorariosService {

    async getAll(){
        return await prisma.horarios.findMany();
    }

    async getOne(id){
        return await prisma.horarios.findOne({
            where: { id }
        });
    }

    async create(data){
        return await prisma.horarios.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.horarios.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.horarios.delete({
            where: { id }
        })
    }


}

export default HorariosService;