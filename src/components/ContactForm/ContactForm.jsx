import { Form, Button, Label, Input, Div } from './ContactForm.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const addNumberContact = async () => {
    const newContact = { name, number };

    const isContact = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isContact) {
      toast.info(`${name} is already is contacts`);
      return;
    }

    try {
      await addContact(newContact);
      toast.success(`${newContact.name} successfully added`);
    } catch (error) {
      toast.error('Oops! Something went wrong. Please try again!');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNumberContact();
    reset();
  };

  return (
    <>
      <Div>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name
            <Input
              type="text"
              name="name"
              pattern="[A-Za-zА-Яа-я\s]+"
              value={name}
              onChange={e => setName(e.target.value)}
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <Label>
            Phone
            <Input
              type="tel"
              name="number"
              pattern="\+?[0-9\s\-\(\)]+"
              value={number}
              onChange={e => setNumber(e.target.value)}
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>

          <Button type="submit">Add contact</Button>
        </Form>
      </Div>
      <ToastContainer />
    </>
  );
};
