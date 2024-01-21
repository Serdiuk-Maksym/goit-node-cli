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
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const foundContact = await getContactById(id);
      console.log(foundContact);
      break;

    case 'add':
      await addContact({ name, email, phone });
      console.log('Contact added successfully');
      break;

    case 'remove':
      await removeContact(id);
      console.log('Contact removed successfully');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
