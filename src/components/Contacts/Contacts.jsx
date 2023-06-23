import { RxAvatar } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  UlList,
  LiItem,
  SpanIcon,
  SpanName,
  SpanNumber,
  ButtonDlt,
} from './Contacts.styled';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice.js';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

export const Contacts = () => {
  const deleteContactId = id => {
    deleteContact(id);
  };

  const { data: contacts = [], isLoading, error } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(selectFilter);

  const visibleContacts = (() => {
    return contacts
      .filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.includes(filter.toLowerCase())
      )
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
  })();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <UlList>
        {visibleContacts.map(({ id, name, number }) => {
          return (
            <LiItem key={id}>
              <SpanIcon
                inputColor={`#${Math.floor(Math.random() * 16777215).toString(
                  16
                )}`}
              >
                <RxAvatar />
              </SpanIcon>
              <SpanName>{name}</SpanName>
              <SpanNumber>{number}</SpanNumber>
              <ButtonDlt type="button" onClick={() => deleteContactId(id)}>
                <RiDeleteBin6Line />
              </ButtonDlt>
            </LiItem>
          );
        })}
      </UlList>
    </>
  );
};
