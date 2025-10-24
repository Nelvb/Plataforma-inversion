/**
 * Test unitario del componente SideMenu.tsx
 *
 * Verifica que el menú lateral público se renderiza correctamente
 * sólo si `isOpen` es true. Mockea las secciones internas:
 * - SideMenuHeader
 * - MainMenuLinks
 * - SideMenuAuthSection
 */

import React from "react";
import { render, screen } from "@/__tests__/utils/test-utils";
import SideMenu from "@/components/sideMenus/SideMenu";

jest.mock("@/components/common/SideMenuHeader", () => ({ onClose }: { onClose: () => void }) => (
    <div data-testid="mock-side-menu-header" onClick={onClose}>
        Header Público
    </div>
));

// MainMenuLinks ya no se usa - los enlaces se renderizan directamente

jest.mock("@/components/sideMenus/SideMenuAuthSection", () => ({ onClose }: { onClose: () => void }) => (
    <div data-testid="mock-auth-section" onClick={onClose}>
        Botones autenticación
    </div>
));

jest.mock("next/navigation", () => ({
    usePathname: () => "/",
}));

describe("SideMenu", () => {
    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(<SideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza cabecera, enlaces y auth si isOpen es true", () => {
        render(<SideMenu isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByTestId("mock-side-menu-header")).toBeInTheDocument();
        // Verificar que los enlaces principales están presentes
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/proyectos/i)).toBeInTheDocument();
        expect(screen.getByText(/blog/i)).toBeInTheDocument();
        expect(screen.getByText(/preguntas frecuentes/i)).toBeInTheDocument();
        expect(screen.getByText(/contacto/i)).toBeInTheDocument();
        expect(screen.getByTestId("mock-auth-section")).toBeInTheDocument();
    });
});
