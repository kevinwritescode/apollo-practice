import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { Team, User } from "../gql-types.js";
import { hasPermission } from "./auth.js";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export default {
    Query: {
        hello(): string {
            return 'hello';
        },
        async me(parent, args, { user }): Promise<User> {
            if (!user) {
                throw new AuthenticationError('Invalid User session');
            }
            
            return user;
        },
        async teams(_, __, { user, dataSources }): Promise<Team[]> {
            if (!hasPermission(user, 'Team')) {
                throw new ForbiddenError('User not allowed');
            }
            return dataSources.db.getTeams();
        },
    },
    User: {
        team(parent, _, { dataSources }): Team | undefined {
            return dataSources.db.getTeam(parent.teamId);
        }
    }
};