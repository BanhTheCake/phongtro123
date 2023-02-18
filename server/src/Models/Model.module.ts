import { Overview } from './Entity/overviews.model';
import { Category } from './Entity/categories.model';
import { Attribute } from './Entity/attributes.model';
import { Label } from './Entity/labels.model';
import { Post } from './Entity/posts.model';
import { User } from './Entity/users.model';
import { Module, Global } from '@nestjs/common';
import { Image } from './Entity/images.model';
import { Price } from './Entity/price.model';
import { Area } from './Entity/area.model';
import { Province } from './Entity/province.model';

@Global()
@Module({
  providers: [
    { provide: 'USER', useValue: User },
    { provide: 'POST', useValue: Post },
    { provide: 'LABEL', useValue: Label },
    { provide: 'ATTRIBUTE', useValue: Attribute },
    { provide: 'CATEGORY', useValue: Category },
    { provide: 'OVERVIEW', useValue: Overview },
    { provide: 'IMAGE', useValue: Image },
    { provide: 'PRICE', useValue: Price },
    { provide: 'AREA', useValue: Area },
    { provide: 'PROVINCE', useValue: Province },
  ],
  exports: [
    'USER',
    'POST',
    'LABEL',
    'ATTRIBUTE',
    'CATEGORY',
    'OVERVIEW',
    'IMAGE',
    'PRICE',
    'AREA',
    'PROVINCE',
  ],
})
export class ModelModule {}
