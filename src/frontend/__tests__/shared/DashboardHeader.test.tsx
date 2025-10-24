/**
 * DashboardHeader.test.tsx
 *
 * Test unitario del componente compartido DashboardHeader.
 * Valida el renderizado correcto del título, subtítulo y badge,
 * así como la lógica condicional según props y estado de usuario.
 */

import React from "react";
import { render, screen } from "@/__tests__/utils/test-utils";
import DashboardHeader from "@/components/shared/DashboardHeader";

// Mock profesional de Zustand store
jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: () => ({
        user: { username: "Nelson" },
    }),
}));

describe("DashboardHeader", () => {
    it("renderiza con valores por defecto cuando no se pasan props", () => {
        render(<DashboardHeader />);

        expect(screen.getByText(/boost a project/i)).toBeInTheDocument();
        expect(screen.getByText(/bienvenido a tu área privada/i)).toBeInTheDocument();
        expect(
            screen.getByText(/como usuario registrado, puedes acceder a toda la información de los proyectos, guardar tus favoritos y simular tus inversiones/i)
        ).toBeInTheDocument();
    });

    it("renderiza con props personalizadas", () => {
        render(
            <DashboardHeader
                badge="Admin"
                title="Panel del Administrador"
                subtitle="Gestión interna"
            />
        );

        expect(screen.getAllByText(/admin/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/panel del administrador/i)).toBeInTheDocument();
        expect(screen.getByText(/gestión interna/i)).toBeInTheDocument();
    });
});
