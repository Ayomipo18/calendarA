import { 
    FilterQuery, 
    SaveOptions, 
    QueryOptions,
    ProjectionType,
    UpdateWithAggregationPipeline, 
    UpdateQuery,
    QueryWithHelpers,
    HydratedDocument
} from "mongoose";
import { UpdateResult, DeleteResult } from "../modelTypes";
import { Types } from "mongoose";

export default interface IRepository<T> {
    create(doc: object): HydratedDocument<T>;

    findOne(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T> | null, HydratedDocument<T>>;

    find(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T>[], HydratedDocument<T>>;

    findById(id: string | Types.ObjectId, projection?: ProjectionType<T>, options?: QueryOptions): 
    QueryWithHelpers<HydratedDocument<T> | null, HydratedDocument<T>>;

    deleteOne(filter?: FilterQuery<T>, options?: QueryOptions): 
    QueryWithHelpers<DeleteResult, HydratedDocument<T>>;

    deleteMany(filter?: FilterQuery<T>, options?: QueryOptions): 
    QueryWithHelpers<DeleteResult, HydratedDocument<T>>;

    updateOne(
        filter?: FilterQuery<T>,
        update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>,
    ): QueryWithHelpers<UpdateResult, HydratedDocument<T>>;

    updateMany(
        filter?: FilterQuery<T>,
        update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>,
    ): QueryWithHelpers<UpdateResult, HydratedDocument<T>>;
}