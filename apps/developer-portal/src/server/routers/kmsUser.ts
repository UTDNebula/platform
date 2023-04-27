import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { procedure, router } from '../trpc';
import { UserType } from '../../utils/kmsEnums';
import { getErrorCodeFromStatus } from '../../utils/errorHandlers';

const kmsBaseURL: string = process.env.KMS_BASE_URL as string;

const kmsUser = router({
  getType: procedure
    .input(
      z.object({
        user_id: z.string().length(24)
      })
    )
    .output(
      z.union([
        z.object({
          status: z.number(),
          message: z.literal('success'),
          data: z.nativeEnum(UserType)
        }),
        z.object({
          status: z.number(),
          message: z.literal('error'),
          data: z.string()
        })
      ])
    )
    .query(async ({ input }) => {
      let url: string =
        kmsBaseURL +
        '/user/type?' +
        new URLSearchParams({
          user_id: input.user_id
        });

      console.log(url);
      return await fetch(url, {
        method: 'GET'
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((res) => {
          throw new TRPCError({
            code: getErrorCodeFromStatus(res.status),
            message: res.json().data,
            cause: res
          });
        });
    })
});

export default kmsUser;
