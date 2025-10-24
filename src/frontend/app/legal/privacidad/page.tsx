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

                    <h2>1. IDENTIDAD DEL RESPONSABLE DEL TRATAMIENTO</h2>
                    <p>
                        El responsable del tratamiento de los datos personales recogidos a través de la plataforma web Boost A Project (en adelante, el &quot;Sitio Web&quot;) es:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>Dynamic Sport 360 Consultora S.L.</strong></p>
                        <p><strong>CIF:</strong> B10762615</p>
                        <p><strong>Domicilio social:</strong> Calle Acanto 2 Bis, Las Rozas (Madrid, España)</p>
                        <p><strong>Correo electrónico de contacto:</strong> bapboostaproject@gmail.com</p>
                    </div>

                    <h2>2. NORMATIVA APLICABLE</h2>
                    <p>
                        Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de protección de datos personales. En concreto, el Sitio Web cumple con las siguientes normativas:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>
                            <strong>El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016</strong>, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).
                        </li>
                        <li>
                            <strong>La Ley Orgánica 3/2018, de 5 de diciembre</strong>, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).
                        </li>
                        <li>
                            <strong>La Ley 34/2002, de 11 de julio</strong>, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
                        </li>
                    </ul>

                    <h2>3. FINALIDAD DEL TRATAMIENTO Y BASE JURÍDICA</h2>
                    
                    <h3>Finalidades:</h3>
                    <p>Los datos personales recabados a través del Sitio Web serán tratados con las siguientes finalidades:</p>
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        <li>Gestionar y responder las consultas y solicitudes de información realizadas a través del formulario de contacto.</li>
                        <li>Gestionar el registro de usuarios en la plataforma.</li>
                        <li>Mantener una comunicación comercial y enviar información sobre proyectos inmobiliarios y servicios de la empresa, siempre que el usuario haya prestado su consentimiento para ello.</li>
                        <li>Cumplir con las obligaciones legales aplicables.</li>
                    </ol>

                    <h3>Base Jurídica:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Para las finalidades 1 y 2, la base jurídica es la ejecución de medidas precontractuales a solicitud del interesado y el consentimiento del usuario.</li>
                        <li>Para la finalidad 3, la base jurídica es el consentimiento expreso del usuario.</li>
                        <li>Para la finalidad 4, la base jurídica es el cumplimiento de obligaciones legales.</li>
                    </ul>

                    <h2>4. CATEGORÍAS DE DATOS TRATADOS Y PLAZOS DE CONSERVACIÓN</h2>
                    
                    <h3>Categorías de datos tratados:</h3>
                    <p>
                        El Sitio Web trata únicamente datos identificativos, que incluyen: nombre, apellidos, dirección de correo electrónico, asunto y mensaje en el caso del formulario de contacto; y nombre, apellidos y email en el caso del registro de usuario. No se tratan categorías especiales de datos personales.
                    </p>

                    <h3>Plazos de conservación:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Los datos personales obtenidos a través del formulario de contacto y el registro de usuario se conservarán mientras se mantenga la relación con el usuario y, en todo caso, durante un plazo máximo de <strong>5 años</strong> desde la última interacción, salvo que el usuario ejerza su derecho de supresión.</li>
                        <li>La información con fines de comunicación comercial se conservará mientras el usuario no revoque el consentimiento prestado.</li>
                        <li>Los datos necesarios para el cumplimiento de obligaciones legales se conservarán durante los plazos que establezca la legislación aplicable.</li>
                    </ul>

                    <h2>5. DESTINATARIOS DE LOS DATOS Y TRANSFERENCIAS INTERNACIONALES</h2>
                    
                    <h3>Destinatarios:</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>No se cederán datos personales a terceros, salvo obligación legal.</li>
                        <li>
                            Los datos podrán ser comunicados a <strong>Proveedores de Servicios</strong> (encargados del tratamiento) que presten servicios a Dynamic Sport 360 Consultora S.L., tales como servicios de hosting, servicios de correo electrónico y mantenimiento de la plataforma, con los que se han suscrito los acuerdos de encargado de tratamiento exigidos por el artículo 28 del RGPD.
                        </li>
                    </ul>

                    <h3>Transferencias Internacionales:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>
                            <strong>Boost A Project no realiza transferencias internacionales de datos personales</strong> fuera del Espacio Económico Europeo (EEE).
                        </li>
                        <li>
                            En el caso de que, en el futuro, fuera necesario realizar alguna transferencia a un país que no ofrece un nivel de protección adecuado, se adoptarían las garantías adecuadas previstas en la normativa, como la suscripción de Cláusulas Contractuales Tipo, y se informaría previamente al usuario.
                        </li>
                    </ul>

                    <h2>6. LEGITIMACIÓN PARA EL TRATAMIENTO DE DATOS DE MENORES</h2>
                    <p>
                        El Sitio Web <strong>no trata datos de menores de 18 años</strong>. El acceso y registro en la plataforma está restringido expresamente a personas mayores de 18 años. Si un menor de edad facilitara sus datos personales, el responsable del tratamiento se compromete a eliminar dicha información de inmediato.
                    </p>

                    <h2>7. DERECHOS DE LOS USUARIOS</h2>
                    <p>
                        De conformidad con el RGPD y la LOPD-GDD, el usuario puede ejercer los siguientes derechos:
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <ul className="list-disc pl-6 space-y-3">
                            <li><strong>Derecho de acceso:</strong> A conocer qué datos personales son objeto de tratamiento.</li>
                            <li><strong>Derecho de rectificación:</strong> A modificar los datos personales inexactos o incompletos.</li>
                            <li><strong>Derecho de supresión (olvido):</strong> A que se supriman sus datos personales.</li>
                            <li><strong>Derecho de limitación del tratamiento:</strong> A solicitar que los datos no se traten en ciertas circunstancias.</li>
                            <li><strong>Derecho de oposición:</strong> A oponerse al tratamiento de sus datos en ciertos casos, incluida la oposición a la comunicación comercial.</li>
                            <li><strong>Derecho a la portabilidad de los datos:</strong> A recibir los datos personales en un formato estructurado y a transmitirlos a otro responsable.</li>
                            <li><strong>Derecho a retirar el consentimiento:</strong> A retirar el consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</li>
                        </ul>
                    </div>

                    <h3>Procedimiento para ejercer los derechos:</h3>
                    <p>
                        Para ejercer cualquiera de estos derechos, el usuario deberá enviar una solicitud por escrito al correo electrónico <strong>bapboostaproject@gmail.com</strong>, indicando en el asunto &quot;Protección de Datos - Ejercicio de Derechos&quot; y adjuntando copia de su DNI o documento identificativo equivalente.
                    </p>
                    <p>
                        El responsable del tratamiento se compromete a responder las solicitudes en el plazo legalmente establecido de <strong>un mes</strong>, el cual podrá ampliarse a dos meses en caso de complejidad.
                    </p>
                    <p>
                        Asimismo, el usuario tiene derecho a presentar una reclamación ante la{' '}
                        <a 
                            href="https://www.aepd.es" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#6290C3] hover:underline font-semibold"
                        >
                            Agencia Española de Protección de Datos (AEPD)
                        </a>{' '}
                        si considera que el tratamiento de sus datos personales infringe la normativa aplicable.
                    </p>

                    <h2>8. MEDIDAS DE SEGURIDAD</h2>
                    <p>
                        De acuerdo con el principio de responsabilidad proactiva, el responsable del tratamiento ha adoptado las medidas técnicas y organizativas necesarias para garantizar un nivel de seguridad adecuado al riesgo del tratamiento, incluyendo, entre otras: cifrado de comunicaciones, control de acceso, y procesos de copia de seguridad. Estas medidas se revisarán y actualizarán periódicamente para mantener la seguridad de los datos.
                    </p>

                    <h2>9. INFORMACIÓN SOBRE PROVEEDORES EXTERNOS (ENCARGADOS DEL TRATAMIENTO)</h2>
                    <p>
                        Dynamic Sport 360 Consultora S.L. utiliza los servicios de proveedores externos (encargados del tratamiento) para el correcto funcionamiento de la plataforma, tales como servicios de hosting y envío de correos electrónicos. Todos estos proveedores han sido seleccionados cumpliendo con los requisitos del artículo 28 del RGPD y han suscrito el correspondiente contrato de encargado del tratamiento, garantizando que tratan los datos personales conforme a nuestras instrucciones y aplicando las medidas de seguridad adecuadas.
                    </p>

                    <h2>10. CAMBIOS EN LA POLÍTICA DE PRIVACIDAD</h2>
                    <p>
                        El responsable del tratamiento se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales. Cualquier cambio será notificado a los usuarios con la debida antelación a través del Sitio Web o por correo electrónico, y la política permanecerá siempre accesible en la dirección <strong>/privacidad</strong>.
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