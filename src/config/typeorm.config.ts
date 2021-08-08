import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');
console.log("--------------------------------------------");
console.log(dbConfig);
console.log("--------------------------------------------");
console.log({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
console.log("*********************************************");
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}