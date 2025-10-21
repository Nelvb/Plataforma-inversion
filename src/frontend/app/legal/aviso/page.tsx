/**
 * page.tsx — Aviso Legal (/legal/aviso)
 *
 * Página oficial de Aviso Legal de Boost A Project conforme a la normativa española y europea.
 * Cumple la Ley 34/2002 (LSSI-CE), el RGPD (UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD).
 * Propiedad de Dynamic Sport 360 Consultora S.L.
 *
 * @author Boost A Project
 * @since v2.0.0
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Aviso Legal - Boost A Project',
    description:
        'Aviso Legal de Boost A Project. Información sobre la titularidad del sitio web, condiciones de uso, responsabilidades y derechos conforme a la legislación española y europea.',
    robots: { index: true, follow: true },
};

const AvisoLegalPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* HEADER */}
            <section className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Aviso Legal
                    </h1>
                    <p className="text-lg text-[#C2E7DA]">
                        Información legal sobre Boost A Project y su titular Dynamic Sport 360 Consultora S.L.
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
                            En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
                        </p>
                    </div>

                    <h2>1. Datos identificativos del titular del sitio web</h2>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>Titular:</strong> Dynamic Sport 360 Consultora S.L.</p>
                        <p><strong>CIF:</strong> B10762615</p>
                        <p><strong>Domicilio social:</strong> Calle Acanto 2 Bis, Las Rozas (Madrid, España)</p>
                        <p><strong>Email:</strong> bapboostaproject@gmail.com</p>
                        <p><strong>Sitio web:</strong> info@boostaproject.com</p>
                        <p><strong>Registro Mercantil:</strong> Tomo 41857, Folio 10, Sección 8, Hoja M-741459</p>
                    </div>

                    <h2>2. Objeto y ámbito de aplicación</h2>
                    <p>
                        Este Aviso Legal regula el acceso, navegación y uso del sitio web <strong>Boost A Project</strong> (en adelante, “el Sitio Web”),
                        sin perjuicio de que el Titular se reserve el derecho a modificar su contenido, diseño o configuración en cualquier momento.
                    </p>
                    <p>
                        Boost A Project es una plataforma informativa y de captación de potenciales inversores inmobiliarios, cuya finalidad es:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Informar sobre proyectos inmobiliarios disponibles.</li>
                        <li>Facilitar el contacto entre usuarios interesados y promotores.</li>
                        <li>Permitir el registro de usuarios para recibir información.</li>
                    </ul>
                    <p>
                        El Sitio Web no realiza operaciones financieras ni gestiona pagos. Su función es exclusivamente informativa.
                    </p>

                    <h2>3. Condiciones de acceso y uso</h2>
                    <p>
                        El acceso al Sitio Web es gratuito, salvo el coste de conexión a Internet. El Usuario se compromete a hacer un uso adecuado del
                        Sitio Web conforme a la ley y al presente Aviso Legal.
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>No difundir contenidos ilícitos, difamatorios o violentos.</li>
                        <li>No enviar comunicaciones comerciales no solicitadas (spam).</li>
                        <li>No introducir virus ni programas maliciosos.</li>
                        <li>No acceder sin autorización a áreas restringidas.</li>
                    </ul>

                    <h2>4. Propiedad intelectual e industrial</h2>
                    <p>
                        Todos los derechos sobre la estructura, diseño, código fuente, logotipos, textos e imágenes del Sitio Web son propiedad del Titular.
                        Queda prohibida su reproducción, distribución o transformación sin autorización expresa.
                    </p>
                    <p>
                        La marca “Boost A Project” y el dominio info@boostaproject.com son propiedad exclusiva del Titular.
                    </p>

                    <h2>5. Responsabilidad</h2>
                    <p>
                        El Titular no garantiza la disponibilidad ni la continuidad del Sitio Web, y no se hace responsable de daños derivados de interrupciones,
                        errores o decisiones tomadas con base en su contenido. El Usuario será responsable de cualquier daño causado por el incumplimiento
                        de las condiciones aquí establecidas.
                    </p>

                    <h2>6. Enlaces externos</h2>
                    <p>
                        El Sitio Web puede incluir enlaces a sitios externos. El Titular no ejerce control sobre ellos ni se responsabiliza de su contenido
                        o políticas de privacidad.
                    </p>

                    <h2>7. Protección de datos personales</h2>
                    <p>
                        El tratamiento de los datos personales se realiza conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
                        La información completa se encuentra en la{' '}
                        <Link href="/legal/privacidad" className="text-[#6290C3] hover:underline">
                            Política de Privacidad
                        </Link>.
                    </p>

                    <h2>8. Política de cookies</h2>
                    <p>
                        El Sitio Web utiliza cookies propias y de terceros para mejorar la experiencia del usuario.
                        Puede consultar la información completa en la{' '}
                        <Link href="/legal/cookies" className="text-[#6290C3] hover:underline">
                            Política de Cookies
                        </Link>.
                    </p>

                    <h2>9. Legislación aplicable y jurisdicción</h2>
                    <p>
                        Este Aviso Legal se rige por la legislación española. Para la resolución de conflictos, las partes se someten expresamente
                        a los Juzgados y Tribunales de Madrid.
                    </p>

                    <h2>10. Modificaciones</h2>
                    <p>
                        El Titular podrá modificar el presente Aviso Legal sin previo aviso. Las modificaciones serán efectivas desde su publicación.
                        Se recomienda revisarlo periódicamente.
                    </p>

                    {/* BOTÓN DE VOLVER ATRÁS */}
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

export default AvisoLegalPage;
