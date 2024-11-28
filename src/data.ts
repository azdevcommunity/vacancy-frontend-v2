import {Connection} from "@/types.ts";
import {v4 as uuidv4} from "uuid";

// const mockTargets: Connection[] = [
//     {
//         id: "target-1",
//         value: "Production MySQL Database",
//         databaseType: "mysql",
//         connectionData: {
//             connectionType: "default",
//             authMethod: "username-password",
//             host: "mysql-production.example.com",
//             port: "3306",
//             username: "admin",
//             user: "",
//             password: "password123",
//             databaseName: "prod_db",
//             connectionName: "Prod MySQL",
//             version: "8.0",
//             useSSL: true,
//             sslConfig: {
//                 caFile: undefined, // örnek olarak boş bırakıldı
//                 clientCertFile: undefined,
//                 clientKeyFile: undefined,
//                 clientKeyPassword: "clientKeyPassword",
//                 sslMode: "require"
//             }
//         }
//     },
//     {
//         id: "target-2",
//         value: "Staging PostgreSQL Database",
//         databaseType: "postgresql",
//         connectionData: {
//             connectionType: "default",
//             authMethod: "pgpass",
//             host: "postgres-staging.example.com",
//             port: "5432",
//             username: "",
//             user: "staging_user",
//             password: "",
//             databaseName: "staging_db",
//             connectionName: "Staging Postgres",
//             version: "13.3",
//             useSSL: false,
//             sslConfig: undefined // SSL kullanılmadığı için undefined
//         }
//     },
//     {
//         id: "target-3",
//         value: "Development MySQL Database",
//         databaseType: "mysql",
//         connectionData: {
//             connectionType: "default",
//             authMethod: "username-password",
//             host: "mysql-dev.example.com",
//             port: "3306",
//             username: "dev_user",
//             user: "",
//             password: "devpassword",
//             databaseName: "dev_db",
//             connectionName: "Dev MySQL",
//             version: "8.0",
//             useSSL: false,
//             sslConfig: undefined // SSL kullanılmadığı için undefined
//         }
//     },
//     {
//         id: "target-4",
//         value: "Local PostgreSQL Database",
//         databaseType: "postgresql",
//         connectionData: {
//             connectionType: "default",
//             authMethod: "username-password",
//             host: "localhost",
//             port: "5432",
//             username: "local_user",
//             user: "",
//             password: "localpassword",
//             databaseName: "local_db",
//             connectionName: "Local Postgres",
//             version: "14.1",
//             useSSL: true,
//             sslConfig: {
//                 caFile: undefined, // SSL konfigürasyonu test amaçlı boş bırakıldı
//                 clientCertFile: undefined,
//                 clientKeyFile: undefined,
//                 clientKeyPassword: "localClientKeyPassword",
//                 sslMode: "verifyca"
//             }
//         }
//     }
// ];


const emptyTarget = (role: "source" | "target", databaseType: "mysql" | "postgresql", value: string): Connection => {
    return {
        id: uuidv4(),
        value: value,
        databaseType: databaseType,
        connectionData: {
            connectionType: "",
            authMethod: "",
            host: "",
            port: "",
            username: "",
            user: "",
            password: "",
            databaseName: "",
            connectionName: "",
            version: "latest",
            useSSL: false,
            sslConfig: {
                caFile: undefined,
                clientCertFile: undefined,
                clientKeyFile: undefined,
                clientKeyPassword: "",
                sslMode: "",
            },
        },
        role: role
    }
};

export {emptyTarget};