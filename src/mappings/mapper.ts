import { createMapper, createMap } from '@automapper/core';
import { classes } from '@automapper/classes';
import { User } from '../models/interfaces/iuser.model';
import { UserLoginResponse } from '../dtos/UserDTO';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, User, UserLoginResponse);
