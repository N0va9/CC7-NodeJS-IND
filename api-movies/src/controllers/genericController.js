const makeCrudController = ({ repository, resourceName = 'resource'}) => ({
    async create(req, res, next) {
        try {
            const item = await repository.create(req.body);
            res.status(201).json(item)
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
                return res.status(404).json({ message : `${resourceName} not found`});
            }
            res.json(item);
        } catch(err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const item = await repository.update(req.params.id, req.body);
            if (!item) {
                return res.status(404).json({ message : `${resourceName} not found`});
            }
            res.json(item);
        } catch(err) {
            next(err);
        }
    },


    async delete(req, res, next) {
        try {
            const item = await repository.delete(req.params.id);
            if (!item) {
                return res.status(404).json({ message : `${resourceName} not found`});
            }
            res.status(204).send();
        } catch(err) {
            next(err);
        }
    },
})

module.exports = makeCrudController;