
/**
 * NOTE: To actually run this, you would use `nest new backend`.
 * Here we provide the core source files and structure.
 */

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}
bootstrap();

// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'rc_cart_db',
      autoLoadEntities: true,
      synchronize: true, // Only for dev
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    ChatbotModule,
  ],
})
export class AppModule {}

// src/products/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @Column()
  category: string;

  @Column()
  imageUrl: string;

  @Column('jsonb', { nullable: true })
  specs: any;
}

// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }
}

// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }
}

// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

// src/orders/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal')
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @Column({ nullable: true })
  paymentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

// src/chatbot/chatbot.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  async getResponse(message: string): Promise<{ response: string }> {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('precio')) return { response: 'Nuestros carritos RC varían desde $50 hasta $300 USD.' };
    if (lowerMsg.includes('envio')) return { response: 'Hacemos envíos a todo el país. El tiempo estimado es de 3 a 5 días hábiles.' };
    if (lowerMsg.includes('garantia')) return { response: 'Todos nuestros productos tienen 1 año de garantía contra defectos de fábrica.' };
    return { response: 'Hola jefe 👑, soy tu asistente virtual. ¿En qué puedo ayudarte hoy con tu carrito RC?' };
  }
}

// src/chatbot/chatbot.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  async chat(@Body('message') message: string) {
    return this.chatbotService.getResponse(message);
  }
}
