import { 
    Document,
    Model, 
    FilterQuery, 
    QueryOptions,
    UpdateQuery, 
    UpdateWithAggregationPipeline,
    Types,
    QueryWithHelpers,
    HydratedDocument,
    ProjectionType
} from 'mongoose';
import { UpdateResult, DeleteResult } from "./modelTypes";
import IRepository from './interfaces/irepositoryBase';

export class RepositoryBase<T> implements IRepository<T> {
    private _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    create(doc: object): HydratedDocument<T> {
        return new this._model(doc)
    }
    
    findOne(condition: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T> | null, HydratedDocument<T>> {
        return this._model.findOne(condition, projection, options);
    }

    find(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T>[], HydratedDocument<T>> {
        return this._model.find(filter, projection, options);
    }
    
    findById(id: string | Types.ObjectId, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T> | null, HydratedDocument<T>> {
        return this._model.findById(id);
    }
    
    deleteOne(filter?: FilterQuery<T>, options?: QueryOptions): 
    QueryWithHelpers<DeleteResult, HydratedDocument<T>> {
        return this._model.deleteOne(filter, options);
    }

    deleteMany(filter?: FilterQuery<T>, options?: QueryOptions): 
    QueryWithHelpers<DeleteResult, HydratedDocument<T>> {
        return this._model.deleteMany(filter, options);
    }
    
    updateOne(
        filter?: FilterQuery<T>,
        updated?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>,
    ): QueryWithHelpers<UpdateResult, HydratedDocument<T>> {
        return this._model.updateOne(filter, updated, options);
    }
    
    updateMany(
        filter?: FilterQuery<T>,
        updated?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>,
    ): QueryWithHelpers<UpdateResult, HydratedDocument<T>> {
        return this._model.updateMany(filter, updated, options);
    }
}