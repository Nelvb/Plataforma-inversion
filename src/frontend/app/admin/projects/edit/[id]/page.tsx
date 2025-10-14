import { Metadata } from 'next';
import EditProject from './EditProject';

export const metadata: Metadata = {
  title: 'Editar Proyecto | Administración',
  description: 'Edita un proyecto de inversión existente'
};

export default function Page() {
  return <EditProject />;
}
