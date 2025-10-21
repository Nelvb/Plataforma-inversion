/**
 * page.tsx — Política de Privacidad (/legal/privacidad)
 *
 * Página oficial de Política de Privacidad de Boost A Project conforme al RGPD, LOPDGDD y LSSI-CE.
 * Propiedad de Dynamic Sport 360 Consultora S.L.
 *
 * @author Boost A Project
 * @since v2.0.0
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Privacidad - Boost A Project',
    description:
        'Política de Privacidad de Boost A Project conforme al Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 (LOPDGDD) y la LSSI-CE. Información sobre el tratamiento de datos personales y derechos del usuario.',
    robots: { index: true, follow: true },
};

const PoliticaPrivacidadPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* HEADER */}
            <section className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] pt-40 pb-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-lg text-[#C2E7DA]">
                        Información sobre el tratamiento de datos personales en Boost A Project
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
                            Conforme al Reglamento General de Protección de Datos (UE) 2016/679 y la Ley Orgánica 3/2018 (LOPDGDD).
                        </p>
                    </div>

                    <h2>1. Identidad del responsable del tratamiento</h2>
                    <p>
                        El responsable del tratamiento de los datos personales recogidos a través de la plataforma web Boost A Project (en adelante, el “Sitio Web”) es:
                    </p>
                    <ul className="list-none pl-0 mb-6">
                        <li><strong>Dynamic Sport 360 Consultora S.L.</strong></li>
                        <li><strong>CIF:</strong> B10762615</li>
                        <li><strong>Domicilio social:</strong> Calle Acanto 2 Bis, Las Rozas (Madrid, España)</li>
                        <li><strong>Correo electrónico de contacto:</strong> bapboostaproject@gmail.com</li>
                    </ul>

                    <h2>2. Normativa aplicable</h2>
                    <p>
                        Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de protección de datos personales. En concreto, el Sitio Web cumple con las siguientes normativas:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</li>
                        <li>La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</li>
                        <li>La Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</li>
                    </ul>

                    <h2>3. Finalidad del tratamiento y base jurídica</h2>
                    <p><strong>Finalidades:</strong></p>
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        <li>Gestionar y responder las consultas y solicitudes de información realizadas a través del formulario de contacto.</li>
                        <li>Gestionar el registro de usuarios en la plataforma.</li>
                        <li>Mantener comunicación comercial y enviar información sobre proyectos inmobiliarios y servicios de la empresa, siempre con consentimiento del usuario.</li>
                        <li>Cumplir con las obligaciones legales aplicables.</li>
                    </ol>
                    <p><strong>Base jurídica:</strong></p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Para las finalidades 1 y 2, la base jurídica es la ejecución de medidas precontractuales y el consentimiento del usuario.</li>
                        <li>Para la finalidad 3, el consentimiento expreso del usuario.</li>
                        <li>Para la finalidad 4, el cumplimiento de obligaciones legales.</li>
                    </ul>

                    <h2>4. Categorías de datos tratados y plazos de conservación</h2>
                    <p><strong>Categorías:</strong> Datos identificativos (nombre, apellidos, email, asunto y mensaje).</p>
                    <p>No se tratan categorías especiales de datos personales.</p>
                    <p><strong>Plazos de conservación:</strong></p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Datos de contacto y registro: hasta 5 años desde la última interacción o solicitud de supresión.</li>
                        <li>Datos con fines comerciales: hasta revocación del consentimiento.</li>
                        <li>Datos por obligación legal: según los plazos previstos por la ley.</li>
                    </ul>

                    <h2>5. Destinatarios y transferencias internacionales</h2>
                    <p><strong>Destinatarios:</strong></p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>No se cederán datos a terceros salvo obligación legal.</li>
                        <li>Podrán acceder proveedores de servicios (hosting, email, mantenimiento) bajo contrato conforme al artículo 28 RGPD.</li>
                    </ul>
                    <p><strong>Transferencias internacionales:</strong></p>
                    <p>
                        Boost A Project no realiza transferencias internacionales fuera del Espacio Económico Europeo.
                        Si en el futuro fuera necesario, se aplicarán garantías adecuadas (Cláusulas Contractuales Tipo) e información previa al usuario.
                    </p>

                    <h2>6. Legitimación para el tratamiento de datos de menores</h2>
                    <p>
                        El Sitio Web no trata datos de menores de 18 años.
                        El registro está restringido a personas mayores de edad.
                        Si un menor facilitara datos personales, estos serán eliminados inmediatamente.
                    </p>

                    <h2>7. Derechos de los usuarios</h2>
                    <p>De conformidad con el RGPD y la LOPDGDD, el usuario puede ejercer los siguientes derechos:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Acceso:</strong> conocer qué datos personales se tratan.</li>
                        <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
                        <li><strong>Supresión:</strong> solicitar la eliminación de datos.</li>
                        <li><strong>Limitación:</strong> restringir el tratamiento en determinadas circunstancias.</li>
                        <li><strong>Oposición:</strong> oponerse al tratamiento o a comunicaciones comerciales.</li>
                        <li><strong>Portabilidad:</strong> recibir los datos en formato estructurado y transferirlos a otro responsable.</li>
                        <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin afectar la licitud previa.</li>
                    </ul>

                    <p><strong>Procedimiento:</strong></p>
                    <p>
                        Enviar solicitud al correo <strong>bapboostaproject@gmail.com</strong> con asunto “Protección de Datos - Ejercicio de Derechos”, adjuntando copia del DNI o documento equivalente.
                    </p>
                    <p>
                        El responsable responderá en el plazo máximo de un mes, ampliable a dos en casos complejos.
                        El usuario también puede reclamar ante la{' '}
                        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#6290C3] hover:underline">
                            Agencia Española de Protección de Datos (AEPD)
                        </a>.
                    </p>

                    <h2>8. Medidas de seguridad</h2>
                    <p>
                        Dynamic Sport 360 Consultora S.L. aplica medidas técnicas y organizativas adecuadas: cifrado de comunicaciones, control de acceso y copias de seguridad.
                        Estas medidas se revisan periódicamente conforme al principio de responsabilidad proactiva.
                    </p>

                    <h2>9. Información sobre proveedores externos</h2>
                    <p>
                        La empresa utiliza proveedores externos (hosting, email, mantenimiento), todos ellos contratados conforme al artículo 28 RGPD y con garantías adecuadas de seguridad y confidencialidad.
                    </p>

                    <h2>10. Cambios en la Política de Privacidad</h2>
                    <p>
                        El responsable podrá modificar esta política para adaptarla a cambios legislativos o jurisprudenciales.
                        Los usuarios serán informados previamente mediante el Sitio Web o por correo electrónico.
                        La versión vigente estará siempre disponible en <strong>/legal/privacidad</strong>.
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

export default PoliticaPrivacidadPage;
