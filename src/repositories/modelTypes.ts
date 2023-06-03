import { Types } from 'mongoose';

export type UpdateResult = {
    matchedCount: number;
    modifiedCount: number;
    acknowledged: boolean;
    upsertedId: unknown | Types.ObjectId;
    upsertedCount: number;
};
  
export type DeleteResult = {
    acknowledged: boolean;
    deletedCount: number;
};
  
export type CreatedModel = {
    id: string;
    created: boolean;
};