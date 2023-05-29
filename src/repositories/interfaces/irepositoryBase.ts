import { 
    FilterQuery, 
    SaveOptions, 
    QueryOptions, 
    UpdateWithAggregationPipeline, 
    UpdateQuery,
    Condition
} from "mongoose";
import { UpdatedModel, DeletedModel } from "../modelTypes";
import { Types } from "mongoose";

export default interface IRepository<T> {
    create(doc: object, saveOptions?: SaveOptions): Promise<T>;
    findOne(filter: Condition<T>, options?: QueryOptions): Promise<T | null>;
    find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
    findById(id: string | Types.ObjectId): Promise<T | null>;
    findAll(): Promise<T[]>;
    deleteOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<DeletedModel>;
    deleteMany(filter: FilterQuery<T>, options?: QueryOptions): Promise<DeletedModel>;
    updateOne(
        filter: FilterQuery<T>,
        update: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<UpdatedModel>;
    updateMany(
        filter: FilterQuery<T>,
        updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<UpdatedModel>
}