import { 
    Document, 
    Model, 
    FilterQuery, 
    QueryOptions, 
    Condition,
    UpdateQuery, 
    UpdateWithAggregationPipeline
} from 'mongoose';
import { UpdatedModel, DeletedModel } from "./modelTypes";
import IRepository from './interfaces/irepositoryBase';

export class RepositoryBase<T extends Document> implements IRepository<T> {
    private _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    async create(doc: object): Promise<T> {
        return await this._model.create(doc);
    }
    
    async findOne(condition: Condition<T>, options?: QueryOptions): Promise<T | null> {
        return await this._model.findOne(condition, options);
    }

    async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
        return await this._model.find(filter, null, options);
    }
    
    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id);
    }
    
    async findAll(): Promise<T[]> {
        return await this._model.find();
    }
    
    async deleteOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<DeletedModel> {
        return await this._model.deleteOne(filter, options);
    }

    async deleteMany(filter: FilterQuery<T>, options?: QueryOptions): Promise<DeletedModel> {
        return await this._model.deleteMany(filter, options);
    }
    
    async updateOne(
        filter: FilterQuery<T>,
        updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<UpdatedModel> {
        return await this._model.updateOne(filter, updated, options);
    }
    
    async updateMany(
        filter: FilterQuery<T>,
        updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<UpdatedModel> {
        return await this._model.updateMany(filter, updated, options);
    }
}