import { Types } from 'mongoose';

export type UpdatedModel = {
    matchedCount: number;
    modifiedCount: number;
    acknowledged: boolean;
    upsertedId: unknown | Types.ObjectId;
    upsertedCount: number;
};
  
export type DeletedModel = {
    acknowledged: boolean;
    deletedCount: number;
};
  
export type CreatedModel = {
    id: string;
    created: boolean;
};