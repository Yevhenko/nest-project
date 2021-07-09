import { Connection, Repository } from 'typeorm';
import { Product } from './model/Product.entity';

export const productsProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection): Repository<Product> =>
      connection.getRepository(Product),
    inject: ['DATABASE_CONNECTION'],
  },
];
