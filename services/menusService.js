import prisma from './prismaService.js';

class MenusService {

    async getAll(){
        return await prisma.menus.findMany();
    }

    async getOne(id){
        return await prisma.menus.findOne({
            where: { id }
        });
    }

    async create(data){
        return await prisma.menus.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.menus.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.menus.delete({
            where: { id }
        })
    }


}

export default MenusService;