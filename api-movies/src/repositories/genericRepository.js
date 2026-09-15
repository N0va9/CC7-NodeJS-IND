class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(query = {}, options={}) {
        return await this.model.find(query, null, options);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = GenericRepository;