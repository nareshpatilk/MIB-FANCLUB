import { MerchandiseModule } from './merchandise.module';

describe('MerchandiseModule', () => {
  let merchandiseModule: MerchandiseModule;

  beforeEach(() => {
    merchandiseModule = new MerchandiseModule();
  });

  it('should create an instance', () => {
    expect(merchandiseModule).toBeTruthy();
  });
});
