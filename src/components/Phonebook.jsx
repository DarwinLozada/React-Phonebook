import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddNumber from "./AddContact";
import Contacts from "./Contacts";
import Filter from "./Filter";
import contactServices from "../services/contacts";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsToShow, setContactsToShow] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    contactServices.getAllContacts().then((response) => {
      setContacts(response);
      setContactsToShow(response);
    });
  }, [setContacts, setContactsToShow]);

  return (
    <div className="pb-4">
      <Header />

      <div className="flex flex-col px-6 pt-2">
        <div className="flex flex-col gap-y-7 gap-x-5 md:flex-row md:justify-between">
          <AddNumber
            props={{
              newName,
              setNewName,
              newNumber,
              setNewNumber,
              contacts,
              setContacts,
              setContactsToShow,
            }}
          />
          <Filter
            props={{
              contacts: contacts,
              setContactsToShow: setContactsToShow,
            }}
          />
        </div>
        <Contacts props={{ contactsToShow, setContactsToShow, setContacts }} />
      </div>
    </div>
  );
};

export default Phonebook;
