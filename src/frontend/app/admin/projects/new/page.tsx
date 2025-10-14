import { Metadata } from 'next';
import NewProject from './NewProject';

export const metadata: Metadata = {
  title: 'Nuevo Proyecto | Administración',
  description: 'Crea un nuevo proyecto de inversión'
};

export default function Page() {
  return <NewProject />;
}
