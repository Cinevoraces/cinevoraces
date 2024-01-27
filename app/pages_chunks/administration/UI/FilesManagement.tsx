// import { Button } from '@components/Input';
import type { AdminActions } from 'models/enums';

interface FileManagementProps {
  handleConfirmationModal: (action: AdminActions) => void;
}

const FileManagement = ({ handleConfirmationModal }: FileManagementProps) => {
  // const handlePosterImports = () => {
  // handleConfirmationModal(AdminActions.IMPORTPOSTERS);
  // };
  return (
    <section className="custom-container">
      {/* <h2 className="self-start py-4 title-section">Gestion des fichiers</h2>
      <div className='self-start w-full flex gap-4'>
        <div className="w-fit flex items-center gap-6">
          <h3 className=''>Importer les posters des films depuis TMDB</h3>
          <div className='mx-auto'>
            <Button onClick={handlePosterImports}>Import</Button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default FileManagement;
