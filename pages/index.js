import GlobalProvider from '../contexts/global';
import ContactsList from '../containers/ContactsList';
import SearchBlock from '../containers/SearchBlock';
import ContactTypeSelector from '../components/ContactTypeSelector';

export default function App() {
  return (
    <GlobalProvider>
      <ContactTypeSelector />
      <SearchBlock />
      <ContactsList />
    </GlobalProvider>
  );
}
