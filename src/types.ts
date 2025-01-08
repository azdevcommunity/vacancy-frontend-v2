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

interface Job {
    id: string
    title: string
    companyName: string
    companyLogo: string
    views: number
    postedAt: Date
    isFavorite: boolean
    grade: string
    type: string
    salary: string
    location: string
    postingType: string
    description: {
        duties: string[]
        education: string[]
        experience: string[]
        requiredSkills: string[]
        preferredSkills: string[]
    }
    applicationDeadline: Date
    category: string
    schedule: string
}



export type { MuSQLConnectionData, PostgreSQLConnectionData, SSLConfig, Connection, Job };