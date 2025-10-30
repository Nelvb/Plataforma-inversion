/**
 * Layout base para el área de administración (/admin/*)
 * 
 * Características principales:
 * - Protección automática: Solo usuarios con is_admin = true pueden acceder.
 * - Navbar y Footer condicionales en rutas específicas (/admin y /admin/perfil).
 * - Resto de vistas administrativas (blog, proyectos) sin distracciones visuales.
 * - Redirección automática a home si no cumple requisitos de administrador.
 * 
 * Seguridad: Integra AdminPageContent para verificación de permisos.
 */

"use client";

import { usePathname } from "next/navigation";
// Navbar y Footer se gestionan desde ClientLayout
import AdminPageContent from "@/components/admin/layout/AdminPageContent";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Rutas donde SÍ se mostrarían Navbar y Footer si se reactivara esta lógica
    const showLayoutFor = ["/admin", "/admin/perfil"]; // reservado para uso futuro
    void showLayoutFor.includes(pathname); // elimina warning sin alterar comportamiento

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            <AdminPageContent>
                <main className="flex-grow">{children}</main>
            </AdminPageContent>
        </div>
    );
}
