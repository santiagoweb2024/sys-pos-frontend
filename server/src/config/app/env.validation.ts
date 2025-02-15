import {z} from "zod";
export const envSchema = z.object({
    DB_POSTGRES_URL:z.string().nonempty(),
    API_PORT:z.coerce.number().default(3700),
    API_BASE_URL:z.string().nonempty(),
    API_ROUTE_PREFIX:z.string().nonempty(),
    CLOUDINARY_CLOUD_NAME:z.string().nonempty(),
    CLOUDINARY_API_KEY:z.string().nonempty(),
    CLOUDINARY_API_SECRET:z.string().nonempty(),
    CLOUDINARY_URL:z.string().nonempty(),
})

export type EnvVars = z.infer<typeof envSchema>
