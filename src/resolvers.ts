import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { Team, User } from "../gql-types.js";
import { hasPermission } from "./auth.js";
import { teams, users } from "./database.js";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export default {
    Query: {
        hello(): string {
            return 'hello';
        },
        me(parent, args, context): User {
            if (!context.user) {
                throw new AuthenticationError('Invalid User session');
            }
            
            return context.user;
        },
        teams(parent, args, context): Team[] {
            if (!hasPermission(context.user, 'Team')) {
                throw new ForbiddenError('User not allowed');
            }
            return teams;
        },
    },
    User: {
        team(parent): Team | undefined {
            return teams.find(row => row.id === parent.teamId);
        }
    }
};