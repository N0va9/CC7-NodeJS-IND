const AppError = require("../errors/AppError");
const makeCrudController = ({ repository, resourceName = 'resource'}) => ({
    async create(req, res, next) { //TODO MAJ message creation selon la ressource
        try {
            const item = await repository.create(req.body);
            let entityName = item.name || item.title ||item.firstName + ' ' + item.lastName;
            let endString = '';
            if (resourceName == "Mark") {
                entityName= 'for '+ item.email;
            }
            if (resourceName == "Role") {
                entityName= item.role;
                endString = " for the given artist and movie"
            }

            res.status(201).json({
                message: `The ${resourceName.toLowerCase()} ${entityName} has been created${endString}`,
            });
        } catch(err) {
            next(err);
        }
    },


    async getAll(req, res, next) {
        try {
            const items = await repository.findAll(req.query);
            res.json(items);
        } catch(err) {
            next(err);
        }
    },
    

    async getOne(req, res, next) {
        try {
            const item = await repository.findById(req.params.id);
            if (!item) {
                throw new AppError(
                    404,
                    `${resourceName.toUpperCase()}_NOT_FOUND`,
                    `${resourceName} not found`
                );
            }
            res.status(200).json(item);
        } catch(err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const item = await repository.update(req.params.id, req.body);
            if (!item) {
                throw new AppError(
                    404,
                    `${resourceName.toUpperCase()}_NOT_FOUND`,
                    `${resourceName} not found`
                );
            }
            res.status(200).json(item);
        } catch(err) {
            next(err);
        }
    },


    async delete(req, res, next) {
        try {
            const item = await repository.delete(req.params.id);
            if (!item) {
                throw new AppError(
                    404,
                    `${resourceName.toUpperCase()}_NOT_FOUND`,
                    `${resourceName} not found`
                );
            }
            res.sendStatus(204);
        } catch(err) {
            next(err);
        }
    },
})

module.exports = makeCrudController;