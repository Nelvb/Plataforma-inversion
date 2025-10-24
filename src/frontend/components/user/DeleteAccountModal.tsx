/**
 * DeleteAccountModal.tsx
 *
 * Modal de confirmación para eliminar permanentemente la cuenta del usuario.
 * 
 * Refactorizado para usar ModalBase (mantiene el contenido original y la lógica completa).
 * Diseño unificado: header verde corporativo, bordes 2xl, sombra, accesibilidad y consistencia visual.
 *
 * @author Boost A Project
 * @since v2.5.1
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import { userService } from "@/lib/api/userService";
import Button from "@/components/ui/Button";
import ModalBase from "@/components/ui/ModalBase";

const DeleteAccountModal: React.FC = () => {
    const { logout } = useAuthStore();
    const { showDeleteModal, closeDeleteModal } = useUiStore();
    const router = useRouter();

    if (!showDeleteModal) return null;

    const handleDelete = async () => {
        try {
            await userService.deleteAccount();
            logout();
            alert(
                "Tu cuenta ha sido eliminada. Gracias por formar parte de Boost A Project."
            );
            closeDeleteModal();
            router.push("/");
        } catch (error: any) {
            alert(error.message || "Error al eliminar la cuenta.");
        }
    };

    return (
        <ModalBase
            isOpen={showDeleteModal}
            onClose={closeDeleteModal}
            title="¿Estás seguro de que quieres eliminar tu cuenta?"
        >
            <div className="bg-[#F1FFEF] px-6 py-5 space-y-4 text-[#1A1341] rounded-2xl">
                <p className="text-base">
                    Esta acción es irreversible. Toda tu información será eliminada.
                </p>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar cuenta
                    </Button>
                </div>
            </div>
        </ModalBase>
    );
};

export default DeleteAccountModal;
