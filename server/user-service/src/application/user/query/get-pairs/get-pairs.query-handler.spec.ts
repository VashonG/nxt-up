import { Test } from '@nestjs/testing';
import { PrismaModule } from '@app/common/database/database.module';
import { PrismaService } from '@app/common/database/database.service';
import { UsersPrismaMock } from 'user-service/src/test/mocks';
import {
  requestUserStub,
  shortUserStub,
  shortUserWithLocationStub,
  userDtoStub,
} from 'user-service/src/test/stubs';
import { GetPairsQueryHandler } from './get-pairs.query-handler';
import { GetPairsQuery } from './get-pairs.query';
import { ShortUser } from 'user-service/src/users.interface';
import { UsersSelector } from 'user-service/src/infrastructure/repository/user.selector';

describe('when get pairs is called', () => {
  let prismaService: PrismaService;
  let getPairsQueryHandler: GetPairsQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetPairsQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getPairsQueryHandler =
      moduleRef.get<GetPairsQueryHandler>(GetPairsQueryHandler);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ pairs: [shortUserWithLocationStub()] });
    });

    let pairs: ShortUser[];

    beforeEach(async () => {
      jest.clearAllMocks();
      pairs = await getPairsQueryHandler.execute(
        new GetPairsQuery(requestUserStub()),
      );
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userDtoStub().id },
        select: {
          pairs: {
            select: UsersSelector.selectShortUser(),
          },
        },
      });
    });

    it('should return pairs', () => {
      expect(pairs).toEqual([shortUserStub()]);
    });
  });
});
