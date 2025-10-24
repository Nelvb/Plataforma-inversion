/**
 * Navbar.test.tsx
 *
 * Test unitario del componente Navbar.
 * Valida el renderizado del logo, botón hamburguesa y los menús laterales.
 * Simula los distintos tipos de usuario: no autenticado, autenticado, admin.
 * Mockea useAuthStore, NavbarLinks y menús laterales.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import Navbar from "@/components/layout/Navbar";
import { mockLogout, useAuthStore } from "@/__mocks__/useAuthStore";

// Mocks de Zustand
jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));

// Mocks de Next.js navigation
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(() => "/"),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
    })),
}));

// NavbarLinks ya no se usa - los enlaces se renderizan directamente en Navbar

jest.mock("@/components/sideMenus/SideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-publico">Menú público abierto</div> : null,
}));

jest.mock("@/components/sideMenus/UserSideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-usuario">Menú usuario abierto</div> : null,
}));

jest.mock("@/components/sideMenus/AdminSideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-admin">Menú admin abierto</div> : null,
}));

// Mock UserAvatarMenu para evitar errores de charAt
jest.mock("@/components/ui/UserAvatarMenu", () => ({
    __esModule: true,
    default: () => <div data-testid="user-avatar-menu">UserAvatarMenu</div>,
}));

describe("Navbar", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza logo y menú público cuando no hay usuario", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            loading: false,
            error: null,
            user: null,
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        expect(screen.getByAltText(/boost a project logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/abrir menú/i)).toBeInTheDocument();
        // Verificar que los enlaces principales están presentes
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/proyectos/i)).toBeInTheDocument();
        expect(screen.getByText(/blog/i)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-publico")).toBeInTheDocument();
    });

    it("renderiza menú lateral de usuario autenticado", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loading: false,
            error: null,
            user: {
                id: "123",
                username: "Usuario",
                last_name: "Test",
                email: "user@test.com",
                is_admin: false,
            },
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-usuario")).toBeInTheDocument();
    });

    it("renderiza menú lateral de administrador", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loading: false,
            error: null,
            user: {
                id: "admin",
                username: "Admin",
                last_name: "User",
                email: "admin@test.com",
                is_admin: true,
            },
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-admin")).toBeInTheDocument();
    });
});
