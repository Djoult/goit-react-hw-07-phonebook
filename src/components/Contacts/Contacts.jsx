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
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getVisibleContacts = (() => {
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
    <UlList>
      {getVisibleContacts.map(({ id, name, number }) => {
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
            <ButtonDlt
              type="button"
              onClick={() => dispatch(removeContact(id))}
            >
              <RiDeleteBin6Line />
            </ButtonDlt>
          </LiItem>
        );
      })}
    </UlList>
  );
};
