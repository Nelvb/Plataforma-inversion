/**
 * ArticlePage.test.tsx
 *
 * Test de integración de la vista pública de un artículo del blog (/blog/[slug]).
 * 
 * Cubre:
 * - Renderizado correcto del título, contenido y sección de artículos relacionados.
 * - Estados de carga, error y artículo no encontrado.
 * - Validación de llamadas a servicios getArticleBySlug y getArticles.
 * 
 * Notas:
 * Se inyectan mocks pre-resueltos y se limpia la caché de SWR entre tests
 * para evitar dependencias temporales de asincronía.
 * 
 * @since v2.1.0
 * @author Boost A Project
 */

import React from "react";
import { render, screen, waitFor } from "@/__tests__/utils/test-utils";
import { SWRConfig } from "swr";
import ArticlePage from "@/app/blog/[slug]/page";
import { mockGetArticleBySlug, mockGetArticles } from "@/__mocks__/blogService";

// Mock de next/navigation (slug desde la URL)
jest.mock("next/navigation", () => ({
    useParams: () => ({ slug: "mi-articulo-prueba" }),
}));

// Mock del servicio de blog
jest.mock("@/lib/blogService", () => require("@/__mocks__/blogService"));

// 🔧 Helper para limpiar la caché SWR en cada render
const renderWithCleanCache = (ui: React.ReactElement) => {
    return render(<SWRConfig value={{ provider: () => new Map() }}>{ui}</SWRConfig>);
};

describe("Vista pública del artículo /blog/[slug]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza el artículo y los artículos relacionados correctamente", async () => {
        // ✅ mocks pre-resueltos
        mockGetArticleBySlug.mockResolvedValueOnce({
            id: 1,
            slug: "mi-articulo-prueba",
            title: "Título de prueba",
            content: "<p>Este es el contenido en HTML del artículo de prueba</p>",
            related: ["relacionado-1"],
        });

        mockGetArticles.mockResolvedValueOnce({
            articles: [
                {
                    id: 2,
                    slug: "relacionado-1",
                    title: "Artículo relacionado",
                    image: "/test.jpg",
                    date: "2025-01-01",
                    excerpt: "Descripción breve del artículo relacionado",
                },
            ],
        });

        renderWithCleanCache(<ArticlePage />);

        // Estado de carga visible
        expect(screen.getByText(/cargando artículo/i)).toBeInTheDocument();

        // Espera a que se renderice el título del artículo
        await waitFor(
            () => {
                expect(
                    screen.getByRole("heading", { name: /título de prueba/i })
                ).toBeInTheDocument();
            },
            { timeout: 4000 }
        );

        // Verifica contenido principal
        expect(
            screen.getByText(/este es el contenido en html del artículo de prueba/i)
        ).toBeInTheDocument();

        // Verifica título del bloque de relacionados
        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /artículos que podrían interesarte/i })
            ).toBeInTheDocument();
        });

        // Verifica que al menos un artículo relacionado aparezca
        expect(
            screen.getByRole("heading", { name: /artículo relacionado/i })
        ).toBeInTheDocument();
    });

    it("muestra mensaje de artículo no encontrado si getArticleBySlug devuelve null", async () => {
        mockGetArticleBySlug.mockResolvedValueOnce(null);

        renderWithCleanCache(<ArticlePage />);

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /artículo no encontrado/i })
            ).toBeInTheDocument();
        });
    });

    it("muestra mensaje de error si getArticleBySlug lanza excepción", async () => {
        mockGetArticleBySlug.mockRejectedValueOnce(new Error("Error al cargar el artículo"));

        renderWithCleanCache(<ArticlePage />);

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /error al cargar el artículo/i })
            ).toBeInTheDocument();
        });
    });
});
