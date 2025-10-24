/**
 * favorite.types.ts
 * 
 * Tipos TypeScript para sistema de favoritos.
 * 
 * @author Boost A Project
 * @since v2.4.0
 */

import type { Project } from "./project";

export interface Favorite {
    id: number;
    user_id: number;
    project_id: number;
    created_at: string;
    project: Project;
}

export interface FavoriteInput {
    project_id: number;
}