interface Connection {
    id: string;
    value: string;
    databaseType?: "mysql" | "postgresql"; // Başlangıçta opsiyonel (undefined) olabilir
    connectionData?: MuSQLConnectionData | PostgreSQLConnectionData; // Başlangıçta boş olabilir
    role: "source" | "target"
}


interface SSLConfig {
    caFile?: File;
    clientCertFile?: File;
    clientKeyFile?: File;
    clientKeyPassword?: string;
    sslMode?: "require" | "verifyca" | "fullVerification" | "";
}

interface MuSQLConnectionData {
    connectionType: string;
    authMethod: string;
    host: string;
    port: string;
    username?: string;
    user?: string;
    password?: string;
    databaseName: string;
    connectionName: string;
    version: string;
    useSSL: boolean;
    sslConfig?: SSLConfig;
}

interface PostgreSQLConnectionData {
    connectionType: string;
    authMethod: string;
    host: string;
    port: string;
    username?: string;
    user?: string;
    password?: string;
    databaseName: string;
    connectionName: string;
    version: string;
    useSSL: boolean;
    sslConfig?: SSLConfig;
}

export type { MuSQLConnectionData, PostgreSQLConnectionData, SSLConfig, Connection };