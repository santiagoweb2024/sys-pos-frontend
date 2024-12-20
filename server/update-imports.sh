#!/bin/bash

# Actualizar importaciones de tipos de base de datos
find src/database/seeders -type f -name "*.seeder.ts" -exec sed -i 's|@/shared/types/database.types|@/shared/types/database/common/database.types|g' {} +

# Actualizar importaciones de tipos de entidades
find src/database/seeders -type f -name "*.seeder.ts" -exec sed -i 's|@/shared/types/\([^/]*\).types|@/shared/types/database/entities/\1.types|g' {} +
