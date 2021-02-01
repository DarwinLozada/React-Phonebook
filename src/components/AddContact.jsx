import React from "react";
import contactServices from "../services/contacts";
import Notification from "./Notification";
import { useState, useRef, useEffect } from "react";
import "../app.css";

const NOTI_DURATION = 4000;

const AddContact = ({ props }) => {
  const [showNotiNewContact, setShowNotiNewContact] = useState(false);
  const [showNotiInvalidCredentials, setShowNotiInvalidCredentials] = useState(
    false
  );
  const [
    showNotiContactWithSameName,
    setShowNotiContactWithSameName,
  ] = useState(false);

  const [shouldChangeContactNumber, setShouldChangeContactNumber] = useState(
    false
  );

  const newContactName = useRef("");

  useEffect(() => {
    if (shouldChangeContactNumber) {
      submitContactWithNewNumber();
      setShowNotiContactWithSameName(false);
    }
  }, [shouldChangeContactNumber]);

  const submitContactWithNewNumber = () => {
    let newContact = props.contacts.find(
      (contact) => contact.name === props.newName
    );
    newContact = { ...newContact, number: props.newNumber };
    const newContacts = [...props.contacts].map((contact) => {
      return contact.name === props.newName ? newContact : contact;
    });

    contactServices
      .updateContact(newContact.id, newContact)
      .then((response) => {
        console.log(response);
      });

    setContactsState(newContacts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      //If the new name or the new number contains only white spaces, we alert the invalid credencials

      !props.newName.replace(/\s/g, "").length ||
      !props.newNumber.replace(/\s/g, "").length
    ) {
      setShowNotiInvalidCredentials(true);

      setTimeout(() => {
        setShowNotiInvalidCredentials(false);
      }, NOTI_DURATION);
      return null;
    }

    let newContact;
    let newContacts;

    if (props.contacts.some((contact) => contact.name === props.newName)) {
      setShowNotiContactWithSameName(true);
    } else {
      newContact = {
        name: props.newName,
        number: props.newNumber,
        id: Date.now(),
      };
      newContacts = [...props.contacts, newContact];
      contactServices.createContact(newContact);
      setContactsState(newContacts);
    }
  };

  const setContactsState = (newContacts) => {
    props.setContactsToShow(newContacts);
    props.setContacts(newContacts);
    setShowNotiContactWithSameName(false);
    setShouldChangeContactNumber(false);
    newContactName.current = props.newName;

    setShowNotiNewContact(true);

    setTimeout(() => {
      setShowNotiNewContact(false);
    }, NOTI_DURATION);

    // Reset input field state
    props.setNewName("");
    props.setNewNumber("");
  };

  return (
    <div className="py-4 px-6 rounded bg-indigo-50 shadow">
      <Notification
        messageText={`${newContactName.current} is alredy added to the phonebook. Do you want to replace the old number with a new one?`}
        type="confirm"
        in={showNotiContactWithSameName}
        button1Text="Change"
        button2Text="Cancel"
        button1Function={() => setShouldChangeContactNumber(true)}
        button2Function={() => setShowNotiContactWithSameName(false)}
      />
      <Notification
        messageText={`${newContactName.current} added successfuly to the Phonebook`}
        type="successful"
        in={showNotiNewContact}
      />

      <Notification
        messageText={`Don't submit empty credentials`}
        type="unsuccessful"
        in={showNotiInvalidCredentials}
      />

      <h2 className="mb-4 font-semibold text-blue-800 text-xl tracking-normal pt-2">
        New Contact
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col pr-20 md:flex-row md:gap-x-10">
          <div className="flex flex-col py-1">
            <input
              placeholder="Name"
              value={props.newName}
              className="my-2 pl-1 rounded-sm bg-indigo-50 border-indigo-300 border-b-2 outline-none"
              onChange={(event) => {
                props.setNewName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col py-1">
            <input
              placeholder="Number"
              value={props.newNumber}
              className="mt-2 pl-1 rounded-sm bg-indigo-50 border-indigo-300 border-b-2 outline-none"
              onChange={(event) => {
                props.setNewNumber(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mt-6
             bg-blue-600 rounded font-semibold text-gray-2
            00  mr-4 py-1 w-full text-white outline-none transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
