import { program } from 'commander';
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const allContacts = await listContacts();
        console.log(allContacts);
        break;

      case 'get':
        const foundContact = await getContactById(id);
        console.log(foundContact === null ? null : foundContact);
        break;

      case 'add':
        const addedContact = await addContact({ name, email, phone });
        console.log('Contact added successfully:', addedContact);
        break;

      case 'remove':
        const removedContact = await removeContact(id);
        if (removedContact === null) {
          console.log('Contact not found.');
        } else {
          console.log('Contact removed successfully:', removedContact);
        }
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeAction(options);
