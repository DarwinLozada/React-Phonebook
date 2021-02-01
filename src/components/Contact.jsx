import React, { useState, useEffect } from "react";
import contactServices from "../services/contacts";
import Notification from "./Notification";

const Contact = ({ contact, setContactsToShow, setContacts }) => {
  const [showNotiDeleteContact, setShowNotiDeleteContact] = useState(false);
  const [shouldDeleteContact, setShouldDeleteContact] = useState(false);
  const [wasThereAnError, setWasThereAnError] = useState(false);

  useEffect(() => {
    setShouldDeleteContact(false);
    setTimeout(() => {
      setWasThereAnError(false);
    }, 4000);
  }, [wasThereAnError]);

  // This effect runs when the user clicks Delete in the notification

  useEffect(() => {
    if (shouldDeleteContact) {
      // Change the state of the notification to "exiting"
      setShowNotiDeleteContact(false);
      setTimeout(() => {
        if (shouldDeleteContact) {
          handleDelete();
        }
      }, 300);
    }
  }, [shouldDeleteContact]);

  const handleDelete = () => {
    contactServices
      .deleteContact(contact.id)
      .then(() => {
        setContacts((contacts) => {
          return contacts.filter((person) => person.id !== contact.id);
        });
        setContactsToShow((contacts) => {
          return contacts.filter((person) => person.id !== contact.id);
        });
      })
      .catch((error) => {
        setWasThereAnError(true);
      });
  };

  return (
    <div className="flex justify-between py-4">
      <Notification
        messageText={`Information of ${contact.name} has alredy been removed from server`}
        type="unsuccessful"
        in={wasThereAnError}
      />
      <Notification
        messageText={`Are you sure you want to delete ${contact.name} from the Phonebook?`}
        type="confirm"
        in={showNotiDeleteContact}
        button1Text="Delete"
        button2Text="Cancel"
        button1Function={() => setShouldDeleteContact(true)}
        button2Function={() => setShowNotiDeleteContact(false)}
      />

      <div className="flex overflow-hidden w-full items-center">
        <p
          className="flex p-2 mr-2 text-blue-500 tracking-wider text-lg font-semibold rounded max-w-3/4 truncate"
          key={contact.id}
        >
          {contact.name}
        </p>
        <p className="tracking-wider border-l-2 px-4 overflow-auto">
          {contact.number}
        </p>
      </div>
      <button
        onClick={() => setShowNotiDeleteContact(true)}
        className="transition-colors duration-200 p-2 ring-red-200 focus:ring focus:outline-none bg-red-400 rounded hover:bg-red-300"
      >
        <img
          className="w-4"
          src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
          alt="delete_contact"
        />
      </button>
    </div>
  );
};

export default Contact;
