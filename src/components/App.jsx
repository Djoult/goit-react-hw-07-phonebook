import { ContactForm, Filter, Contacts } from 'components/index';
import { H1, H2 } from './App/App.styled';

export function App() {
  return (
    <>
      <H1>PhoneBook</H1>
      <ContactForm />
      <H2>Contacts</H2>
      <Filter />
      <Contacts />
    </>
  );
}
