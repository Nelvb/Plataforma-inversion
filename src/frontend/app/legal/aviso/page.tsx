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
            <section className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] pt-40 pb-16 px-6 lg:px-8">
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

                    <h2>1. DATOS IDENTIFICATIVOS DEL TITULAR DEL SITIO WEB</h2>
                    <p>
                        De conformidad con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el sitio web Boost A Project es titularidad de:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>Titular:</strong> DYNAMIC SPORT 360 CONSULTORA S.L.</p>
                        <p><strong>CIF:</strong> B10762615</p>
                        <p><strong>Domicilio social:</strong> Calle Acanto 2 Bis, Las Rozas (Madrid, España)</p>
                        <p><strong>Dirección de correo electrónico:</strong> bapboostaproject@gmail.com</p>
                        <p><strong>Sitio web:</strong> info@boostaproject.com</p>
                        <p><strong>Inscripción registral:</strong> Inscrita en el Registro Mercantil de Madrid, Tomo 41857, Folio 10, Sección 8, Hoja M-741459</p>
                    </div>
                    <p>En adelante, se denominará &quot;el Titular&quot; o &quot;el Prestador&quot;.</p>

                    <h2>2. OBJETO Y ÁMBITO DE APLICACIÓN</h2>
                    
                    <h3>2.1. Objeto</h3>
                    <p>
                        El presente Aviso Legal regula el acceso, navegación y utilización del sitio web Boost A Project (en adelante, &quot;el Sitio Web&quot;), sin perjuicio de que el Titular se reserve el derecho a modificar la presentación, configuración y contenido del mismo, así como las condiciones requeridas para su acceso o utilización.
                    </p>

                    <h3>2.2. Finalidad del Sitio Web</h3>
                    <p>
                        Boost A Project es una plataforma web informativa y de captación de potenciales inversores inmobiliarios, que tiene como finalidad:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Informar sobre proyectos inmobiliarios disponibles</li>
                        <li>Facilitar el contacto entre usuarios interesados y promotores/inversores</li>
                        <li>Permitir el registro de usuarios interesados en recibir información sobre proyectos</li>
                    </ul>
                    <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-6">
                        <strong>El Sitio Web NO realiza operaciones financieras, de inversión directa, ni gestiona pagos.</strong> Su función es exclusivamente informativa y de intermediación contactual.
                    </p>

                    <h3>2.3. Aceptación de las Condiciones</h3>
                    <p>
                        El acceso y utilización del Sitio Web atribuye la condición de Usuario e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, en la Política de Privacidad y en la Política de Cookies.
                    </p>

                    <h2>3. CONDICIONES DE ACCESO Y USO DEL SITIO WEB</h2>
                    
                    <h3>3.1. Acceso al Sitio Web</h3>
                    <p>
                        El acceso al Sitio Web es gratuito, excepto en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por los usuarios.
                    </p>

                    <h3>3.2. Registro de Usuario</h3>
                    <p>
                        Para utilizar determinadas funcionalidades del Sitio Web, el Usuario deberá registrarse proporcionando la información requerida. El Usuario se obliga a facilitar información veraz, exacta y completa sobre su identidad, y a actualizar dicha información en caso de modificaciones.
                    </p>

                    <h3>3.3. Obligaciones del Usuario</h3>
                    <p>El Usuario se compromete a:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Utilizar el Sitio Web de conformidad con la ley, la moral, las buenas costumbres y el orden público</li>
                        <li>No realizar actividades publicitarias o de explotación comercial a través del Sitio Web</li>
                        <li>No introducir o difundir contenidos ilícitos, difamatorios, obscenos o violentos</li>
                        <li>No utilizar el Sitio Web para enviar correo electrónico masivo no solicitado (spam)</li>
                        <li>No acceder a áreas restringidas del Sitio Web sin autorización</li>
                        <li>No dañar, inutilizar o deteriorar el Sitio Web o sus contenidos</li>
                    </ul>

                    <h3>3.4. Medidas de Seguridad</h3>
                    <p>
                        El Titular ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos, así como para evitar su alteración, pérdida, tratamiento o acceso no autorizado.
                    </p>

                    <h2>4. PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
                    
                    <h3>4.1. Derechos de Propiedad</h3>
                    <p>
                        El Titular es titular de todos los derechos de propiedad intelectual e industrial del Sitio Web, incluyendo, de forma enunciativa pero no limitativa:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>La estructura, diseño, código fuente, bases de datos, y cualquier otro elemento del Sitio Web</li>
                        <li>Los textos, imágenes, gráficos, logotipos, iconos, animaciones y demás contenidos</li>
                        <li>La marca &quot;Boost A Project&quot; y cualquier otro signo distintivo</li>
                        <li>El dominio info@boostaproject.com</li>
                    </ul>

                    <h3>4.2. Prohibiciones</h3>
                    <p>Queda expresamente prohibido:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>La reproducción, distribución, transformación o comunicación pública del Sitio Web o sus contenidos, sin autorización expresa del Titular</li>
                        <li>La descompilación, ingeniería inversa o cualquier otra operación destinada a obtener el código fuente</li>
                        <li>La elusión de cualesquiera medidas técnicas de protección establecidas</li>
                    </ul>

                    <h3>4.3. Contenidos del Usuario</h3>
                    <p>
                        El Usuario cede al Titular los derechos de propiedad intelectual sobre los contenidos que pueda aportar al Sitio Web, garantizando que ostenta los derechos necesarios para dicha cesión.
                    </p>

                    <h2>5. RESPONSABILIDAD Y LIMITACIÓN DE GARANTÍAS</h2>
                    
                    <h3>5.1. Responsabilidad del Titular</h3>
                    <p>
                        El Titular no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web, ni se hace responsable por los daños y perjuicios que puedan derivarse de:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>La falta de disponibilidad o accesibilidad al Sitio Web</li>
                        <li>Interrupciones del servicio, demoras, mal funcionamiento o fallos en las comunicaciones</li>
                        <li>La adecuación del Sitio Web para una finalidad específica</li>
                        <li>Decisiones tomadas por el Usuario en base a la información proporcionada en el Sitio Web</li>
                    </ul>

                    <h3>5.2. Responsabilidad del Usuario</h3>
                    <p>El Usuario será responsable por:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Los daños y perjuicios de cualquier naturaleza que el Titular pueda sufrir como consecuencia del incumplimiento de cualquiera de las obligaciones establecidas en este Aviso Legal</li>
                        <li>El uso indebido de los contenidos e informaciones proporcionadas a través del Sitio Web</li>
                    </ul>

                    <h3>5.3. Exclusión de Garantías</h3>
                    <p>
                        El Titular no otorga ninguna garantía ni se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>La falta de veracidad, exactitud o actualidad de los contenidos</li>
                        <li>La adecuación a fines particulares del Usuario</li>
                        <li>La existencia de virus o programas maliciosos en los contenidos</li>
                        <li>Actuaciones de terceros no autorizados</li>
                    </ul>

                    <h2>6. ENLACES EXTERNOS Y POLÍTICA DE TERCEROS</h2>
                    
                    <h3>6.1. Enlaces del Sitio Web</h3>
                    <p>
                        El Sitio Web puede incluir enlaces a otros sitios web gestionados por terceros. El Titular no ejerce ningún control sobre dichos sitios, ni asume responsabilidad alguna por sus contenidos, políticas de privacidad o condiciones de uso.
                    </p>

                    <h3>6.2. Enlaces al Sitio Web</h3>
                    <p>
                        Cualquier enlace hipertexto, deep link, framing o cualquier otro tipo de conexión desde otros sitios web al Sitio Web requerirá autorización expresa por escrito del Titular.
                    </p>

                    <h2>7. PROTECCIÓN DE DATOS PERSONALES</h2>
                    <p>
                        El tratamiento de los datos personales de los Usuarios se realiza de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). La información completa sobre el tratamiento de datos personales se encuentra disponible en nuestra{' '}
                        <Link href="/legal/privacidad" className="text-[#6290C3] hover:underline">
                            Política de Privacidad
                        </Link>.
                    </p>

                    <h2>8. POLÍTICA DE COOKIES</h2>
                    <p>
                        El Sitio Web utiliza cookies propias y de terceros para mejorar la experiencia del usuario y analizar el uso del sitio. La información completa sobre las cookies utilizadas se encuentra disponible en nuestra{' '}
                        <Link href="/legal/cookies" className="text-[#6290C3] hover:underline">
                            Política de Cookies
                        </Link>.
                    </p>

                    <h2>9. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
                    
                    <h3>9.1. Legislación Aplicable</h3>
                    <p>
                        El presente Aviso Legal se rige e interpreta de acuerdo con las leyes de España, con especial referencia a:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico</li>
                        <li>Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios</li>
                        <li>Reglamento (UE) 2016/679, relativo a la protección de datos personales</li>
                        <li>Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales</li>
                    </ul>

                    <h3>9.2. Resolución de Conflictos</h3>
                    <p>
                        Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso del Sitio Web, las partes se someten a los juzgados y tribunales de Madrid (España), con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
                    </p>

                    <h2>10. MODIFICACIONES DEL AVISO LEGAL</h2>
                    <p>
                        El Titular se reserva el derecho a modificar el presente Aviso Legal en cualquier momento y sin previo aviso, con el objetivo de adaptarlo a novedades legislativas, jurisprudenciales, técnicas o del sector. Las modificaciones entrarán en vigor desde su publicación en el Sitio Web.
                    </p>
                    <p>
                        Se recomienda a los Usuarios consultar periódicamente el Aviso Legal para verificar la existencia de actualizaciones.
                    </p>

                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-blue-800 font-semibold">
                            El acceso y uso del Sitio Web implica la aceptación plena y sin reservas del presente Aviso Legal en su versión publicada en el momento en que se acceda al Sitio Web.
                        </p>
                    </div>

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