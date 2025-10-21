/**
 * page.tsx — Política de Cookies (/legal/cookies)
 *
 * Página oficial de Política de Cookies de Boost A Project conforme al RGPD, LOPDGDD y LSSI-CE.
 * Propiedad de Dynamic Sport 360 Consultora S.L.
 *
 * @author Boost A Project
 * @since v2.0.0
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Cookies - Boost A Project',
    description:
        'Política de Cookies de Boost A Project conforme al Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 (LOPDGDD) y la LSSI-CE. Información completa sobre el uso de cookies, finalidades, consentimiento y derechos del usuario.',
    robots: { index: true, follow: true },
};

const PoliticaCookiesPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* HEADER */}
            <section className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Política de Cookies
                    </h1>
                    <p className="text-lg text-[#C2E7DA]">
                        Información sobre el uso de cookies en Boost A Project
                    </p>
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
                    <div className="mb-8 p-6 bg-[#F1FFEF] rounded-lg border-l-4 border-[#6290C3]">
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Última actualización:</strong> 21 de octubre de 2025
                        </p>
                        <p className="text-sm text-gray-600">
                            Conforme al Reglamento General de Protección de Datos (UE) 2016/679 y la Ley 34/2002 (LSSI-CE).
                        </p>
                    </div>

                    <h2>1. Información general</h2>
                    <h3>1.1. Identificación del titular</h3>
                    <p>
                        De conformidad con el artículo 22.2 de la Ley 34/2002 (LSSI-CE) y el Reglamento (UE) 2016/679 (RGPD), informamos que el sitio web
                        <strong> Boost A Project </strong> utiliza cookies propias y de terceros.
                    </p>
                    <ul className="list-none pl-0 mb-6">
                        <li><strong>Titular:</strong> Dynamic Sport 360 Consultora S.L.</li>
                        <li><strong>CIF:</strong> B10762615</li>
                        <li><strong>Domicilio:</strong> Calle Acanto 2 Bis, 28232 Las Rozas (Madrid, España)</li>
                        <li><strong>Correo electrónico:</strong> bapboostaproject@gmail.com</li>
                        <li><strong>Nombre comercial:</strong> Boost A Project</li>
                    </ul>

                    <h3>1.2. Definición de cookies</h3>
                    <p>
                        Las cookies son pequeños archivos de texto que se descargan en su dispositivo (ordenador, tablet, smartphone, etc.) cuando visita una página web.
                        Estas cookies permiten recordar sus acciones y preferencias (idioma, tamaño de texto u otras opciones de visualización) durante un tiempo determinado,
                        para que no tenga que reconfigurarlas cada vez que visite la página o navegue por sus secciones.
                    </p>

                    <h2>2. Tipos de cookies utilizadas</h2>
                    <h3>2.1. Clasificación según la finalidad</h3>

                    <h4>A) Cookies técnicas o necesarias</h4>
                    <p>
                        Son esenciales para el funcionamiento básico del sitio web y no pueden ser desactivadas. Permiten autenticación, seguridad, prevención de fraudes,
                        navegación entre secciones y equilibrio de carga de servidores.
                    </p>
                    <p><strong>Base legal:</strong> ejecución de un contrato (art. 6.1.b RGPD). No requieren consentimiento.</p>

                    <h4>B) Cookies de análisis o estadísticas</h4>
                    <p>
                        Permiten cuantificar el número de usuarios y analizar el uso del sitio para mejorar la experiencia y optimizar la plataforma.
                    </p>
                    <p><strong>Base legal:</strong> consentimiento del usuario (art. 6.1.a RGPD).</p>

                    <h4>C) Cookies de preferencias o personalización</h4>
                    <p>
                        Permiten recordar configuraciones como idioma, navegador o modo de visualización.
                    </p>
                    <p><strong>Base legal:</strong> consentimiento del usuario (art. 6.1.a RGPD).</p>

                    <h3>2.2. Clasificación según la entidad gestora</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Cookies propias:</strong> gestionadas por Boost A Project.</li>
                        <li><strong>Cookies de terceros:</strong> gestionadas por entidades externas (p. ej. Google Analytics).</li>
                    </ul>

                    <h3>2.3. Clasificación según el plazo de conservación</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Cookies de sesión:</strong> activas mientras el usuario navega.</li>
                        <li><strong>Cookies persistentes:</strong> almacenadas durante un período definido por el responsable.</li>
                    </ul>

                    <h2>3. Tabla identificativa de cookies</h2>
                    <h3>3.1. Cookies técnicas o necesarias</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th><th>Gestor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>session_id</td><td>Técnica</td><td>Mantener sesión del usuario autenticado</td><td>Sesión</td><td>Propia</td></tr>
                            <tr><td>security_token</td><td>Técnica</td><td>Prevención de ataques CSRF</td><td>Sesión</td><td>Propia</td></tr>
                            <tr><td>cookie_consent</td><td>Técnica</td><td>Recordar preferencias de cookies</td><td>12 meses</td><td>Propia</td></tr>
                            <tr><td>load_balancer</td><td>Técnica</td><td>Distribución equilibrada de carga</td><td>Sesión</td><td>Propia</td></tr>
                        </tbody>
                    </table>

                    <h3>3.2. Cookies de análisis (futuras implementaciones)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th><th>Gestor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>_ga</td><td>Análisis</td><td>Distinción de usuarios (Google Analytics)</td><td>24 meses</td><td>Tercero</td></tr>
                            <tr><td>_gid</td><td>Análisis</td><td>Distinción de usuarios</td><td>24 horas</td><td>Tercero</td></tr>
                            <tr><td>_gat</td><td>Análisis</td><td>Limitación de peticiones</td><td>1 minuto</td><td>Tercero</td></tr>
                        </tbody>
                    </table>

                    <h3>3.3. Cookies de preferencias</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th><th>Gestor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>language</td><td>Preferencias</td><td>Recordar idioma seleccionado</td><td>12 meses</td><td>Propia</td></tr>
                            <tr><td>display_mode</td><td>Preferencias</td><td>Modo de visualización preferido</td><td>12 meses</td><td>Propia</td></tr>
                        </tbody>
                    </table>

                    <h2>4. Base legal y consentimiento</h2>
                    <h3>4.1. Base legal del tratamiento</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Cookies técnicas: ejecución de medidas precontractuales e interés legítimo (art. 6.1.f RGPD). No requieren consentimiento.</li>
                        <li>Cookies de análisis y preferencias: consentimiento expreso del usuario (art. 6.1.a RGPD).</li>
                    </ul>

                    <h3>4.2. Obtención del consentimiento</h3>
                    <p>
                        En la primera visita al sitio, se mostrará un banner donde podrá aceptar todas, rechazar o configurar sus preferencias.
                        El consentimiento puede modificarse o revocarse en cualquier momento mediante el panel accesible desde el pie de página.
                    </p>

                    <h3>4.3. Consecuencias de la no activación</h3>
                    <p>
                        El rechazo de cookies no técnicas no afecta la navegación esencial, aunque puede limitar la personalización, las herramientas de análisis y ciertas funcionalidades avanzadas.
                    </p>

                    <h2>5. Gestión y configuración de cookies</h2>
                    <h3>5.1. Panel de configuración</h3>
                    <p>
                        El usuario puede gestionar sus preferencias en el banner inicial, en el enlace permanente del footer o en esta misma sección.
                    </p>

                    <h3>5.2. Configuración por navegador</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y datos del sitio.</li>
                        <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Configuración personalizada del historial.</li>
                        <li><strong>Microsoft Edge:</strong> Configuración → Privacidad y servicios → Cookies.</li>
                        <li><strong>Safari:</strong> Preferencias → Privacidad → Bloquear cookies.</li>
                    </ul>

                    <h3>5.3. Herramientas de terceros</h3>
                    <p>
                        Existen herramientas externas que permiten detectar cookies y gestionar su desactivación.
                    </p>

                    <h2>6. Transferencias internacionales</h2>
                    <p>
                        Boost A Project no realiza transferencias internacionales fuera del EEE mediante las cookies utilizadas.
                        Si en el futuro se implementaran cookies que impliquen dichas transferencias, se adoptarán garantías adecuadas e información previa al usuario.
                    </p>

                    <h2>7. Conservación de los datos</h2>
                    <p>
                        Los datos obtenidos mediante cookies se conservarán durante los plazos indicados para cada tipo de cookie, y los de análisis, de forma agregada y anonimizada.
                    </p>

                    <h2>8. Derechos de los usuarios</h2>
                    <p>
                        El usuario puede ejercer sus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad mediante correo a{' '}
                        <strong>bapboostaproject@gmail.com</strong> con asunto “Protección de Datos - Cookies” y copia del DNI.
                        También puede reclamar ante la{' '}
                        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#6290C3] hover:underline">
                            Agencia Española de Protección de Datos (AEPD)
                        </a>.
                    </p>

                    <h2>9. Actualizaciones de la política de cookies</h2>
                    <p>
                        Boost A Project podrá modificar esta política para adaptarla a cambios legislativos o técnicos.
                        Se recomienda su revisión periódica.
                    </p>

                    <h2>10. Información adicional</h2>
                    <p>
                        Para más información sobre el tratamiento de datos personales, consulte la{' '}
                        <Link href="/legal/privacidad" className="text-[#6290C3] hover:underline">
                            Política de Privacidad
                        </Link>.
                    </p>

                    <p className="mt-8 font-semibold">
                        El uso de este sitio web implica la aceptación de nuestra Política de Cookies.
                        Si no está de acuerdo, puede configurar sus preferencias mediante los mecanismos indicados.
                    </p>

                    {/* BOTÓN VOLVER */}
                    <div className="text-center pt-10 border-t border-gray-200">
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors duration-300"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PoliticaCookiesPage;
