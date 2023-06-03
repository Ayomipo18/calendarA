import { createMapper, createMap, forMember, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import { User } from '../models/interfaces/iuser.model';
import { Event } from '../models/interfaces/ievent.model';
import { UserLoginResponse } from '../dtos/UserDTO';
import { EventResponse } from '../dtos/EventDTO';
import { Meeting } from '../models/interfaces/imeeting.model';
import { MeetingResponse } from '../dtos/MeetingDTO';
import { BookingResponse } from '../dtos/BookingDTO';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, User, UserLoginResponse);
createMap(mapper, 
    Meeting, 
    MeetingResponse, 
    forMember((dest) => dest.attendee, mapFrom((source) => source.attendee))
);
createMap(mapper, Event, EventResponse);
createMap(mapper, 
    Meeting, 
    BookingResponse, 
    forMember((dest) => dest.attendee, mapFrom((source) => source.attendee))
);
